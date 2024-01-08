import { generateUuid } from "../index.js";
import { describe, expect, it } from "@jest/globals";

describe("generateUuid", () => {
    it("should generate a valid UUID", () => {
        const uuid = generateUuid();
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        expect(uuid).toMatch(regex);
    });

    it.each(
        [true, false],
        "should generate a different UUID each time when forceJsRundome is %s",
        () => {
            const uuid1 = generateUuid();
            const uuid2 = generateUuid();
            expect(uuid1).not.toBe(uuid2);
        });

    it("should generate a valid UUID when forceJsRandom is true", () => {
        const uuid = generateUuid(true);
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        expect(uuid).toMatch(regex);
    });
});
