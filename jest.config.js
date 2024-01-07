/** @type {import('jest').Config} */

module.exports = {
    testEnvironment: "jest-environment-jsdom",
    testMatch: [
        "**/js/__tests__/**/*.js?(x)",
        "**/?(*.)+(spec|test).js?(x)"
    ],
    moduleFileExtensions: ["js", "json"],
    collectCoverage: false,
    coverageReporters: ["html", "text"],
    transform: {
        "^.+\\.js$": "babel-jest"
    },
};
