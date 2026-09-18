// stryker.config.mjs
/*
    https://stryker-mutator.io/docs/stryker-js/configuration/ for more information
    https://stryker-mutator.io/docs/stryker-js/vitest-runner for information about the vitest plugin
*/
const config = {
    concurrency: process.env.CI ? 2 : 8,
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'vitest',
    coverageAnalysis: 'perTest',
    tempDirName: 'stryker-tmp',
    cleanTempDir: 'always',
    ignoreStatic: true,
    mutate: [
        'src/**/*.{ts,tsx}',
        '!src/**/*test.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/types.ts',
        '!src/**/__mocks__/*',
        '!src/test-utils.ts',
        '!src/**/index.{ts,tsx}',
        '!src/**/theme.{ts,tsx}',
        '!src/**/API*.{ts,tsx}',
        '!src/**/CellInfo*.{ts,tsx}',
        '!src/**/Menu*.{ts,tsx}',
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
    vitest: {
        configFile: 'vite.config.mjs',
    },
    thresholds: { high: 80, low: 60, break: 80 },
};

export default config;
