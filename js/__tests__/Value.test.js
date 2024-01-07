import Value from "../Value.js";
import { describe, expect, it } from "@jest/globals";
import { Buffer } from "buffer";


describe("isNull", () => {
    it("should return true if the text is null", () => {
        const result = Value.isNull(null);
        expect(result).toBe(true);
    });

    it("should return false if the text is not null", () => {
        const result = Value.isNull("value");
        expect(result).toBe(false);
    });
});

describe("isUndefined", () => {
    it("should return true if the value is undefined", () => {
        const result = Value.isUndefined(undefined);
        expect(result).toBe(true);
    });

    it("should return false if the value is not undefined", () => {
        const result = Value.isUndefined("value");
        expect(result).toBe(false);
    });
});

describe("isEmpty", () => {
    it("should return true if the input is an empty string", () => {
        const result = Value.isEmpty("");
        expect(result).toBe(true);
    });
});

describe("isOnlyWhiteSpaces", () => {
    it("should return true if the input contains only white spaces", () => {
        const result = Value.isOnlyWhiteSpaces("   ");
        expect(result).toBe(true);
    });

    it("should return false if the input contains non-white space characters", () => {
        const result = Value.isOnlyWhiteSpaces("  Hello  ");
        expect(result).toBe(false);
    });

    it("should return false if the input is an empty string", () => {
        const result = Value.isOnlyWhiteSpaces("");
        expect(result).toBe(false);
    });

    it("should return false if the input is null", () => {
        const result = Value.isOnlyWhiteSpaces(null);
        expect(result).toBe(false);
    });

    it("should return false if the input is undefined", () => {
        const result = Value.isOnlyWhiteSpaces(undefined);
        expect(result).toBe(false);
    });

    it("should return false if the input is not a string", () => {
        const result = Value.isOnlyWhiteSpaces(123);
        expect(result).toBe(false);
    });

    it("should return false if the input is an empty object", () => {
        const result = Value.isOnlyWhiteSpaces({});
        expect(result).toBe(false);
    });

    it("should return false if the input is an empty array", () => {
        const result = Value.isOnlyWhiteSpaces([]);
        expect(result).toBe(false);
    });

    it("should return false if the input is a boolean", () => {
        const result = Value.isOnlyWhiteSpaces(true);
        expect(result).toBe(false);
    });

    it("should return false if the input is a number", () => {
        const result = Value.isOnlyWhiteSpaces(123);
        expect(result).toBe(false);
    });

    it("should return false if the input is a function", () => {
        const result = Value.isOnlyWhiteSpaces(() => { });
        expect(result).toBe(false);
    });

    it("should return false if the input is a date", () => {
        const result = Value.isOnlyWhiteSpaces(new Date());
        expect(result).toBe(false);
    });

    it("should return false if the input is a regex", () => {
        const result = Value.isOnlyWhiteSpaces(new RegExp(""));
        expect(result).toBe(false);
    });

    it("should return false if the input is an error", () => {
        const result = Value.isOnlyWhiteSpaces(new Error());
        expect(result).toBe(false);
    });

    it("should return false if the input is a symbol", () => {
        const result = Value.isOnlyWhiteSpaces(Symbol());
        expect(result).toBe(false);
    });

    it("should return false if the input is a map", () => {
        const result = Value.isOnlyWhiteSpaces(new Map());
        expect(result).toBe(false);
    });

    it("should return false if the input is a set", () => {
        const result = Value.isOnlyWhiteSpaces(new Set());
        expect(result).toBe(false);
    });

    it("should return false if the input is a buffer", () => {
        const result = Value.isOnlyWhiteSpaces(Buffer.from(""));
        expect(result).toBe(false);
    });
});

describe("isNullOrWhiteSpaces", () => {
    it("should return true if the input is null", () => {
        const result = Value.isNullOrWhiteSpaces(null);
        expect(result).toBe(true);
    });

    it("should return true if the input is undefined", () => {
        const result = Value.isNullOrWhiteSpaces(undefined);
        expect(result).toBe(true);
    });

    it("should return true if the input is an empty string", () => {
        const result = Value.isNullOrWhiteSpaces("");
        expect(result).toBe(true);
    });

    it("should return true if the input contains only white spaces", () => {
        const result = Value.isNullOrWhiteSpaces("     ");
        expect(result).toBe(true);
    });
});

describe("isNull", () => {
    it("should return true if the text is null", () => {
        const result = Value.isNull(null);
        expect(result).toBe(true);
    });

    it("should return false if the text is not null", () => {
        const result = Value.isNull("value");
        expect(result).toBe(false);
    });
});

describe("isUndefined", () => {
    it("should return true if the value is undefined", () => {
        const result = Value.isUndefined(undefined);
        expect(result).toBe(true);
    });

    it("should return false if the value is not undefined", () => {
        const result = Value.isUndefined("value");
        expect(result).toBe(false);
    });
});

describe("isEmpty", () => {
    it("should return true if the input is an empty string", () => {
        const result = Value.isEmpty("");
        expect(result).toBe(true);
    });
});

describe("isOnlyWhiteSpaces", () => {
    it("should return true if the input contains only white spaces", () => {
        const result = Value.isOnlyWhiteSpaces("   ");
        expect(result).toBe(true);
    });

    it("should return false if the input contains non-white space characters", () => {
        const result = Value.isOnlyWhiteSpaces("  Hello  ");
        expect(result).toBe(false);
    });

    it("should return false if the input is an empty string", () => {
        const result = Value.isOnlyWhiteSpaces("");
        expect(result).toBe(false);
    });

    it("should return false if the input is null", () => {
        const result = Value.isOnlyWhiteSpaces(null);
        expect(result).toBe(false);
    });

    it("should return false if the input is undefined", () => {
        const result = Value.isOnlyWhiteSpaces(undefined);
        expect(result).toBe(false);
    });

    it("should return false if the input is not a string", () => {
        const result = Value.isOnlyWhiteSpaces(123);
        expect(result).toBe(false);
    });

    it("should return false if the input is an empty object", () => {
        const result = Value.isOnlyWhiteSpaces({});
        expect(result).toBe(false);
    });

    it("should return false if the input is an empty array", () => {
        const result = Value.isOnlyWhiteSpaces([]);
        expect(result).toBe(false);
    });

    it("should return false if the input is a boolean", () => {
        const result = Value.isOnlyWhiteSpaces(true);
        expect(result).toBe(false);
    });

    it("should return false if the input is a number", () => {
        const result = Value.isOnlyWhiteSpaces(123);
        expect(result).toBe(false);
    });

    it("should return false if the input is a function", () => {
        const result = Value.isOnlyWhiteSpaces(() => { });
        expect(result).toBe(false);
    });

    it("should return false if the input is a date", () => {
        const result = Value.isOnlyWhiteSpaces(new Date());
        expect(result).toBe(false);
    });

    it("should return false if the input is a regex", () => {
        const result = Value.isOnlyWhiteSpaces(new RegExp(""));
        expect(result).toBe(false);
    });

    it("should return false if the input is an error", () => {
        const result = Value.isOnlyWhiteSpaces(new Error());
        expect(result).toBe(false);
    });

    it("should return false if the input is a symbol", () => {
        const result = Value.isOnlyWhiteSpaces(Symbol());
        expect(result).toBe(false);
    });

    it("should return false if the input is a map", () => {
        const result = Value.isOnlyWhiteSpaces(new Map());
        expect(result).toBe(false);
    });

    it("should return false if the input is a set", () => {
        const result = Value.isOnlyWhiteSpaces(new Set());
        expect(result).toBe(false);
    });

    it("should return false if the input is a buffer", () => {
        const result = Value.isOnlyWhiteSpaces(Buffer.from(""));
        expect(result).toBe(false);
    });
});

describe("isNullOrWhiteSpaces", () => {
    it("should return true if the input is null", () => {
        const result = Value.isNullOrWhiteSpaces(null);
        expect(result).toBe(true);
    });

    it("should return true if the input is undefined", () => {
        const result = Value.isNullOrWhiteSpaces(undefined);
        expect(result).toBe(true);
    });

    it("should return true if the input is an empty string", () => {
        const result = Value.isNullOrWhiteSpaces("");
        expect(result).toBe(true);
    });

    it("should return true if the input contains only white spaces", () => {
        const result = Value.isNullOrWhiteSpaces("     ");
        expect(result).toBe(true);
    });
});
