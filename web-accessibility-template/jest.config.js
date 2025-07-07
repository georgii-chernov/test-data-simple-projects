module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['<rootDir>/src/', 'node_modules'],
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.html',
    '**/*.js',
    '!**/node_modules/**',
  ],
  testEnvironment: 'jsdom',
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: 'test-results',
        outputName: "junit.xml",
      },
    ],
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};
