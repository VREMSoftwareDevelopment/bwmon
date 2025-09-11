// jest.config.mjs
export default {
    testEnvironment: '<rootDir>/jest.enviroment.js',
    testMatch: ['<rootDir>/src/**/*.test.js?(x)'],
    modulePaths: ['<rootDir>/src/'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    // Allow transformation of ESM modules in node_modules, except for those that don't need it
    transformIgnorePatterns: ['/node_modules/(?!(react-error-boundary)/)'],
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/index.jsx', '!src/serviceWorker.js', '!**/e2e/**', '!**/__mocks__/**'],
    coverageDirectory: '<rootDir>/reports/coverage',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
};
