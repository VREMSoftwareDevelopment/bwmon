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

describe('UsageByYear e2e', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await launch();
        page = await browser.newPage();
        await startCoverage(page);
    }, TIMEOUT);

    afterAll(async () => {
        await stopCoverage(page, 'UsageByYear e2e');
        await page.close();
        await browser.close();
    }, TIMEOUT);

    beforeEach(async () => {
        await page.goto(HOME_URL + 'UsageByYear');
        await page.waitForSelector('#year-data-0');
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
            expect(tbodyElements[0]).toEqual('2013\t603.928\t35.773\t639.701\t1.753\t365');
            expect(tbodyElements[2]).toEqual('2011\t139.939\t10.745\t150.684\t0.413\t365');
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
            expect(tbodyElements[0]).toEqual('2011\t139.939\t10.745\t150.684\t0.413\t365');
            expect(tbodyElements[2]).toEqual('2013\t603.928\t35.773\t639.701\t1.753\t365');
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
            expect(tbodyElements[0]).toEqual('2013\t603.928\t35.773\t639.701\t1.753\t365');
            expect(tbodyElements[2]).toEqual('2011\t139.939\t10.745\t150.684\t0.413\t365');
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
            expect(tbodyElements[0]).toEqual('2011\t139.939\t10.745\t150.684\t0.413\t365');
            expect(tbodyElements[2]).toEqual('2013\t603.928\t35.773\t639.701\t1.753\t365');
        },
        TIMEOUT
    );
});
