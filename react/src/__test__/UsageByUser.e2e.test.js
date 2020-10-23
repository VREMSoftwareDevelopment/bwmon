/*
 *      Copyright (C) 2010 - 2020 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
 * Bandwidth Usage Monitor
 */

import { HOME_URL, TIMEOUT, launch, materialSelect } from './e2e-config';

describe('UsageByUser e2e', () => {
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
        await page.goto(HOME_URL + 'UsageByUser');
        await page.waitForSelector('#user-data-0');
        await page.waitForSelector('#user-footer');
    }, TIMEOUT);

    afterEach(async () => {
        await page.close();
    }, TIMEOUT);

    test(
        'should have footer',
        async () => {
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals			83.066	4.263	87.329		2.911	30		');
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
            expect(tbodyElements[0]).toContain('192.168.1.10	00:1C:25:27:9B:AE	COMPUTER-3	15.004	0.973	15.978	18.3%	0.533	30');
            expect(tbodyElements[11]).toContain('192.168.1.148	00:1A:A0:C7:17:60	COMPUTER-18	0.083	0.005	0.088	0.1%	0.003	30');
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
            expect(tbodyElements[0]).toContain('192.168.2.146	0C:EE:E6:80:C8:8C	COMPUTER-27	0.573	0.025	0.597	0.7%	0.020	30');
            expect(tbodyElements[11]).toContain('192.168.1.21	40:6F:2A:54:D9:EB	COMPUTER-2	1.407	0.112	1.518	1.7%	0.051	30');
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
            expect(tbodyElements[0]).toContain('192.168.1.28	94:EB:CD:3D:82:CD	COMPUTER-14	0.000	0.000	0.000	0.0%	0.000	30');
            expect(tbodyElements[11]).toContain('192.168.2.146	0C:EE:E6:80:C8:8C	COMPUTER-27	0.573	0.025	0.597	0.7%	0.020	30');
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
            expect(tbodyElements[0]).toContain('192.168.1.15	00:1A:A0:C7:19:08	COMPUTER-9	27.175	0.565	27.740	31.8%	0.925	30');
            expect(tbodyElements[11]).toContain('192.168.1.110	00:1A:A0:C7:19:08	COMPUTER-23	0.000	0.000	0.000	0.0%	0.000	30');
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
            expect(tbodyElements[0]).toContain('192.168.1.15	00:1A:A0:C7:19:08	COMPUTER-9	27.175	0.565	27.740	31.8%	0.925	30');
            expect(tbodyElements[11]).toContain('192.168.2.146	0C:EE:E6:80:C8:8C	COMPUTER-27	0.573	0.025	0.597	0.7%	0.020	30');
        },
        TIMEOUT
    );

    test(
        'should show different information when changing year',
        async () => {
            const selector = '#user-year';
            await page.waitForSelector(selector);
            await materialSelect(page, '2011', selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(7);
            expect(tbodyElements[0]).toContain('192.168.1.10	00:1C:25:27:9B:AE	COMPUTER-3	12.806	1.016	13.822	57.9%	0.446	31');
            expect(tbodyElements[6]).toContain('192.168.1.25	70:D4:F2:DA:FA:C9	COMPUTER-15	0.863	0.018	0.881	3.7%	0.088	10');
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals			21.926	1.937	23.863		0.770	31		');
        },
        TIMEOUT
    );

    test(
        'should show different information when changing month',
        async () => {
            const selector = '#user-month';
            await page.waitForSelector(selector);
            await materialSelect(page, 'August', selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(9);
            expect(tbodyElements[0]).toContain('192.168.1.10	00:1C:25:27:9B:AE	COMPUTER-3	10.481	0.204	10.685	29.1%	0.356	30');
            expect(tbodyElements[8]).toContain('192.168.1.27	10:D5:42:88:3F:A0	COMPUTER-16	0.853	0.066	0.919	2.5%	0.033	28');
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals			34.516	2.147	36.664		1.183	31		');
        },
        TIMEOUT
    );

    test(
        'should show different information when changing IP/MAC/User',
        async () => {
            const selector = '#user-filter';
            await page.waitForSelector(selector);
            await page.focus(selector);
            await page.keyboard.type('3');
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(12);
            expect(tbodyElements[0]).toContain('192.168.1.10	00:1C:25:27:9B:AE	COMPUTER-3	15.004	0.973	15.978	48.3%	0.533	30');
            expect(tbodyElements[11]).toContain('192.168.2.142	50:A4:C8:32:B2:10	COMPUTER-26	0.001	0.000	0.001	0.0%	0.000	30');
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals			31.295	1.814	33.108		1.104	30		');
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
            expect(tbodyElements[0]).toContain('192.168.1.10	00:1C:25:27:9B:AE	COMPUTER-3	15.004	0.973	15.978	18.3%	0.533	30');
            expect(tbodyElements[23]).toContain('192.168.2.101	50:CC:F8:71:90:AB	COMPUTER-28	0.295	0.030	0.325	0.4%	0.011	30');
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals			83.066	4.263	87.329		2.911	30		');
        },
        TIMEOUT
    );
});
