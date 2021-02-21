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
        await page.goto(HOME_URL + 'UsageByMonth');
        await page.waitForSelector('#month-data-0');
        await page.waitForSelector('#month-footer');
    }, TIMEOUT);

    test(
        'should have footer',
        async () => {
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals	603.928	35.773	639.701		1.753	365');
        },
        TIMEOUT
    );

    test(
        'should have table',
        async () => {
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(11);
        },
        TIMEOUT
    );

    test(
        'should sort by month descending',
        async () => {
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toEqual('November	83.066	4.263	87.329	13.7%	2.911	30');
            expect(tbodyElements[10]).toEqual('January	64.043	4.105	68.149	10.7%	2.198	31');
        },
        TIMEOUT
    );

    test(
        'should sort by month ascending',
        async () => {
            const selector = '#month-id > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toEqual('January	64.043	4.105	68.149	10.7%	2.198	31');
            expect(tbodyElements[10]).toEqual('November	83.066	4.263	87.329	13.7%	2.911	30');
        },
        TIMEOUT
    );

    test(
        'should sort by year descending',
        async () => {
            const selector = '#month-total > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toEqual('November	83.066	4.263	87.329	13.7%	2.911	30');
            expect(tbodyElements[10]).toEqual('August	34.516	2.147	36.664	5.7%	1.183	31');
        },
        TIMEOUT
    );

    test(
        'should sort by year ascending',
        async () => {
            const selector = '#month-total > span';
            await page.waitForSelector(selector);
            await page.click(selector);
            await page.click(selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements[0]).toEqual('August	34.516	2.147	36.664	5.7%	1.183	31');
            expect(tbodyElements[10]).toEqual('November	83.066	4.263	87.329	13.7%	2.911	30');
        },
        TIMEOUT
    );

    test(
        'should show different information when changing year',
        async () => {
            const selector = '#month-year';
            await page.waitForSelector(selector);
            await materialSelect(page, '2011', selector);
            const tbodyElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('tbody > tr'), (element) => element.innerText)
            );
            expect(tbodyElements.length).toEqual(7);
            expect(tbodyElements[0]).toEqual('December	21.926	1.937	23.863	15.8%	0.770	31');
            expect(tbodyElements[6]).toEqual('June	26.949	2.086	29.035	19.3%	0.968	30');
            const theadElements = await page.evaluate(() =>
                Array.from(document.querySelectorAll('thead > tr'), (element) => element.innerText)
            );
            expect(theadElements.length).toEqual(3);
            expect(theadElements[2]).toEqual('Totals	139.939	10.745	150.684		0.413	365');
        },
        TIMEOUT
    );
});
