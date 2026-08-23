"use strict";

const {
    PlanningStepStatus,
    buildSteps,
    buildReasoningSteps,
    buildSearchSteps,
    mixedSteps,
    isScheduledMessage,
    getScheduledMessageTime,
    toJid,
    getSenderLid
} = require("../lib/Utils");

describe("Meta AI & Inspection Utilities", () => {
    it("should build planning steps correctly", () => {
        const steps = buildSteps([
            { title: "Analyzing request", status: PlanningStepStatus.IN_PROGRESS }
        ]);
        expect(steps).toHaveLength(1);
        expect(steps[0].title.title).toBe("Analyzing request");
        expect(steps[0].status).toBe(PlanningStepStatus.IN_PROGRESS);
    });

    it("should build reasoning steps from replay helper", () => {
        const steps = buildReasoningSteps(["Thought 1", "Thought 2"]);
        expect(steps).toHaveLength(2);
        expect(steps[0].title).toBe("Thought 1");
        expect(steps[0].isReasoning).toBe(true);
        expect(steps[1].title).toBe("Thought 2");
    });

    it("should correctly inspect scheduled message properties", () => {
        const scheduledMsg = {
            scheduledMessageMetadata: {
                scheduledTime: "1700000000"
            }
        };
        expect(isScheduledMessage(scheduledMsg)).toBe(true);
        expect(getScheduledMessageTime(scheduledMsg)).toEqual(new Date(1700000000 * 1000));

        const normalMsg = { conversation: "Hello" };
        expect(isScheduledMessage(normalMsg)).toBe(false);
        expect(getScheduledMessageTime(normalMsg)).toBeNull();
    });

    it("should format JIDs and resolve sender LID", () => {
        expect(toJid("1234567890")).toBe("1234567890@s.whatsapp.net");
        expect(toJid("123456-789@g.us")).toBe("123456-789@g.us");

        const msgInfo = {
            key: { participant: "123456@lid", remoteJid: "group@g.us" }
        };
        const sender = getSenderLid(msgInfo);
        expect(sender.lid).toBe("123456@lid");
    });
});
