// jest.config.mjs
export default {
    testEnvironment: '<rootDir>/jest.enviroment.js',
    testMatch: ['<rootDir>/src/**/*.test.js?(x)'],
    modulePaths: ['<rootDir>/src/'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/index.jsx', '!src/serviceWorker.js', '!**/e2e/**', '!**/__mocks__/**'],
    coverageDirectory: '<rootDir>/reports/coverage',
    coverageThreshold: {
        global: {
            branches: 98.9,
            functions: 93.9,
            lines: 99,
            statements: 97.5,
        },
    },
};
