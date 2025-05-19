// paywright.config.js
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './e2e',
    outputDir: 'reports/playwright/test-results',
    preserveOutput: 'failures-only',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 1,
    workers: 1,
    timeout: 60000,
    expect: { timeout: 10000 },
    reporter: [
        ['html', { outputFolder: 'reports/playwright/html' }],
        ['junit', { outputFile: 'reports/playwright/results.xml' }],
        [process.env.CI ? 'github' : 'list'],
    ],
    use: {
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        actionTimeout: 10000,
        navigationTimeout: 60000,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        /* Test against mobile viewports. */
        // { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
        // { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
        /* Test against branded browsers. */
        // { name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
        // { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    ],
    webServer: {
        command: 'npm run start',
        reuseExistingServer: !process.env.CI,
    },
});
