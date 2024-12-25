import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './e2e',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: [['html'], ['list']],
    use: {
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
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
