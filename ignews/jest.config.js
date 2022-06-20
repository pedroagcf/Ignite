module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/customtypes/", "/slices/", "/stripe-cli/"],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{tsx}",
    "src/**/*.spec.tsx",
  ],
  coverageReporters: ["clover", "json", "lcov", ["text", { "skipFull": true }]]

}