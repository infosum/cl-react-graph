import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  transformIgnorePatterns: [
    "node_modules/(?!d3-*)"
  ],
};

export default config;
