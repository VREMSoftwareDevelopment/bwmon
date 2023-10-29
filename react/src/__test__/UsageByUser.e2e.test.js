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

describe('UsageByUser e2e', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await launch();
        page = await browser.newPage();
        await startCoverage(page);
    }, TIMEOUT);

    afterAll(async () => {
        await stopCoverage(page, 'UsageByUser e2e');
        await page.close();
        await browser.close();
    }, TIMEOUT);

    beforeEach(async () => {
        await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
        await page.goto(HOME_URL + 'UsageByUser');
        await page.waitForSelector('#user-data-0');
        await page.waitForSelector('#user-footer');
    }, TIMEOUT);

    test(
        'should have footer',
        async () => {
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals\t\t\t83.066\t4.263\t87.329\t\t2.911\t30\t\t');
        },
        TIMEOUT
    );

    test(
        'should have table',
        async () => {
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(12);
        },
        TIMEOUT
    );

    test(
        'should sort by IP ascending',
        async () => {
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toContain(
                '192.168.1.10\t00:1C:25:27:9B:AE\tCOMPUTER-3\t15.004\t0.973\t15.978\t18.3%\t0.533\t30'
            );
            expect(tbodyElements[11]).toContain(
                '192.168.1.24\t00:27:10:0E:B5:60\tCOMPUTER-4\t19.689\t1.621\t21.310\t24.4%\t0.710\t30'
            );
        },
        TIMEOUT
    );

    test(
        'should sort by IP descending',
        async () => {
            const selector = '#user-IP > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toContain(
                '192.168.2.146\t0C:EE:E6:80:C8:8C\tCOMPUTER-27\t0.573\t0.025\t0.597\t0.7%\t0.020\t30'
            );
            expect(tbodyElements[11]).toContain(
                '192.168.1.28\t94:EB:CD:3D:82:CD\tCOMPUTER-14\t0.000\t0.000\t0.000\t0.0%\t0.000\t30'
            );
        },
        TIMEOUT
    );

    test(
        'should sort by MAC',
        async () => {
            const selector = '#user-MAC > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toContain(
                '192.168.1.28\t94:EB:CD:3D:82:CD\tCOMPUTER-14\t0.000\t0.000\t0.000\t0.0%\t0.000\t30'
            );
            expect(tbodyElements[11]).toContain(
                '192.168.2.146\t0C:EE:E6:80:C8:8C\tCOMPUTER-27\t0.573\t0.025\t0.597\t0.7%\t0.020\t30'
            );
        },
        TIMEOUT
    );

    test(
        'should sort by user',
        async () => {
            const selector = '#user-user > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toContain(
                '192.168.1.15\t00:1A:A0:C7:19:08\tCOMPUTER-9\t27.175\t0.565\t27.740\t31.8%\t0.925\t30'
            );
            expect(tbodyElements[11]).toContain(
                '192.168.1.110\t00:1A:A0:C7:19:08\tCOMPUTER-23\t0.000\t0.000\t0.000\t0.0%\t0.000\t30'
            );
        },
        TIMEOUT
    );

    test(
        'should sort by total',
        async () => {
            const selector = '#user-total > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toContain(
                '192.168.1.15\t00:1A:A0:C7:19:08\tCOMPUTER-9\t27.175\t0.565\t27.740\t31.8%\t0.925\t30'
            );
            expect(tbodyElements[11]).toContain(
                '192.168.2.146\t0C:EE:E6:80:C8:8C\tCOMPUTER-27\t0.573\t0.025\t0.597\t0.7%\t0.020\t30'
            );
        },
        TIMEOUT
    );

    test.skip(
        'should show different information when changing year',
        async () => {
            const selector = '#user-year';
            await page.waitForSelector(selector);
            await materialSelect(page, '2011', selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(7);
            expect(tbodyElements[0]).toContain(
                '192.168.1.10\t00:1C:25:27:9B:AE\tCOMPUTER-3\t12.806\t1.016\t13.822\t57.9%\t0.446\t31'
            );
            expect(tbodyElements[6]).toContain(
                '192.168.1.25\t70:D4:F2:DA:FA:C9\tCOMPUTER-15\t0.863\t0.018\t0.881\t3.7%\t0.088\t10'
            );
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals\t\t\t21.926\t1.937\t23.863\t\t0.770\t31\t\t');
        },
        TIMEOUT
    );

    test.skip(
        'should show different information when changing month',
        async () => {
            const selector = '#user-month';
            await page.waitForSelector(selector);
            await materialSelect(page, 'August', selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(9);
            expect(tbodyElements[0]).toContain(
                '192.168.1.10\t00:1C:25:27:9B:AE\tCOMPUTER-3\t10.481\t0.204\t10.685\t29.1%\t0.356\t30'
            );
            expect(tbodyElements[8]).toContain(
                '192.168.1.27\t10:D5:42:88:3F:A0\tCOMPUTER-16\t0.853\t0.066\t0.919\t2.5%\t0.033\t28'
            );
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals\t\t\t34.516\t2.147\t36.664\t\t1.183\t31\t\t');
        },
        TIMEOUT
    );

    test(
        'should show different information when rows per page',
        async () => {
            const selector = '#select-rows-per-page-id';
            await page.waitForSelector(selector);
            await page.select(selector, '24');
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(24);
            expect(tbodyElements[0]).toContain(
                '192.168.1.10\t00:1C:25:27:9B:AE\tCOMPUTER-3\t15.004\t0.973\t15.978\t18.3%\t0.533\t30'
            );
            expect(tbodyElements[23]).toContain(
                '192.168.2.101\t50:CC:F8:71:90:AB\tCOMPUTER-28\t0.295\t0.030\t0.325\t0.4%\t0.011\t30'
            );
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals\t\t\t83.066\t4.263\t87.329\t\t2.911\t30\t\t');
        },
        TIMEOUT
    );

    test(
        'should show different information when changing IP/MAC/User',
        async () => {
            const selector = '#user-filter';
            await page.waitForSelector(selector);
            await page.focus(selector);
            await page.keyboard.type('11');
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(5);
            expect(tbodyElements[0]).toContain(
                '192.168.1.11\t70:5A:B6:F3:58:AB\tCOMPUTER-12\t0.120\t0.003\t0.123\t47.4%\t0.004\t30'
            );
            expect(tbodyElements[4]).toContain(
                '192.168.1.115\t00:1A:A0:C7:27:D5\tCOMPUTER-19\t0.077\t0.001\t0.078\t30.0%\t0.003\t30'
            );
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals\t\t\t0.253\t0.006\t0.259\t\t0.009\t30\t\t');
        },
        TIMEOUT
    );
});
