"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSqliteAuthState = useSqliteAuthState;

const WAProto_1 = require("../../WAProto");
const auth_utils_1 = require("./auth-utils");
const generics_1 = require("./generics");

async function loadBetterSqlite3() {
    try {
        const mod = require('better-sqlite3');
        return mod.default ?? mod;
    }
    catch (err) {
        const helpful = new Error('`better-sqlite3` is required for `useSqliteAuthState`. Install it as a peer dependency: `npm install better-sqlite3` (or `yarn add better-sqlite3`).');
        helpful.cause = err;
        throw helpful;
    }
}

const CREDS_ROW_KEY = '__creds__';
const CREATE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS creds (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS signal_keys (
  type TEXT NOT NULL,
  id TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (type, id)
);
CREATE INDEX IF NOT EXISTS signal_keys_type_idx ON signal_keys(type);
`;

async function useSqliteAuthState(opts) {
    let db;
    if (opts.database) {
        db = opts.database;
    }
    else if (opts.dbPath) {
        const Database = await loadBetterSqlite3();
        db = new Database(opts.dbPath);
    }
    else {
        throw new Error('useSqliteAuthState requires either `database` or `dbPath` in options');
    }

    db.pragma('journal_mode = WAL');
    db.pragma('synchronous = NORMAL');
    db.exec(CREATE_SCHEMA_SQL);

    const stmts = {
        credsSelect: db.prepare('SELECT value FROM creds WHERE key = ?'),
        credsUpsert: db.prepare('INSERT INTO creds (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'),
        keySelect: db.prepare('SELECT value FROM signal_keys WHERE type = ? AND id = ?'),
        keyUpsert: db.prepare('INSERT INTO signal_keys (type, id, value) VALUES (?, ?, ?) ON CONFLICT(type, id) DO UPDATE SET value = excluded.value'),
        keyDelete: db.prepare('DELETE FROM signal_keys WHERE type = ? AND id = ?'),
        keyListIds: db.prepare('SELECT id FROM signal_keys WHERE type = ?'),
        keyList: db.prepare('SELECT id, value FROM signal_keys WHERE type = ?'),
        clearKeys: db.prepare('DELETE FROM signal_keys')
    };

    const loadCreds = () => {
        const row = stmts.credsSelect.get(CREDS_ROW_KEY);
        if (!row) {
            return (0, auth_utils_1.initAuthCreds)();
        }
        return JSON.parse(row.value, generics_1.BufferJSON.reviver);
    };

    const persistCreds = (credsToSave) => {
        stmts.credsUpsert.run(CREDS_ROW_KEY, JSON.stringify(credsToSave, generics_1.BufferJSON.replacer));
    };

    const creds = loadCreds();

    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    for (const id of ids) {
                        const row = stmts.keySelect.get(type, id);
                        if (row) {
                            let value = JSON.parse(row.value, generics_1.BufferJSON.reviver);
                            if (type === 'app-state-sync-key' && value && WAProto_1.proto.Message?.AppStateSyncKeyData) {
                                value = WAProto_1.proto.Message.AppStateSyncKeyData.fromObject(value);
                            }
                            data[id] = value;
                        }
                    }
                    return data;
                },
                set: async (data) => {
                    const writeTx = db.transaction(() => {
                        for (const category in data) {
                            for (const id in data[category]) {
                                const value = data[category][id];
                                if (value) {
                                    const stringified = JSON.stringify(value, generics_1.BufferJSON.replacer);
                                    stmts.keyUpsert.run(category, id, stringified);
                                }
                                else {
                                    stmts.keyDelete.run(category, id);
                                }
                            }
                        }
                    });
                    writeTx();
                }
            }
        },
        saveCreds: async () => {
            persistCreds(creds);
        }
    };
}
