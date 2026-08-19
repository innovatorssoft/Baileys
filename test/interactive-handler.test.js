"use strict";

const { Zenbo, Baron } = require("../lib/Socket/interactive-handler");

describe("Zenbo Interactive Handler", () => {
    it("should instantiate Zenbo class with methods", () => {
        const zenbo = new Zenbo();
        expect(zenbo.handleInteractiveButtons).toBeInstanceOf(Function);
        expect(zenbo.handlePayment).toBeInstanceOf(Function);
        expect(zenbo.handleProduct).toBeInstanceOf(Function);
        expect(zenbo.handleAlbum).toBeInstanceOf(Function);
        expect(zenbo.handleEvent).toBeInstanceOf(Function);
        expect(zenbo.handlePollResult).toBeInstanceOf(Function);
        expect(zenbo.handleGroupStory).toBeInstanceOf(Function);
        expect(zenbo.sendStatusWhatsApp).toBeInstanceOf(Function);
    });

    it("should provide Baron as backward-compatible alias to Zenbo", () => {
        expect(Baron).toBe(Zenbo);
        const baron = new Baron();
        expect(baron).toBeInstanceOf(Zenbo);
    });

    it("should format interactive buttons structure", async () => {
        const zenbo = new Zenbo();
        const content = {
            text: "Hello body",
            title: "Title text",
            footer: "Footer text",
            interactiveButtons: [
                { name: "quick_reply", buttonParamsJson: { display_text: "Click Me", id: "btn_1" } }
            ]
        };
        const res = await zenbo.handleInteractiveButtons(content);
        expect(res).toBeDefined();
        const interactive = res.viewOnceMessage.message.interactiveMessage;
        expect(interactive.body.text).toBe("Hello body");
        expect(interactive.footer.text).toBe("Footer text");
        expect(interactive.nativeFlowMessage.buttons).toHaveLength(1);
    });
});
