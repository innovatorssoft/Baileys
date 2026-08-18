"use strict";

const { Baron } = require("../lib/Socket/interactive-handler");

describe("Baron Interactive Handler", () => {
    it("should instantiate Baron class with methods", () => {
        const baron = new Baron();
        expect(baron.handleInteractiveButtons).toBeInstanceOf(Function);
        expect(baron.handlePayment).toBeInstanceOf(Function);
        expect(baron.handleProduct).toBeInstanceOf(Function);
        expect(baron.handleAlbum).toBeInstanceOf(Function);
        expect(baron.handleEvent).toBeInstanceOf(Function);
        expect(baron.handlePollResult).toBeInstanceOf(Function);
        expect(baron.handleGroupStory).toBeInstanceOf(Function);
        expect(baron.sendStatusWhatsApp).toBeInstanceOf(Function);
    });

    it("should format interactive buttons structure", async () => {
        const baron = new Baron();
        const content = {
            text: "Hello body",
            title: "Title text",
            footer: "Footer text",
            interactiveButtons: [
                { name: "quick_reply", buttonParamsJson: { display_text: "Click Me", id: "btn_1" } }
            ]
        };
        const res = await baron.handleInteractiveButtons(content);
        expect(res).toBeDefined();
        const interactive = res.viewOnceMessage.message.interactiveMessage;
        expect(interactive.body.text).toBe("Hello body");
        expect(interactive.footer.text).toBe("Footer text");
        expect(interactive.nativeFlowMessage.buttons).toHaveLength(1);
    });
});
