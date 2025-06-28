import type { Config } from "jest";

import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

import nextJest from "next/jest.js";

const moduleNameMapper = {
  "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$":
    "<rootDir>/tests/__mocks__/fileMock.ts",
  "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
  "^next/font/google$": "<rootDir>/tests/__mocks__/nextFontMock.ts",
  "^next/font/local$": "<rootDir>/tests/__mocks__/nextFontMock.ts",
  "^next/image$": "<rootDir>/tests/__mocks__/nextImageMock.tsx",
  "^next/dynamic$": "<rootDir>/tests/__mocks__/nextDynamicMock.tsx",
  "^next-themes$": "<rootDir>/tests/__mocks__/nextThemesMock.tsx",
  ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
};

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "tests/coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleDirectories: ["./"],
  moduleNameMapper,
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!next|react|react-dom|@next|@react|next-test-api-route-handler|lodash-es|@internationalized|react-aria|@react-aria|@react-stately|@react-types)/",
  ],
  projects: [
    {
      displayName: "ui",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/**/*.(test|spec).{ts,tsx}", "!**/app/api/**"],
      setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
      transform: {
        "^.+\\.(ts|tsx|js|jsx)$": [
          "@swc/jest",
          {
            jsc: {
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
          },
        ],
      },
      moduleNameMapper,
    },
    {
      displayName: "api",
      testEnvironment: "node",
      testMatch: ["<rootDir>/app/api/**/*.(test|spec).{ts,tsx}"],
      transform: {
        "^.+\\.(ts|tsx|js|jsx)$": ["@swc/jest"],
      },
      moduleNameMapper,
    },
  ],
};

const jestConfig = createJestConfig(config);

export default jestConfig;
