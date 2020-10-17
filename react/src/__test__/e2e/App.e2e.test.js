import { HOME_URL, TIMEOUT, launch } from './e2e-config';

describe('App e2e', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await launch();
        page = await browser.newPage();
        await page.goto(HOME_URL);
    }, TIMEOUT);

    afterAll(async () => {
        await page.close();
        await browser.close();
    }, TIMEOUT);

    test(
        'header element',
        async () => {
            await page.waitForSelector('#app-title');
            const title = await page.$eval('#app-title', (e) => e.innerHTML);
            expect(title).toBe('Bandwidth Monitor Usage');
        },
        TIMEOUT
    );
});
