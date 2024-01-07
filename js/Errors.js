import Value from "./Value.js";

/**
 * Represents an error that occurs when an invalid argument is passed.
 * @extends Error
 */
export class ArgumentError extends Error {

    /**
     * Represents a constructor.
     * @constructor
     * @param {string} argumentName - The name of the argument.
     * @param {string} [defaultMesasge='Invalid argument'] - The default error message.
     * @param {string|null} [description=null] - Additional description of the error.
     */
    constructor(
        argumentName,
        defaultMesasge = null,
        description = null) {
        const trimmedArgumentName = !Value.isNullOrWhiteSpaces(argumentName) ? argumentName.trim() : null;
        const trimmedDescription = !Value.isNullOrWhiteSpaces(description) ? description.trim() : null;
        const trimmedDefaultMessage = !Value.isNullOrWhiteSpaces(defaultMesasge) ? defaultMesasge.trim() : null;

        const descriptionPart = trimmedDescription != null
            ? ` : ${trimmedDescription}`
            : "";

        const argumentPart = trimmedArgumentName != null
            ? ` (${trimmedArgumentName})`

            : "";

        const messagePart = trimmedDefaultMessage != null
            ? `${trimmedDefaultMessage}`
            : "Invalid argument";

        const message = `${messagePart}${argumentPart}${descriptionPart}`;
        super(message);

        this.name = "ArgumentError";
        this._argumentName = trimmedArgumentName;
        this._description = trimmedDescription;
    }

    /**
     * Gets the name of the argument.
     * @returns {string} The name of the argument.
     */
    get argumentName() {
        return this._argumentName;
    }

    /**
     * Gets the description of the error.
     * @returns {string} The description of the error.
     */
    get description() {
        return this._description;
    }
}

/**
 * Represents an error that occurs when an argument is null or undefined.
 * @extends ArgumentError
 */
export class ArgumetNullOrUndefinedError extends ArgumentError {

    /**
     * Represents a constructor.
     * @constructor
     * @param {string} argumentName - The name of the argument.
     * @param {string|null} [description=null] - Additional description of the error.
     */
    constructor(argumentName, description = null) {
        super(argumentName, "Argument is null or undefined", description);

        this.name = "ArgumetNullOrUndefinedError";
    }
}



/**
 * Represents an error that is thrown when an argument is null or undefined.
 * 
 * @extends {ArgumetNullOrUndefinedError}
 */
export class ArgumentNullError extends ArgumentError {

    /**
     * Represents a constructor.
     * @constructor
     * @param {string} argumentName - The name of the argument.
     * @param {string|null} [description=null] - Additional description of the error.
     */
    constructor(argumentName, description = null) {
        super(argumentName, "Argument is null", description);

        this.name = "ArgumentNullError";
    }
}

/**
 * Represents an error that is thrown when an argument is undefined.
 * 
 * @extends {ArgumetNullOrUndefinedError}
 */
export class ArgumentUndefinedError extends ArgumentError {

    /**
     * Represents a constructor function.
     * @constructor
     * @param {string} argumentName - The name of the argument.
     * @param {string|null} [description=null] - Additional description of the error.
     */
    constructor(argumentName, description = null) {
        super(argumentName, "Argument is undefined", description);

        this.name = "ArgumentUndefinedError";
    }
}


/**
 * Represents an error that is thrown when an argument is out of range.
 * 
 * @extends ArgumentError
 */
export class ArgumentOutOfRangeError extends ArgumentError {
    /**
     * Represents an error that occurs when an argument is out of range.
     * @constructor
     * @param {string} argumentName - The name of the argument.
     * @param {string|null} [description=null] - Additional description of the error.
     */
    constructor(argumentName, description = null) {
        super(argumentName, "Argument is out of range", description);

        this.name = "ArgumentOutOfRangeError";
    }
}


/**
 * Represents an error that occurs when an invalid operation is performed for the current state of the object.
 * 
 * @extends Error
 */
export class InvalidOperationError extends Error {

    /**
     * Represents a constructor function.
     * @constructor
     * @param {string} [message=null] - The error message.
     */
    constructor(message) {
        super(message || "Invalid operation");

        this.name = "InvalidOperationError";
    }
}

export default {
    ArgumentError,
    ArgumentNullError,
    ArgumentUndefinedError,
    ArgumentOutOfRangeError,
    InvalidOperationError,
};