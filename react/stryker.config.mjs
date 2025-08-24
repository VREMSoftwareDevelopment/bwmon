// stryker.config.mjs
/*
    https://stryker-mutator.io/docs/stryker-js/configuration/ for more information
    https://stryker-mutator.io/docs/stryker-js/jest-runner for information about the jest plugin
*/
const config = {
    concurrency: process.env.CI ? 2 : 8,
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'jest',
    coverageAnalysis: 'perTest',
    tempDirName: 'stryker-tmp',
    cleanTempDir: 'always',
    ignoreStatic: true,
    mutate: [
        'src/**/*.{js,jsx}',
        '!src/**/*test.{js,jsx}',
        '!src/**/__mocks__/*',
        '!src/**/index.{js,jsx}',
        '!src/**/serviceWorker.{js,jsx}',
        '!src/**/theme.{js,jsx}',
        '!src/**/API*.{js,jsx}',
        '!src/**/CellInfo*.{js,jsx}',
        '!src/**/Menu*.{js,jsx}',
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
    thresholds: { high: 80, low: 60, break: 80 },
};

export default config;
