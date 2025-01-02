/*
 *      Copyright (C) 2010 - 2025 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import { test, expect } from '@playwright/test';
import { HOME_URL } from './e2e-config';

test.describe('UsageByYear e2e', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOME_URL + 'UsageByYear');
        await page.waitForLoadState('networkidle');
        expect(page.locator('#year-id')).toBeVisible();
        expect(page.locator('#year-data-0')).toBeVisible();
    });

    test('should have table', async ({ page }) => {
        const locator = page.locator('tbody > tr');
        const innerTexts = await locator.evaluateAll((elements) => elements.map((element) => element.innerText));
        expect(innerTexts.length).toEqual(3);
    });

    test('should sort by year descending', async ({ page }) => {
        const locator = page.locator('tbody > tr');
        const innerTexts = await locator.evaluateAll((elements) => elements.map((element) => element.innerText));
        expect(innerTexts[0]).toEqual('2013\t603.928\t35.773\t639.701\t1.753\t365');
        expect(innerTexts[2]).toEqual('2011\t139.939\t10.745\t150.684\t0.413\t365');
    });

    test('should sort by year ascending', async ({ page }) => {
        await page.locator('#year-id > span').click();
        const locator = page.locator('tbody > tr');
        const innerTexts = await locator.evaluateAll((elements) => elements.map((element) => element.innerText));
        expect(innerTexts[0]).toEqual('2011\t139.939\t10.745\t150.684\t0.413\t365');
        expect(innerTexts[2]).toEqual('2013\t603.928\t35.773\t639.701\t1.753\t365');
    });
});
