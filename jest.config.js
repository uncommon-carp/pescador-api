const ignoredFiles = [".*.d.ts$", "<rootDir>/packages/interfaces-*"];

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30000,
  testMatch: ["<rootDir>/packages/*/src/**/*.spec.ts"],
  testPathIgnorePatterns: ignoredFiles,
  coveragePathIgnorePatterns: ignoredFiles,
  collectCoverageFrom: ["<rootDir>/packages/*/src/**/*.ts"],
};
