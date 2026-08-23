"use strict";

const {
    USyncBusinessProtocol,
    USyncFeatureProtocol,
    USyncPictureProtocol,
    USyncSidelistProtocol,
    USyncTextStatusProtocol,
    USYNC_FEATURES
} = require("../lib/WAUSync/Protocols");
const { USyncQuery } = require("../lib/WAUSync/USyncQuery");

describe("WAUSync Protocols", () => {
    it("should instantiate USyncBusinessProtocol correctly", () => {
        const proto = new USyncBusinessProtocol();
        expect(proto.name).toBe("business");
        const queryNode = proto.getQueryElement();
        expect(queryNode.tag).toBe("business");
        expect(queryNode.content).toHaveLength(2);
    });

    it("should instantiate USyncFeatureProtocol with custom features", () => {
        const proto = new USyncFeatureProtocol([USYNC_FEATURES.LID_CALLING, USYNC_FEATURES.HOSTED_BIZ_ENC]);
        expect(proto.name).toBe("feature");
        const queryNode = proto.getQueryElement();
        expect(queryNode.tag).toBe("feature");
        expect(queryNode.content).toHaveLength(2);
    });

    it("should instantiate USyncPictureProtocol and parse result", () => {
        const proto = new USyncPictureProtocol();
        expect(proto.name).toBe("picture");
        const node = {
            tag: "picture",
            attrs: { id: "12345", direct_path: "/v/t62.7118-24/123_n.enc" }
        };
        const parsed = proto.parser(node);
        expect(parsed).toEqual({
            id: "12345",
            directPath: "/v/t62.7118-24/123_n.enc",
            hash: null
        });
    });

    it("should instantiate USyncSidelistProtocol and parse deleted flag", () => {
        const proto = new USyncSidelistProtocol();
        expect(proto.name).toBe("sidelist");
        const node = {
            tag: "sidelist",
            attrs: { type: "delete" }
        };
        const parsed = proto.parser(node);
        expect(parsed).toEqual({ type: "delete" });
    });

    it("should instantiate USyncTextStatusProtocol and parse text status", () => {
        const proto = new USyncTextStatusProtocol();
        expect(proto.name).toBe("text_status");
        const node = {
            tag: "text_status",
            attrs: { last_update_time: "1700000000", ephemeral_duration_sec: "86400", text: "Hello world" },
            content: [{ tag: "emoji", attrs: { content: "👋" } }]
        };
        const parsed = proto.parser(node);
        expect(parsed.text).toBe("Hello world");
        expect(parsed.emoji).toBe("👋");
        expect(parsed.setAt).toBeInstanceOf(Date);
    });

    it("should support fluent chaining on USyncQuery", () => {
        const query = new USyncQuery()
            .withBusinessProtocol()
            .withFeatureProtocol()
            .withPictureProtocol()
            .withSidelistProtocol()
            .withTextStatusProtocol();

        expect(query.protocols).toHaveLength(5);
    });
});
