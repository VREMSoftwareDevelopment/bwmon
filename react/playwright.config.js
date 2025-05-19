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
    workers: process.env.CI ? 1 : 4,
    timeout: process.env.CI ? 90000 : 30000,
    expect: { timeout: process.env.CI ? 30000 : 5000 },
    reporter: [
        ['html', { outputFolder: 'reports/playwright/html' }],
        ['junit', { outputFile: 'reports/playwright/results.xml' }],
        [process.env.CI ? 'github' : 'list'],
    ],
    use: {
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        actionTimeout: process.env.CI ? 30000 : 10000,
        navigationTimeout: process.env.CI ? 60000 : 20000,
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
