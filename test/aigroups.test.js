const { makeAIGroupsSocket, extractAIGroupMetadata } = require('../lib');

describe('AI Groups Socket Extension', () => {
    let mockSock;
    let queryCalls;

    beforeEach(() => {
        queryCalls = [];
        mockSock = {
            query: jest.fn(async (node) => {
                queryCalls.push(node);
                return {
                    tag: 'iq',
                    attrs: { from: '120363000000000000@g.us' },
                    content: [
                        {
                            tag: 'group',
                            attrs: {
                                id: '120363000000000000@g.us',
                                subject: 'AI Group Test',
                                s_t: '1600000000',
                                s_o: '1234567890@s.whatsapp.net',
                                creation: '1600000000',
                                creator: '1234567890@s.whatsapp.net'
                            },
                            content: [
                                {
                                    tag: 'participant',
                                    attrs: { jid: '1234567890@s.whatsapp.net', type: 'admin' }
                                },
                                {
                                    tag: 'participant',
                                    attrs: { jid: '867051314767696@bot' }
                                }
                            ]
                        }
                    ]
                };
            }),
            ws: {
                on: jest.fn()
            },
            ev: {
                emit: jest.fn()
            }
        };
    });

    test('should wrap an existing socket without throwing', () => {
        const aiSock = makeAIGroupsSocket(mockSock);
        expect(typeof aiSock.aiGroupCreate).toBe('function');
        expect(typeof aiSock.aiGroupMetadata).toBe('function');
        expect(typeof aiSock.aiGroupAddBot).toBe('function');
        expect(typeof aiSock.aiGroupLeave).toBe('function');
        expect(typeof aiSock.aiGroupSettingUpdate).toBe('function');
        expect(typeof aiSock.aiGroupToggleEphemeral).toBe('function');
    });

    test('aiGroupCreate should construct correct IQ node and return metadata', async () => {
        const aiSock = makeAIGroupsSocket(mockSock);
        const metadata = await aiSock.aiGroupCreate(
            'AI Research Hub',
            ['1234567890@s.whatsapp.net'],
            { ephemeralExpiration: 86400 }
        );

        expect(mockSock.query).toHaveBeenCalledTimes(1);
        const queryArg = queryCalls[0];
        expect(queryArg.tag).toBe('iq');
        expect(queryArg.attrs.xmlns).toBe('w:g2');
        expect(queryArg.attrs.type).toBe('set');
        expect(queryArg.content[0].tag).toBe('create');
        expect(queryArg.content[0].attrs.subject).toBe('AI Research Hub');
        expect(queryArg.content[0].content).toEqual([
            { tag: 'participant', attrs: { jid: '1234567890@s.whatsapp.net' } }
        ]);

        expect(metadata.id).toBe('120363000000000000@g.us');
        expect(metadata.subject).toBe('AI Group Test');
        expect(metadata.participants).toHaveLength(2);
    });

    test('aiGroupMetadata should send interactive query node', async () => {
        const aiSock = makeAIGroupsSocket(mockSock);
        const metadata = await aiSock.aiGroupMetadata('120363000000000000@g.us');

        expect(mockSock.query).toHaveBeenCalledTimes(1);
        const queryArg = queryCalls[0];
        expect(queryArg.attrs.to).toBe('120363000000000000@g.us');
        expect(queryArg.attrs.type).toBe('get');
        expect(queryArg.content[0]).toEqual({
            tag: 'query',
            attrs: { request: 'interactive' }
        });
        expect(metadata.id).toBe('120363000000000000@g.us');
    });

    test('aiGroupAddBot should add @bot participant', async () => {
        mockSock.query = jest.fn(async () => ({
            tag: 'iq',
            attrs: {},
            content: [
                {
                    tag: 'add',
                    attrs: {},
                    content: [
                        { tag: 'participant', attrs: { jid: '867051314767696@bot', error: '200' } }
                    ]
                }
            ]
        }));

        const aiSock = makeAIGroupsSocket(mockSock);
        const results = await aiSock.aiGroupAddBot('120363000000000000@g.us', '867051314767696');

        expect(results).toEqual([
            { status: '200', jid: '867051314767696@bot' }
        ]);
    });
});
