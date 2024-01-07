import { ArgumentNullError, ArgumentError, ArgumentOutOfRangeError } from "../Errors.js";
import Guard from "../Guard.js";
import { describe, expect, it } from "@jest/globals";

describe("Guard", () => {
    describe("Argument", () => {
        describe("isNotNullOrUndefined", () => {
            it("should throw ArgumentNullError if argument is null", () => {
                expect(() => {
                    Guard.Argument.isNotNullOrUndefined("argumentName", null);
                }).toThrow(ArgumentNullError);
            });

            it("should throw ArgumentNullError if argument is undefined", () => {
                expect(() => {
                    Guard.Argument.isNotNullOrUndefined("argumentName", undefined);
                }).toThrow(ArgumentNullError);
            });

            it("should not throw any error if argument is not null or undefined", () => {
                expect(() => {
                    Guard.Argument.isNotNullOrUndefined("argumentName", "value");
                }).not.toThrow();
            });
        });

        describe("isNotUndefined", () => {
            it("should throw ArgumentNullError if argument is undefined", () => {
                expect(() => {
                    Guard.Argument.isNotUndefined("argumentName", undefined);
                }).toThrow(ArgumentNullError);
            });

            it("should not throw any error if argument is not undefined", () => {
                expect(() => {
                    Guard.Argument.isNotUndefined("argumentName", "value");
                }).not.toThrow();
            });
        });

        describe("isNotNull", () => {
            it("should throw ArgumentNullError if argument is null", () => {
                expect(() => {
                    Guard.Argument.isNotNull("argumentName", null);
                }).toThrow(ArgumentNullError);
            });

            it("should not throw any error if argument is not null", () => {
                expect(() => {
                    Guard.Argument.isNotNull("argumentName", "value");
                }).not.toThrow();
            });
        });

        describe("isOfType", () => {
            it("should throw ArgumentError if argument is not of the specified type", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", 123, "string");
                }).toThrow(ArgumentError);
            });

            it("should not throw any error if argument is of the specified type", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", "value", "string");
                }).not.toThrow();
            });

            it("should throw ArgumentError if argument is not of the specified type", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", [], "string");
                }).toThrow(ArgumentError);
            });

            it("should not throw any error if argument is of the specified type", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", [], typeof []);
                }).not.toThrow();
            });

            it("should throw ArgumentError if argument is not of the specified type", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", {}, "string");
                }).toThrow(ArgumentError);
            });

            it("should not throw any error if argument is of the specified type", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", {}, typeof {});
                }).not.toThrow();
            });

            it("should throw ArgumentError if argument is not of the specified type", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", () => { }, "string");
                }).toThrow(ArgumentError);
            });

            it("should not throw if argument is a object and type is its type object", () => {
                expect(() => {
                    const buffer = new ArrayBuffer(1);
                    Guard.Argument.isOfType("argumentName", buffer, "ArrayBuffer");
                }).not.toThrow();
            });

            it("should not throw if argument is a object and type is its type object", () => {
                expect(() => {
                    const buffer = new ArrayBuffer(1);
                    Guard.Argument.isOfType("argumentName", buffer, ArrayBuffer);
                }).not.toThrow();
            });

            it("should not throw if argument is a function and type is a class name", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", () => { }, "function");
                }).not.toThrow();
            });

            it("should not throw if argument is a function and type is a object", () => {
                expect(() => {
                    Guard.Argument.isOfType("argumentName", new Array(), new Array());
                }).not.toThrow();
            });
        });

        describe("isAssignableTo", () => {
            it("should throw ArgumentError if argument is not assignable to the specified type", () => {
                expect(() => {
                    Guard.Argument.isAssignableTo("argumentName", "value", Array);
                }).toThrow(ArgumentError);
            });

            it("should not throw any error if argument is assignable to the specified type", () => {
                expect(() => {
                    Guard.Argument.isAssignableTo("argumentName", [], Array);
                }).not.toThrow();
            });

        });

        describe("isAnyOf", () => {
            it("should throw ArgumentOutOfRangeError if argument is not in the specified range", () => {
                expect(() => {
                    Guard.Argument.isAnyOf("argumentName", "value", ["one", "two", "three"]);
                }).toThrow(ArgumentOutOfRangeError);
            });

            it("should not throw any error if argument is in the specified range", () => {
                expect(() => {
                    Guard.Argument.isAnyOf("argumentName", "one", ["one", "two", "three"]);
                }).not.toThrow();
            });
        });
    });

    describe("isFinitePositiveInteger", () => {
        it("should throw ArgumentError if argument is not a finite positive integer", () => {
            expect(() => {
                Guard.Argument.isFinitePositiveInteger("argumentName", "value");
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a finite positive integer", () => {
            expect(() => {
                Guard.Argument.isFinitePositiveInteger("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isSafeInteger", () => {
        it("should throw ArgumentError if argument is not a safe integer", () => {
            expect(() => {
                Guard.Argument.isSafeInteger("argumentName", 1.23);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a safe integer", () => {
            expect(() => {
                Guard.Argument.isSafeInteger("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isFiniteNumber", () => {
        it("should throw ArgumentError if argument is not a finite number", () => {
            expect(() => {
                Guard.Argument.isFiniteNumber("argumentName", Infinity);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a finite number", () => {
            expect(() => {
                Guard.Argument.isFiniteNumber("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isInteger", () => {
        it("should throw ArgumentError if argument is not an integer", () => {
            expect(() => {
                Guard.Argument.isInteger("argumentName", 1.23);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is an integer", () => {
            expect(() => {
                Guard.Argument.isInteger("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isPositiveNumber", () => {
        it("should throw ArgumentError if argument is not a positive number", () => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", -1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a positive number", () => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isNegativeNumber", () => {
        it("should throw ArgumentError if argument is not a negative number", () => {
            expect(() => {
                Guard.Argument.isNegativeNumber("argumentName", 1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a negative number", () => {
            expect(() => {
                Guard.Argument.isNegativeNumber("argumentName", -123);
            }).not.toThrow();
        });
    });

    describe("isPositiveNumber", () => {
        it("should throw ArgumentError if argument is not a positive number", () => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", -1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a positive number", () => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isZero", () => {
        it("should throw ArgumentError if argument is not zero", () => {
            expect(() => {
                Guard.Argument.isZero("argumentName", 1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is zero", () => {
            expect(() => {
                Guard.Argument.isZero("argumentName", 0);
            }).not.toThrow();
        });
    });

    describe("isNotZero", () => {
        it("should throw ArgumentError if argument is zero", () => {
            expect(() => {
                Guard.Argument.isNotZero("argumentName", 0);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is not zero", () => {
            expect(() => {
                Guard.Argument.isNotZero("argumentName", 1);
            }).not.toThrow();
        });
    });

    describe("isNegativeInteger", () => {
        it("should throw ArgumentError if argument is not a negative integer", () => {
            expect(() => {
                Guard.Argument.isNegativeInteger("argumentName", 1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a negative integer", () => {
            expect(() => {
                Guard.Argument.isNegativeInteger("argumentName", -123);
            }).not.toThrow();
        });
    });

    describe("isPositiveInteger", () => {
        it("should throw ArgumentError if argument is not a positive integer", () => {
            expect(() => {
                Guard.Argument.isPositiveInteger("argumentName", -1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a positive integer", () => {
            expect(() => {
                Guard.Argument.isPositiveInteger("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isNaN", () => {
        it("should throw ArgumentError if argument is not NaN", () => {
            expect(() => {
                Guard.Argument.isNaN("argumentName", 1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is NaN", () => {
            expect(() => {
                Guard.Argument.isNaN("argumentName", NaN);
            }).not.toThrow();
        });
    });

    describe("isNotNaN", () => {
        it("should throw ArgumentError if argument is NaN", () => {
            expect(() => {
                Guard.Argument.isNotNaN("argumentName", NaN);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is not NaN", () => {
            expect(() => {
                Guard.Argument.isNotNaN("argumentName", 1);
            }).not.toThrow();
        });
    });

    describe("isZero", () => {
        it("should throw ArgumentError if argument is not zero", () => {
            expect(() => {
                Guard.Argument.isZero("argumentName", 1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is zero", () => {
            expect(() => {
                Guard.Argument.isZero("argumentName", 0);
            }).not.toThrow();
        });
    });

    describe("isLessThan", () => {
        it("should throw ArgumentError if argument is not less than the specified value", () => {
            expect(() => {
                Guard.Argument.isLessThan("argumentName", 2, 1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is less than the specified value", () => {
            expect(() => {
                Guard.Argument.isLessThan("argumentName", 1, 2);
            }).not.toThrow();
        });
    });

    describe("isLessThanOrEqualTo", () => {
        it("should throw ArgumentError if argument is not less than or equal to the specified value", () => {
            expect(() => {
                Guard.Argument.isLessThanOrEqualTo("argumentName", 2, 1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is less than or equal to the specified value", () => {
            expect(() => {
                Guard.Argument.isLessThanOrEqualTo("argumentName", 1, 2);
            }).not.toThrow();
        });
    });

    describe("isGreaterThan", () => {
        it("should throw ArgumentError if argument is not greater than the specified value", () => {
            expect(() => {
                Guard.Argument.isGreaterThan("argumentName", 1, 2);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is greater than the specified value", () => {
            expect(() => {
                Guard.Argument.isGreaterThan("argumentName", 2, 1);
            }).not.toThrow();
        });
    });

    describe("isGreaterThanOrEqualTo", () => {
        it("should throw ArgumentError if argument is not greater than or equal to the specified value", () => {
            expect(() => {
                Guard.Argument.isGreaterThanOrEqualTo("argumentName", 1, 2);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is greater than or equal to the specified value", () => {
            expect(() => {
                Guard.Argument.isGreaterThanOrEqualTo("argumentName", 2, 1);
            }).not.toThrow();
        });
    });

    describe("isInRangeInclusive", () => {
        it("should throw ArgumentError if argument is not in the specified range", () => {
            expect(() => {
                Guard.Argument.isInRangeInclusive("argumentName", 1, 2, 3);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is in the specified range", () => {
            expect(() => {
                Guard.Argument.isInRangeInclusive("argumentName", 2, 1, 3);
            }).not.toThrow();
        });
    });

    describe("isNotInRangeInclusive", () => {
        it("should throw ArgumentError if argument is in the specified range", () => {
            expect(() => {
                Guard.Argument.isNotInRangeInclusive("argumentName", 2, 1, 3);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is not in the specified range", () => {
            expect(() => {
                Guard.Argument.isNotInRangeInclusive("argumentName", 1, 2, 3);
            }).not.toThrow();
        });
    });

    describe("isInRangeExclusive", () => {
        it("should throw ArgumentError if argument is not in the specified range", () => {
            expect(() => {
                Guard.Argument.isInRangeExclusive("argumentName", 1, 2, 3);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is in the specified range", () => {
            expect(() => {
                Guard.Argument.isInRangeExclusive("argumentName", 2, 1, 3);
            }).not.toThrow();
        });
    });

    describe("isNotInRangeExclusive", () => {
        it("should throw ArgumentError if argument is in the specified range", () => {
            expect(() => {
                Guard.Argument.isNotInRangeExclusive("argumentName", 2, 1, 3);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is not in the specified range", () => {
            expect(() => {
                Guard.Argument.isNotInRangeExclusive("argumentName", 1, 2, 3);
            }).not.toThrow();
        });
    });

    describe("isFiniteNegativeInteger", () => {
        it("should throw ArgumentError if argument is not a finite negative integer", () => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", "value");
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a finite negative integer", () => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", -123);
            }).not.toThrow();
        });

        it("should if argument is zero", () => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", 0);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it("should throw argument is a finite positive integer", () => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", 123);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it("should not throw any error if argument is a finite negative integer", () => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", -123);
            }).not.toThrow();
        });
    });

    describe("isFinitePositiveInteger", () => {
        it("should throw ArgumentError if argument is not a finite positive integer", () => {
            expect(() => {
                Guard.Argument.isFinitePositiveInteger("argumentName", "value");
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a finite positive integer", () => {
            expect(() => {
                Guard.Argument.isFinitePositiveInteger("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isSafeInteger", () => {
        it("should throw ArgumentError if argument is not a safe integer", () => {
            expect(() => {
                Guard.Argument.isSafeInteger("argumentName", 1.23);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a safe integer", () => {
            expect(() => {
                Guard.Argument.isSafeInteger("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isFiniteNumber", () => {
        it("should throw ArgumentError if argument is not a finite number", () => {
            expect(() => {
                Guard.Argument.isFiniteNumber("argumentName", Infinity);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a finite number", () => {
            expect(() => {
                Guard.Argument.isFiniteNumber("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isInteger", () => {
        it("should throw ArgumentError if argument is not an integer", () => {
            expect(() => {
                Guard.Argument.isInteger("argumentName", 1.23);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is an integer", () => {
            expect(() => {
                Guard.Argument.isInteger("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isPositiveNumber", () => {
        it("should throw ArgumentError if argument is not a positive number", () => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", -1);
            }).toThrow(ArgumentError);
        });

        it("should not throw any error if argument is a positive number", () => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", 123);
            }).not.toThrow();
        });
    });

    describe("isNegativeNumber", () => {
        it.each([
            -1,
            -123,
            Number.MIN_SAFE_INTEGER,
        ], "should not throw any error if argument is a negative number (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNegativeNumber("argumentName", value);
            }).not.toThrow();
        });

        it.each([
            -1.5,
            -0.1,
        ], "should throw ArgumentError if argument is a negative number but not an integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNegativeNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it.each([
            -Infinity,
        ], "should throw ArgumentError if argument is a number but not a finite negative integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNegativeNumber("argumentName", value);
            }
            ).toThrow(ArgumentError);
        });

        it("should throw ArgumentError if argument is zero", () => {
            expect(() => {
                Guard.Argument.isNegativeNumber("argumentName", 0);
            }).toThrow(ArgumentOutOfRangeError);
        });

        it.each([
            1,
            123,
            Number.MAX_SAFE_INTEGER,
        ], "should throw ArgumentError if argument is a positive number (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNegativeNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it.each([
            1.5,
            0.1,
        ], "should throw ArgumentError if argument is a positive number but not an integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNegativeNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });

    });

    describe("isPositiveNumber", () => {
        it.each([
            [1],
            [123],
        ], "should not throw any error if argument is a positive number (%s)", (value) => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", value);
            }).not.toThrow();
        });

        it.each([
            [-1],
            [-123],
        ], "should throw ArgumentError if argument is a negative number (%s)", (value) => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it.each([
            [0],
        ], "should throw ArgumentError if argument is zero (%s)", (value) => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it.each([
            [Infinity],
        ], "should throw ArgumentError if argument is Infinity (%s)", (value) => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it.each([
            [NaN],
        ], "should throw ArgumentError if argument is NaN (%s)", (value) => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });


        it.each([
            [true],
            [false],
            [null],
            [undefined],
            [""],
            ["1"],
            ["1.23"],
            [{}],
            [[]],
            [() => { }],
        ])("should throw ArgumentError if argument is not a number (%s)", (value) => {
            expect(() => {
                Guard.Argument.isPositiveNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });
    });

    describe("isFiniteInteger", () => {
        it("should throw ArgumentError if argument is not a finite integer", () => {
            expect(() => {
                Guard.Argument.isFiniteInteger("argumentName", "value");
            }).toThrow(ArgumentError);
        });

        it.each([
            123,
            -123,
            -1,
            1,
            0,
            Number.MAX_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER,
        ], "should not throw any error if argument is a finite integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFiniteInteger("argumentName", value);
            }).not.toThrow();
        });

        it.each([
            "1",
            "1.23",
            true,
            false,
            null,
            undefined,
            NaN,
            1.5,
            -1.5,
            -0.1,
            {},
            [],
            () => { },
        ])("should throw ArgumentError if argument is not a integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFiniteInteger("argumentName", value);
            }).toThrow(ArgumentError);
        });


        it.each([
            Infinity,
            -Infinity,
        ])("should throw ArgumentOutOfRangeError if argument is a number but not a finite integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFiniteInteger("argumentName", value);
            }).toThrow(ArgumentOutOfRangeError);
        });
    });


    describe("isFiniteNegativeInteger", () => {
        it.each([
            [-1],
            [-123],
            [-Number.MAX_SAFE_INTEGER],
        ], "should not throw any error if argument is a finite negative integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", value);
            }).not.toThrow();
        });

        it.each([
            [-1.5],
            [-0.1],
        ], "should throw ArgumentError if argument is a negative number but not an integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it.each([
            [-Infinity],
        ], "should throw ArgumentError if argument is a number but not a finite negative integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it("should throw ArgumentError if argument is zero", () => {
            expect(() => {
                Guard.Argument.isFiniteNegativeInteger("argumentName", 0);
            }).toThrow(ArgumentOutOfRangeError);
        });
    });

    describe("isFinitePositiveInteger", () => {
        it.each([
            [1],
            [123],
            [Number.MAX_SAFE_INTEGER],
        ], "should not throw any error if argument is a finite positive integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFinitePositiveInteger("argumentName", value);
            }).not.toThrow();
        });

        it.each([
            [1.5],
            [0.1],
        ], "should throw ArgumentError if argument is a positive number but not an integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFinitePositiveInteger("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it.each([
            [Infinity],
        ], "should throw ArgumentError if argument is a number but not a finite positive integer (%s)", (value) => {
            expect(() => {
                Guard.Argument.isFinitePositiveInteger("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it("should throw ArgumentError if argument is zero", () => {
            expect(() => {
                Guard.Argument.isFinitePositiveInteger("argumentName", 0);
            }).toThrow(ArgumentOutOfRangeError);
        });
    });

    describe("isEmpty", () => {
        it.each([
            "",
            [],
            {},
        ])("should not throw if argument is empty (%s)", (value) => {
            expect(() => {
                Guard.Argument.isEmpty("argumentName", value, "message");
            }).not.toThrow();
        });

        it.each([
            " ",
            [1],
            { a: 1 },
        ])("should throw if argument is not empty (%s)", (value) => {
            expect(() => {
                Guard.Argument.isEmpty("argumentName", value, "message");
            }).toThrow(ArgumentError);
        });

        it.each([
            null, undefined,
        ])("should throw eif argument is null or undefined (%s)", (value) => {
            expect(() => {
                Guard.Argument.isEmpty("argumentName", value, "message");
            }).toThrow(ArgumentNullError);
        });

        it.each([
            1, true, false, NaN, Infinity, -Infinity,
        ])("should throw if argument is not a collection or string (%s)", (value) => {
            expect(() => {
                Guard.Argument.isEmpty("argumentName", value, "message");
            }).toThrow(ArgumentError);
        });


        it.each([
            "",
            [],
            {},
        ])("should not throw if argument is empty and message is not set (%s)", (value) => {
            expect(() => {
                Guard.Argument.isEmpty("argumentName", value);
            }).not.toThrow();
        });

        it.each([
            " ",
            [1],
            { a: 1 },
        ])("should throw if argument is not empty and message is not set (%s)", (value) => {
            expect(() => {
                Guard.Argument.isEmpty("argumentName", value);
            }).toThrow(ArgumentError);
        });

        it.each([
            null, undefined,
        ])("should throw eif argument is null or undefined and message is not set (%s)", (value) => {
            expect(() => {
                Guard.Argument.isEmpty("argumentName", value);
            }).toThrow(ArgumentNullError);
        });

        it.each([
            1, true, false, NaN, Infinity, -Infinity,
        ])("should throw if argument is not a collection or string and message is not set (%s)", (value) => {
            expect(() => {
                Guard.Argument.isEmpty("argumentName", value);
            }).toThrow(ArgumentError);
        });
    });

    describe("isNumber", () => {
        it.each([
            1,
            1.23,
            NaN,
            Infinity,
            -Infinity,
        ])("should not throw if argument is a number (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNumber("argumentName", value, "message");
            }).not.toThrow();
        });

        it.each([
            true,
            false,
            null,
            undefined,
            "",
            [],
            {},
        ])("should throw if argument is not a number (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNumber("argumentName", value, "message");
            }).toThrow(ArgumentError);
        });

        it.each([
            1,
            1.23,
            NaN,
            Infinity,
            -Infinity,
        ])("should not throw if argument is a number and message is not set: (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNumber("argumentName", value);
            }).not.toThrow();
        });

        it.each([
            true,
            false,
            null,
            undefined,
            "",
            [],
            {},
        ])("should throw if argument is not a number and message is not set: (%s)", (value) => {
            expect(() => {
                Guard.Argument.isNumber("argumentName", value);
            }).toThrow(ArgumentError);
        });
    });
});
