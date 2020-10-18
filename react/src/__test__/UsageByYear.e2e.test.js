import { HOME_URL, TIMEOUT, launch, materialSelect } from './e2e-config';

describe('UsageByYear e2e', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await launch();
    }, TIMEOUT);

    afterAll(async () => {
        await browser.close();
    }, TIMEOUT);

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(HOME_URL + 'UsageByYear');
        await page.waitForSelector('#year-data-0');
    }, TIMEOUT);

    afterEach(async () => {
        await page.close();
    }, TIMEOUT);

    test(
        'should have table',
        async () => {
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(3);
        },
        TIMEOUT
    );

    test(
        'should sort by year descending',
        async () => {
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toEqual('2013	603.928	35.773	639.701	1.753	365');
            expect(tbodyElements[2]).toEqual('2011	139.939	10.745	150.684	0.413	365');
        },
        TIMEOUT
    );

    test(
        'should sort by year ascending',
        async () => {
            const selector = '#year-id > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toEqual('2011	139.939	10.745	150.684	0.413	365');
            expect(tbodyElements[2]).toEqual('2013	603.928	35.773	639.701	1.753	365');
        },
        TIMEOUT
    );

    test(
        'should sort by total descending',
        async () => {
            const selector = '#year-total > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toEqual('2013	603.928	35.773	639.701	1.753	365');
            expect(tbodyElements[2]).toEqual('2011	139.939	10.745	150.684	0.413	365');
        },
        TIMEOUT
    );

    test(
        'should sort by total ascending',
        async () => {
            const selector = '#year-total > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toEqual('2011	139.939	10.745	150.684	0.413	365');
            expect(tbodyElements[2]).toEqual('2013	603.928	35.773	639.701	1.753	365');
        },
        TIMEOUT
    );
});
