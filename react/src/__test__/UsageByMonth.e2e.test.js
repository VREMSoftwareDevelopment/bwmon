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

import { HOME_URL, TIMEOUT, launch, materialSelect, startCoverage, stopCoverage } from './e2e-config';

describe('UsageByMonth e2e', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await launch();
        page = await browser.newPage();
        await startCoverage(page);
    }, TIMEOUT);

    afterAll(async () => {
        await stopCoverage(page, 'UsageByMonth e2e');
        await page.close();
        await browser.close();
    }, TIMEOUT);

    beforeEach(async () => {
        await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
        await page.goto(HOME_URL + 'UsageByMonth');
        await page.waitForSelector('#month-data-0');
        await page.waitForSelector('#month-footer');
    }, TIMEOUT);

    test(
        'should have footer',
        async () => {
            const innerTexts = await page.$$eval('thead > tr', (elements) => elements.map((element) => element.innerText));
            expect(innerTexts.length).toEqual(3);
            expect(innerTexts[2]).toEqual('Totals\t603.928\t35.773\t639.701\t\t1.753\t365');
        },
        TIMEOUT
    );

    test(
        'should have table',
        async () => {
            const innerTexts = await page.$$eval('tbody > tr', (elements) => elements.map((element) => element.innerText));
            expect(innerTexts.length).toEqual(11);
        },
        TIMEOUT
    );

    test(
        'should sort by month descending',
        async () => {
            const innerTexts = await page.$$eval('tbody > tr', (elements) => elements.map((element) => element.innerText));
            expect(innerTexts[0]).toEqual('November\t83.066\t4.263\t87.329\t13.7%\t2.911\t30');
            expect(innerTexts[10]).toEqual('January\t64.043\t4.105\t68.149\t10.7%\t2.198\t31');
        },
        TIMEOUT
    );

    test(
        'should sort by month ascending',
        async () => {
            const selector = '#month-id > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const innerTexts = await page.$$eval('tbody > tr', (elements) => elements.map((element) => element.innerText));
            expect(innerTexts[0]).toEqual('January\t64.043\t4.105\t68.149\t10.7%\t2.198\t31');
            expect(innerTexts[10]).toEqual('November\t83.066\t4.263\t87.329\t13.7%\t2.911\t30');
        },
        TIMEOUT
    );

    test(
        'should show different information when changing year',
        async () => {
            const selector = '#month-year';
            await materialSelect(page, '2011', selector);
            const innerTexts = await page.$$eval('tbody > tr', (elements) => elements.map((element) => element.innerText));
            expect(innerTexts.length).toEqual(7);
            expect(innerTexts[0]).toEqual('December\t21.926\t1.937\t23.863\t15.8%\t0.770\t31');
            expect(innerTexts[6]).toEqual('June\t26.949\t2.086\t29.035\t19.3%\t0.968\t30');
            const footerInnerTexts = await page.$$eval('thead > tr', (elements) => elements.map((element) => element.innerText));
            expect(footerInnerTexts.length).toEqual(3);
            expect(footerInnerTexts[2]).toEqual('Totals\t139.939\t10.745\t150.684\t\t0.413\t365');
        },
        TIMEOUT
    );
});
