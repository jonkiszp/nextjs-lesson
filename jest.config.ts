import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest();

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/app',
    '<rootDir>/jest-test',
  ],
};

export default createJestConfig(config);
