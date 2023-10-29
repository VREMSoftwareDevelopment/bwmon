/*
 *      Copyright (C) 2010 - 2023 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *           http: //www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 * Bandwidth Monitor
 */

import { HOME_URL, TIMEOUT, launch, startCoverage, stopCoverage } from './e2e-config';

describe('Navigation e2e', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await launch();
        page = await browser.newPage();
        await startCoverage(page);
        await page.goto(HOME_URL);
    }, TIMEOUT);

    afterAll(async () => {
        await stopCoverage(page, 'Navigation e2e');
        await page.close();
        await browser.close();
    }, TIMEOUT);

    beforeEach(async () => {
        await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
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
        'Usage by Year Graph',
        async () => {
            const selector = '#usage-by-year-graph';
            await page.waitForSelector(selector);
            await page.click(selector);
            const url = page.url();
            expect(url).toBe(HOME_URL + 'UsageByYearGraph');
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
        'Usage by Month Graph',
        async () => {
            const selector = '#usage-by-month-graph';
            await page.waitForSelector(selector);
            await page.click(selector);
            const url = page.url();
            expect(url).toBe(HOME_URL + 'UsageByMonthGraph');
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

    test(
        'Usage by User Graph',
        async () => {
            const selector = '#usage-by-user-graph';
            await page.waitForSelector(selector);
            await page.click(selector);
            const url = page.url();
            expect(url).toBe(HOME_URL + 'UsageByUserGraph');
        },
        TIMEOUT
    );
});
