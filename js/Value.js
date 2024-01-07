
/**
 * Checks if the given value is null.
 * This method never throw an error.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is null, false otherwise.
 */
const isNull = (value) => {
    return value === null;
};

/**
 * Checks if a value is undefined.
 * This method never throw an error.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is undefined, otherwise returns false.
 */
const isUndefined = (value) => {
    return typeof value === "undefined";
};

const isNullOrUndefined = (value) => {
    return isUndefined(value) || isNull(value);
};


/**
 * Checks if a given text is empty.
 * This method never throw an error.
 *
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the text is empty, false otherwise.
 */
const isEmpty = (text) => {
    return text === "";
};

/**
 * Checks if a given text is null or empty.
 * This method never throw an error.
 *
 * @param {string} text - The text to check.
 * @returns {boolean} - True if the text is null or empty, false otherwise.
 */
const isNullOrEmpty = (text) => {
    return isNullOrUndefined(text) || isEmpty(text);
};

/**
 * Checks if a given text contains only white spaces.
 * This method never throw an error.
 *
 * @param {string} text - The text to be checked.
 * @returns {boolean} - True if the text contains only white spaces, false otherwise.
 */
const isOnlyWhiteSpaces = (text) => {
    if (typeof text !== "string") {
        return false;
    }

    return text.match(/^ +$/) !== null;
};

/**
 * Checks if a string is null, undefined, empty, or contains only whitespace.
 * This method never throw an error.
 * @param {string} text - The string to check.
 *
 * @returns {boolean} - True if the string is null, undefined, empty, or contains only whitespace; otherwise, false.

 */
const isNullOrWhiteSpaces = (text) => {
    return isNullOrEmpty(text) || isOnlyWhiteSpaces(text);
};

const Value = {
    isNull,
    isUndefined,
    isNullOrUndefined,
    isEmpty,
    isNullOrEmpty,
    isOnlyWhiteSpaces,
    isNullOrWhiteSpaces,
};

export default Value;
