const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  roots: ["<rootDir>"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/infra/**",
    "!<rootDir>/src/migrations/**",
    "!<rootDir>/src/**/index.ts",
  ],
  testMatch: ["<rootDir>/__test__/*/*.spec.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  coverageDirectory: "coverage",
  testEnvironment: "node",
  preset: "ts-jest",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
