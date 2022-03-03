module.exports = {
  moduleNameMapper: {
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "_vars.scss$": "<rootDir>/stubs/scssVarsStub.js",
    "bounce.scss$": "<rootDir>/stubs/scssVarsStub.js",
  },
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
};
