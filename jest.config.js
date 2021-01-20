const { defaults } = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupTestFrameworkScriptFile: "./test/setup.js"
  // ...
};
