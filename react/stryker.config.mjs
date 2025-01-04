// stryker.config.mjs
/*
    https://stryker-mutator.io/docs/stryker-js/configuration/ for more information
    https://stryker-mutator.io/docs/stryker-js/jest-runner for information about the jest plugin
*/
const config = {
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'jest',
    coverageAnalysis: 'perTest',
    tempDirName: 'stryker-tmp',
    cleanTempDir: 'always',
    ignoreStatic: true,
    mutate: [
        'src/**/*.{js,jsx}',
        '!**/*test.{js,jsx}',
        '!**/__mocks__/*',
        '!**/index.jsx',
        '!**/serviceWorker.js',
        '!**/theme.js',
        '!**/StylesUtils.js',
    ],
    ignorePatterns: [
        'build',
        'coverage',
        'node_modules',
        'playwright-report',
        'public',
        'reports',
        'test-results',
        'e2e',
        'public',
        'stryker-tmp',
    ],
    jest: {
        projectType: 'custom',
        configFile: './jest.config.mjs',
        config: {
            testEnvironment: './jest.enviroment.js',
        },
        enableFindRelatedTests: true,
    },
    thresholds: { high: 80, low: 60, break: 90 },
};

export default config;
