const path = require('path');

process.env.TS_NODE_PROJECT = path.resolve('tsconfig.test.json');

module.exports = {
  "extension": ["ts"],
  "spec": "src/**/*.test.ts",
  "require": ["ts-node/register", "./mocha-setup.js"]
};
