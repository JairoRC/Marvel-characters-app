const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

require("dotenv").config({ path: ".env.test" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/context/(.*)$": "<rootDir>/src/context/$1",
    "^@/test-utils/(.*)$": "<rootDir>/src/test-utils/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
