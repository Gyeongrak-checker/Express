const path = require('path');

module.exports = {
    setupFiles: ['<rootDir>/test/setup-env.js'],
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};