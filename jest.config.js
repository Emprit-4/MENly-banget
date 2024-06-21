// Pengaturan bawaan ges

/** @type {import('jest').Config} */
const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    watchman: true,
    testPathIgnorePatterns: ["\\\\node_modules\\\\"],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)",
    ],
};

module.exports = config;
