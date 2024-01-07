import {
    ArgumentError,
    ArgumetNullOrUndefinedError,
    ArgumentNullError,
    ArgumentUndefinedError,
    ArgumentOutOfRangeError,
    InvalidOperationError
} from "../Errors.js";

import { describe, expect, test } from "@jest/globals";

describe("ArgumentError", () => {
    test("should be an instance of Error", () => {
        const error = new ArgumentError("argumentName");
        expect(error).toBeInstanceOf(Error);
    });

    test("should have correct argument name", () => {
        const argumentName = "argumentName";
        const error = new ArgumentError(argumentName);
        expect(error.argumentName).toBe(argumentName);
    });

    test("should have correct error message", () => {
        const error = new ArgumentError("argumentName");
        expect(error.message).toBe("Invalid argument (argumentName)");
    });

    test("should have correct description", () => {
        const description = "Additional description";
        const error = new ArgumentError("argumentName", null, description);
        expect(error.description).toBe(description);
    });

    test("should have correct error name", () => {
        const error = new ArgumentError("argumentName");
        expect(error.name).toBe("ArgumentError");
    });

    test("should have correct error message when argument name is null", () => {
        const error = new ArgumentError(null);
        expect(error.message).toBe("Invalid argument");
    });

    test("should have correct error message when argument name is undefined", () => {
        const error = new ArgumentError(undefined);
        expect(error.message).toBe("Invalid argument");
    });

    test("should have correct error message when argument name is empty", () => {
        const error = new ArgumentError("");
        expect(error.message).toBe("Invalid argument");
    });

    test("should have correct error message when argument name is whitespace", () => {
        const error = new ArgumentError("   ");
        expect(error.message).toBe("Invalid argument");
    });

    test("should have correct error message when argument name is multiple whitespace", () => {
        const error = new ArgumentError("  ");
        expect(error.message).toBe("Invalid argument");
    });

    test("should create an instance with default message", () => {
        const error = new ArgumentError("argumentName");
        expect(error).toBeInstanceOf(ArgumentError);
        expect(error.message).toBe("Invalid argument (argumentName)");
        expect(error.argumentName).toBe("argumentName");
    });

    test("should create an instance with custom message", () => {
        const error = new ArgumentError("argumentName", "Custom message");
        expect(error).toBeInstanceOf(ArgumentError);
        expect(error.message).toBe("Custom message (argumentName)");
        expect(error.argumentName).toBe("argumentName");
    });

    test("should create an instance with custom message and description", () => {
        const error = new ArgumentError("argumentName", "Custom message", "Additional description");
        expect(error).toBeInstanceOf(ArgumentError);
        expect(error.message).toBe("Custom message (argumentName) : Additional description");
        expect(error.argumentName).toBe("argumentName");
    });

    test("should create an instance with custom message and null description", () => {
        const error = new ArgumentError("argumentName", "Custom message", null);
        expect(error).toBeInstanceOf(ArgumentError);
        expect(error.message).toBe("Custom message (argumentName)");
        expect(error.argumentName).toBe("argumentName");
    });

    test("should create an instance with custom message and undefined description", () => {
        const error = new ArgumentError("argumentName", "Custom message", undefined);
        expect(error).toBeInstanceOf(ArgumentError);
        expect(error.message).toBe("Custom message (argumentName)");
        expect(error.argumentName).toBe("argumentName");
    });

    test("should create an instance with custom message and empty description", () => {
        const error = new ArgumentError("argumentName", "Custom message", "");
        expect(error).toBeInstanceOf(ArgumentError);
        expect(error.message).toBe("Custom message (argumentName)");
        expect(error.argumentName).toBe("argumentName");
    });

    test("should create an instance with custom message and whitespace description", () => {
        const error = new ArgumentError("argumentName", "Custom message", "   ");
        expect(error).toBeInstanceOf(ArgumentError);
        expect(error.message).toBe("Custom message (argumentName)");
        expect(error.argumentName).toBe("argumentName");
    });

    test("should create an instance with custom message and description with leading and trailing whitespace", () => {
        const error = new ArgumentError("argumentName", "Custom message", "  description  ");
        expect(error).toBeInstanceOf(ArgumentError);
        expect(error.message).toBe("Custom message (argumentName) : description");
        expect(error.argumentName).toBe("argumentName");
    });

    test("should have correct error name", () => {
        const error = new ArgumentError("argumentName");
        expect(error.name).toBe("ArgumentError");
    });
});

describe("ArgumetNullOrUndefinedError", () => {
    test("should be an instance of ArgumentError", () => {
        const error = new ArgumetNullOrUndefinedError("argument");
        expect(error).toBeInstanceOf(ArgumentError);
    });

    test("should have correct argument name", () => {
        const argumentName = "argument";
        const error = new ArgumetNullOrUndefinedError(argumentName);
        expect(error.argumentName).toBe(argumentName);
    });

    test("should have correct error message", () => {
        const error = new ArgumetNullOrUndefinedError("argument");
        expect(error.message).toBe("Argument is null or undefined (argument)");
    });

    test("should have correct description", () => {
        const description = "Additional description";
        const error = new ArgumetNullOrUndefinedError("argument", description);
        expect(error.description).toBe(description);
    });

    test("should have correct error name", () => {
        const error = new ArgumetNullOrUndefinedError("argument");
        expect(error.name).toBe("ArgumetNullOrUndefinedError");
    });
});

describe("ArgumentNullError", () => {
    test("should be an instance of ArgumentError", () => {
        const error = new ArgumentNullError("argument");
        expect(error).toBeInstanceOf(ArgumentError);
    });

    test("should have correct argument name", () => {
        const argumentName = "argument";
        const error = new ArgumentNullError(argumentName);
        expect(error.argumentName).toBe(argumentName);
    });

    test("should have correct error message", () => {
        const error = new ArgumentNullError("argument");
        expect(error.message).toBe("Argument is null (argument)");
    });

    test("should have correct description", () => {
        const description = "Additional description";
        const error = new ArgumentNullError("argument", description);
        expect(error.description).toBe(description);
    });

    test("should have correct error name", () => {
        const error = new ArgumentNullError("argument");
        expect(error.name).toBe("ArgumentNullError");
    });
});

describe("ArgumentUndefinedError", () => {
    test("should be an instance of ArgumentError", () => {
        const error = new ArgumentUndefinedError("argument");
        expect(error).toBeInstanceOf(ArgumentError);
    });

    test("should have correct argument name", () => {
        const argumentName = "argument";
        const error = new ArgumentUndefinedError(argumentName);
        expect(error.argumentName).toBe(argumentName);
    });

    test("should have correct error message", () => {
        const error = new ArgumentUndefinedError("argument");
        expect(error.message).toBe("Argument is undefined (argument)");
    });

    test("should have correct description", () => {
        const description = "Additional description";
        const error = new ArgumentUndefinedError("argument", description);
        expect(error.description).toBe(description);
    });

    test("should have correct error name", () => {
        const error = new ArgumentUndefinedError("argument");
        expect(error.name).toBe("ArgumentUndefinedError");
    });
});

describe("ArgumentOutOfRangeError", () => {
    test("should be an instance of ArgumentError", () => {
        const error = new ArgumentOutOfRangeError("argument");
        expect(error).toBeInstanceOf(ArgumentError);
    });

    test("should have correct argument name", () => {
        const argumentName = "argument";
        const error = new ArgumentOutOfRangeError(argumentName);
        expect(error.argumentName).toBe(argumentName);
    });

    test("should have correct error message", () => {
        const error = new ArgumentOutOfRangeError("argument");
        expect(error.message).toBe("Argument is out of range (argument)");
    });

    test("should have correct description", () => {
        const description = "Additional description";
        const error = new ArgumentOutOfRangeError("argument", description);
        expect(error.description).toBe(description);
    });

    test("should have correct error name", () => {
        const error = new ArgumentOutOfRangeError("argument");
        expect(error.name).toBe("ArgumentOutOfRangeError");
    });
});

describe("InvalidOperationError", () => {
    test("should be an instance of Error", () => {
        const error = new InvalidOperationError();
        expect(error).toBeInstanceOf(Error);
    });

    test("should have correct error message", () => {
        const error = new InvalidOperationError();
        expect(error.message).toBe("Invalid operation");
    });

    test("should have correct error name", () => {
        const error = new InvalidOperationError();
        expect(error.name).toBe("InvalidOperationError");
    });
});
