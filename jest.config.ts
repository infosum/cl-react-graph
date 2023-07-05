import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!d3|internmap|delaunator|robust-predicates)'
  ],
};

export default config;
