/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};