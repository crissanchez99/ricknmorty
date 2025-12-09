import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@environments/(.*)': '<rootDir>/src/environments/$1',
    '@interface-core/(.*)': '<rootDir>/src/core/core-interface/$1',
  },
  collectCoverageFrom: ['./src/**', 'src/core/core-interface/use-case.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.html',
    '<rootDir>/src/main.ts',
    '<rootDir>/src/test.ts',
    '<rootDir>/src/polyfills.ts',
  ],

  transformIgnorePatterns: [
    '/node_modules/(?!flat)/',
  ],
  moduleDirectories: ['node_modules', 'src'],
  fakeTimers: {
    enableGlobally: true,
  },
};

export default config;
