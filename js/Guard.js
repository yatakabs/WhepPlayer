
import { ArgumentNullError, ArgumentOutOfRangeError } from "./Errors.js";
import { ArgumentError } from "./Errors.js";

export default {
    /**
     * Validates the argument.
     * @param {string} argumentName - The name of the argument.
     */
    Argument: {
        /**
         * Checks if the given argument is not null or undefined.
         * @param {string} argumentName - The name of the argument.
         * @param {*} argument - The argument to check.
         * @param {string} [description=null] - The optional error message.
         * @throws {ArgumentNullError} Throws an error if the argument is null or undefined.
         */
        isNotNullOrUndefined(argumentName, argument, description = null) {
            if (typeof argument === "undefined" || argument === null) {
                throw new ArgumentNullError(argumentName, description);
            }
        },

        /**
         * Checks if the given argument is not undefined.
         * @param {string} argumentName - The name of the argument.
         * @param {*} argument - The argument to check.
         * @param {string|null} [description] - Optional description of the argument.
         * @throws {ArgumentNullError} - Throws an ArgumentNullError if the argument is undefined.
         */
        isNotUndefined(argumentName, argument, desciption = null) {
            if (typeof argument === "undefined") {
                throw new ArgumentNullError(argumentName, desciption);
            }
        },

        /**
         * Checks if the given argument is not null.
         * @param {string} argumentName - The name of the argument.
         * @param {*} argument - The argument to check.
         * @param {string} [description=null] - The optional error message.
         * @throws {ArgumentNullError} Throws an error if the argument is null.
         */
        isNotNull(argumentName, argument, description = null) {
            if (argument === null) {
                throw new ArgumentNullError(argumentName, description);
            }
        },

        /**
         * Checks if the given argument is exactly of the specified type.
         *
         * @param {string} argumentName - The name of the argument.
         * @param {*} argument - The argument to check.
         * @param {Type|string} type - The type to check against.
         * @param {string} [description=null] - The optional error message.
         * @throws {ArgumentError} Throws an error if the argument is undefined.
         * @see ArgumentError
         */
        isOfType(argumentName, argument, type, description = null) {
            this.isNotNullOrUndefined(argumentName, argument, description);

            // if type is a function, then test against 
            const testTypeName = typeof type === "function"
                ? type.name
                : typeof type == "string"
                    ? type
                    : type.constructor.name; // Msut be an object here.

            if (typeof argument === "object" && argument.constructor.name === testTypeName) {
                return;
            }

            if (typeof argument === testTypeName) {
                return;
            }

            throw new ArgumentError(argumentName, description, "Argument must be of type " + testTypeName);
        },

        /**
         * Checks if the given argument is assignable to the specified type.
         *
         * @param {string} argumentName - The name of the argument.
         * @param {*} argument - The argument to check.
         * @param {Type} type - The type to check against.
         * @param {string} [description=null] - The optional error message to describe detils of the error.
         * @throws {ArgumentError} Throws an error if the argument is not assignable to the specified type.
         * @see ArgumentError
         */
        isAssignableTo(argumentName, argument, type, description = null) {
            if (!(argument instanceof type)) {
                throw new ArgumentError(argumentName, description, "Argument must be assignable to " + type);
            }
        },

        /**
         * Checks if the given argument is not null or undefined, and is of the specified type.
         *
         * @param {string} argumentName - The name of the argument.
         * @param {*} argument - The argument to check.
         * @param {Type} type - The type to check against.
         * @param {string} [description=null] - The optional error message to describe detils of the error.
         * 
         * @throws {ArgumentOutOfRangeError} Throws an error if the argument is not in the specified range.
         */
        isAnyOf(argumentName, argument, values, description = null) {
            const isValueEmpty = typeof values === "undefined" || values === null || values.length === 0;
            const includes = values.includes(argument);

            if (isValueEmpty || !includes) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be one of " + values);
            }
        },

        /**
         * Checks if the given argument is less than the specified value.
         * Throws an ArgumentOutOfRangeError if the argument is greater than or equal to the value.
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument to be checked.
         * @param {number} value - The value to compare against.
         * @param {string|null} [description=null] - An optional description for the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an ArgumentOutOfRangeError if the argument is greater than or equal to the value.
         */
        isLessThan(argumentName, argument, value, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument >= value) {
                throw new ArgumentOutOfRangeError(argumentName, description, `Argument must be less than ${value}`);
            }
        },

        /**
         * Checks if the given argument is less than or equal to the specified value.
         * Throws an ArgumentOutOfRangeError if the argument is greater than the value.
         * 
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument value to be checked.
         * @param {number} value - The value to compare against.
         * @param {string|null} [description=null] - Optional description for the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an ArgumentOutOfRangeError if the argument is greater than the value.
         */
        isLessThanOrEqualTo(argumentName, argument, value, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument > value) {
                throw new ArgumentOutOfRangeError(argumentName, description, `Argument must be less than or equal to ${value}`);
            }
        },

        /**
         * Checks if the given argument is larger than a specified value.
         * Throws an ArgumentOutOfRangeError if the argument is not larger than the value.
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument value to be checked.
         * @param {number} value - The value that the argument should be larger than.
         * @param {string|null} [description=null] - Optional description for the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an ArgumentOutOfRangeError if the argument is not larger than the value.
         */
        isGreaterThan(argumentName, argument, value, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument <= value) {
                throw new ArgumentOutOfRangeError(argumentName, description, `Argument must be larger than ${value}`);
            }
        },


        /**
         * Checks if the given argument is larger than or equal to the specified value.
         * Throws an ArgumentOutOfRangeError if the argument is smaller than the value.
         * 
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The value of the argument being checked.
         * @param {number} value - The value to compare against.
         * @param {string|null} [description=null] - An optional description for the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an ArgumentOutOfRangeError if the argument is smaller than the value.
         */
        isGreaterThanOrEqualTo(argumentName, argument, value, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument < value) {
                throw new ArgumentOutOfRangeError(argumentName, description, `Argument must be larger than or equal to ${value}`);
            }
        },

        /**
         * Checks if the given argument is within the specified range (inclusive).
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument value to be checked.
         * @param {number} min - The minimum value of the range.
         * @param {number} max - The maximum value of the range.
         * @param {string|null} [description=null] - Optional description for the argument.
         * @throws {ArgumentError} - If the argument is not a number.   
         * @throws {ArgumentOutOfRangeError} Throws an error if the argument is not within the specified range.
         */
        isInRangeInclusive(argumentName, argument, min, max, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument < min || argument > max) {
                throw new ArgumentOutOfRangeError(argumentName, description, `Argument must be in range [${min}, ${max}]`);
            }
        },

        /**
         * Checks if the given argument is within the specified range (exclusive).
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument value to be checked.
         * @param {number} min - The minimum value of the range (exclusive).
         * @param {number} max - The maximum value of the range (exclusive).
         * @param {string|null} [description] - Optional description for the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an error if the argument is not within the specified range.
         */
        isInRangeExclusive(argumentName, argument, min, max, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument <= min || argument >= max) {
                throw new ArgumentOutOfRangeError(argumentName, description, `Argument must be in range (${min}, ${max})`);
            }
        },

        /**
         * Checks if the given argument is not within the specified range (inclusive).
         * Throws an ArgumentOutOfRangeError if the argument is within the range.
         * 
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument value to check.
         * @param {number} min - The minimum value of the range.
         * @param {number} max - The maximum value of the range.
         * @param {string|null} [description=null] - Optional description of the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - If the argument is within the range.
         */
        isNotInRangeInclusive(argumentName, argument, min, max, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument >= min && argument <= max) {
                throw new ArgumentOutOfRangeError(argumentName, description, `Argument must not be in range [${min}, ${max}]`);
            }
        },

        /**
         * Checks if the given argument is not within the specified range (exclusive).
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to check.
         * @param {number} min - The minimum value of the range.
         * @param {number} max - The maximum value of the range.
         * @param {string|null} [description] - Optional description of the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - If the argument is within the specified range.
         */
        isNotInRangeExclusive(argumentName, argument, min, max, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument > min && argument < max) {
                throw new ArgumentOutOfRangeError(argumentName, description, `Argument must not be in range (${min}, ${max})`);
            }
        },

        /**
         * Checks if the given argument is a positive number.
         * Throws an ArgumentOutOfRangeError if the argument is not positive.
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to check.
         * @param {string} [description] - Optional description of the argument.
         * @throws {ArgumentError} - Throws an error if the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an error if the argument is not positive.
         */
        isPositiveNumber(argumentName, argument, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument <= 0) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be positive.");
            }
        },

        /**
         * Checks if the given argument is a positive integer.
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to be checked.
         * @param {string} [description] - Optional description of the argument.
         * @throws {ArgumentError} If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} If the argument is not a positive integer.
         */
        isPositiveInteger(argumentName, argument, description = null) {
            this.isNumber(argumentName, argument, description);

            if (!Number.isInteger(argument) || argument <= 0) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be a positive integer");
            }
        },

        /**
         * Checks if the given argument is a negative integer.
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to be checked.
         * @param {string|null} [description] - The description of the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - If the argument is not a negative integer.
         */
        isNegativeInteger(argumentName, argument, description = null) {
            this.isNumber(argumentName, argument, description);

            if (!Number.isInteger(argument) || argument >= 0) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be a negative integer");
            }
        },

        /**
         * Checks if the given argument is a finite positive integer.
         * Throws an ArgumentError if the argument is not a finite positive integer.
         *
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument to be checked.
         * @param {string|null} [description=null] - The description of the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - If the argument is not a finite positive integer.
         */
        isFinitePositiveInteger(argumentName, argument, description = null) {
            this.isNumber(argumentName, argument, description);

            if (!Number.isFinite(argument) || argument <= 0) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be a finite positive integer");
            }

            this.isInteger(argumentName, argument, description);
        },

        /**
         * Checks if the given argument is a finite negative integer.
         * Throws an ArgumentError if the argument is not a finite negative integer.
         *
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument to be checked.
         * @param {string|null} [description=null] - Optional description of the argument.
         * @throws {ArgumentError} - If the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - If the argument is not a finite negative integer.
         * 
         */
        isFiniteNegativeInteger(argumentName, argument, description = null) {
            this.isNumber(argumentName, argument, description);

            if (!Number.isFinite(argument) || argument >= 0) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be a finite negative integer");
            }

            this.isInteger(argumentName, argument, description);
        },

        /**
         * Checks if the given argument is a finite integer.
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to be checked.
         * @param {string|null} [description=null] - The description of the argument.
         * @throws {ArgumentError} - Throws an ArgumentError if the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an ArgumentOutOfRangeError if the argument is not a finite integer.
         */
        isFiniteInteger(argumentName, argument, description = null) {
            this.isNumber(argumentName, argument, description);
            if (!Number.isFinite(argument)) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be a finite integer");
            }

            this.isInteger(argumentName, argument, description);
        },


        /**
         * Checks if the given argument is a safe integer.
         * 
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument to be checked.
         * @param {string|null} [description] - Optional description of the argument.
         * @throws {ArgumentOutOfRangeError} - Throws an ArgumentOutOfRangeError if the argument is not a safe integer.
         */
        isSafeInteger(argumentName, argument, description = null) {
            if (!Number.isSafeInteger(argument)) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be a safe integer");
            }

            this.isInteger(argumentName, argument, description);
        },


        /**
         * Checks if the given argument is a number.
         * @param {string} argumentName - The name of the argument.
         * @param {*} argument - The argument to be checked.
         * @param {string|null} [description=null] - The description of the argument.
         * @throws {ArgumentError} - Throws an error if the argument is not a number.
         */
        isNumber(argumentName, argument, description = null) {
            if (typeof argument !== "number") {
                throw new ArgumentError(argumentName, description, "Argument must be a number");
            }
        },

        /**
         * Checks if the given argument is negative.
         * Throws an ArgumentOutOfRangeError if the argument is not negative.
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to check.
         * @param {string|null} [description] - Optional description of the argument.
         * @throws {ArgumentError} - Throws an ArgumentError if the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an error if the argument is not negative.
         */
        isNegativeNumber(argumentName, argument, description = null) {
            this.isNumber(argumentName, argument, description);

            if (argument >= 0) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be negative");
            }
        },

        /**
         * Checks if the given argument is an integer.
         * @param {string} argumentName - The name of the argument.
         * @param {any} argument - The argument to be checked.
         * @param {string|null} [description=null] - The description of the argument.
         * @throws {ArgumentError} - Throws an ArgumentError if the argument is not an integer.
         */
        isInteger(argumentName, argument, description = null) {
            if (!Number.isInteger(argument)) {
                throw new ArgumentError(argumentName, description, "Argument must be an integer");
            }
        },

        /**
         * Checks if a number is finite.
         * @param {string} argumentName - The name of the argument being checked.
         * @param {number} argument - The argument to be checked.
         * @param {string|null} [description=null] - The description of the argument being checked.
         * @throws {ArgumentError} - Throws an ArgumentError if the argument is not a number.
         * @throws {ArgumentOutOfRangeError} - Throws an ArgumentOutOfRangeError if the argument is not finite.
         */
        isFiniteNumber(argumentName, argument, description = null) {
            this.isNumber(argumentName, argument, description);

            if (!Number.isFinite(argument)) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be finite");
            }

            this.isInteger(argumentName, argument, description);
        },

        /**
         * Checks if the given argument is NaN.
         * @param {string} argumentName - The name of the argument.
         * @param {*} argument - The argument to check.
         * @param {string|null} [description=null] - The description of the argument.
         * @throws {ArgumentOutOfRangeError} If the argument is not NaN.
         */
        isNaN(argumentName, argument, description = null) {
            if (!Number.isNaN(argument)) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be NaN.");
            }
        },

        /**
         * Checks if the given argument is not NaN.
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to check.
         * @param {string|null} [description] - Optional description of the argument.
         * @throws {ArgumentOutOfRangeError} - Throws an ArgumentError if the argument is NaN.
         */
        isNotNaN(argumentName, argument, description = null) {
            if (Number.isNaN(argument)) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must not be NaN.");
            }
        },

        /**
         * Checks if the given argument is zero.
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to check.
         * @param {string} [description] - Optional description of the argument.
         * @throws {ArgumentOutOfRangeError} - Throws an error if the argument is not zero.
         */
        isZero(argumentName, argument, description = null) {
            if (argument !== 0) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must be zero");
            }
        },

        /**
         * Checks if the given argument is not zero.
         * @param {string} argumentName - The name of the argument.
         * @param {number} argument - The argument to check.
         * @param {string} [description] - Optional description of the argument.
         * @throws {ArgumentOutOfRangeError} - Throws an error if the argument is zero.
         */
        isNotZero(argumentName, argument, description = null) {
            if (argument === 0) {
                throw new ArgumentOutOfRangeError(argumentName, description, "Argument must not be zero");
            }
        },

        /**
         * Checks if the given argument is empty.
         * @param {string} argumentName - The name of the argument.
         * @param {Array} argument - The argument to check.
         * @param {string} [description] - Optional description of the argument.
         * 
         * @throws {ArgumentNullError} - Throws an error if the argument is null.
         * @throws {ArgumentOutOfRangeError} - Throws an error if the argument is not empty.
         */
        isEmpty(argumentName, argument, description = null) {
            this.isNotNullOrUndefined(argumentName, argument, description);

            switch (typeof argument) {
                case "string":
                    if (argument !== "") {
                        throw new ArgumentError(argumentName, description, "Argument must be empty.");
                    }
                    break;

                case "object":
                    if (Array.isArray(argument) && argument.length !== 0) {
                        throw new ArgumentError(argumentName, description, "Argument must be empty.");
                    }
                    else if (Object.keys(argument).length !== 0) {
                        throw new ArgumentError(argumentName, description, "Argument must be empty.");
                    }
                    break;

                default:
                    throw new ArgumentError(argumentName, description, "Argument must be empty.");
            }
        },
    }
};