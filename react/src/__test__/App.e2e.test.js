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

import { HOME_URL, TIMEOUT, launch, startCoverage, stopCoverage } from './e2e-config';

describe('App e2e', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await launch();
        page = await browser.newPage();
        await startCoverage(page);
        await page.goto(HOME_URL);
    }, TIMEOUT);

    afterAll(async () => {
        await stopCoverage(page, 'App e2e');
        await page.close();
        await browser.close();
    }, TIMEOUT);

    test(
        'header element',
        async () => {
            await page.waitForSelector('#app-title');
            const title = await page.$eval('#app-title', (e) => e.innerHTML);
            expect(title).toBe('Bandwidth Monitor');
        },
        TIMEOUT
    );
});
