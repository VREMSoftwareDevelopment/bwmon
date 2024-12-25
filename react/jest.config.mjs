// jest.config.mjs
export default {
    testEnvironment: '<rootDir>/jest.enviroment.js',
    testMatch: ['<rootDir>/src/**/*.test.js?(x)'],
    modulePaths: ['<rootDir>/src/'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/index.jsx', '!src/serviceWorker.js', '!**/e2e/**', '!**/__mocks__/**'],
    coverageThreshold: {
        global: {
            branches: 99,
            functions: 93,
            lines: 99,
            statements: 97,
        },
    },
};
