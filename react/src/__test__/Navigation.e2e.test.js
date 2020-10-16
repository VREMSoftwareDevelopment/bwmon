import { HOME_URL, TIMEOUT, launch, materialSelect } from './e2e-config';

describe('Navigation e2e', () => {
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
        'Usage by Year',
        async () => {
            const selector = '#usage-by-year';
            await page.waitForSelector(selector);
            await page.click(selector);
            const url = page.url();
            expect(url).toBe(HOME_URL + 'UsageByYear');
        },
        TIMEOUT
    );

    test(
        'Usage by Month',
        async () => {
            const selector = '#usage-by-month';
            await page.waitForSelector(selector);
            await page.click(selector);
            const url = page.url();
            expect(url).toBe(HOME_URL + 'UsageByMonth');
        },
        TIMEOUT
    );

    test(
        'Usage by User',
        async () => {
            const selector = '#usage-by-user';
            await page.waitForSelector(selector);
            await page.click(selector);
            const url = page.url();
            expect(url).toBe(HOME_URL + 'UsageByUser');
        },
        TIMEOUT
    );
});
