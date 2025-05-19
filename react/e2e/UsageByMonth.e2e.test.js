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
import { getTBodyRowTexts, getTHeadRowTexts, HOME_URL } from './e2e-config';

test.describe('UsageByMonth e2e', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOME_URL + 'UsageByMonth');
        await page.waitForLoadState('networkidle');
        await expect(page.locator('#month-year')).toBeVisible();
        await expect(page.locator('#month-data-0')).toBeVisible();
        await expect(page.locator('#month-footer')).toBeVisible();
    });

    test('should have footer', async ({ page }) => {
        const innerTexts = await getTHeadRowTexts(page);
        expect(innerTexts.length).toEqual(3);
        expect(innerTexts[2]).toEqual('Totals\t603.928\t35.773\t639.701\t\t1.753\t365');
    });

    test('should have table', async ({ page }) => {
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts.length).toEqual(11);
    });

    test('should sort by month descending', async ({ page }) => {
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts[0]).toEqual('November\t83.066\t4.263\t87.329\t13.7%\t2.911\t30');
        expect(innerTexts[10]).toEqual('January\t64.043\t4.105\t68.149\t10.7%\t2.198\t31');
    });

    test('should sort by month ascending', async ({ page }) => {
        await page.locator('#month-id > span').click();
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts[0]).toEqual('January\t64.043\t4.105\t68.149\t10.7%\t2.198\t31');
        expect(innerTexts[10]).toEqual('November\t83.066\t4.263\t87.329\t13.7%\t2.911\t30');
    });

    test('should show different information when changing year', async ({ page }) => {
        await page.locator('#month-year').click();
        await page.locator('li[data-value="2011"]').click();

        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts.length).toEqual(7);
        expect(innerTexts[0]).toEqual('December\t21.926\t1.937\t23.863\t15.8%\t0.770\t31');
        expect(innerTexts[6]).toEqual('June\t26.949\t2.086\t29.035\t19.3%\t0.968\t30');

        const footerInnerTexts = await getTHeadRowTexts(page);
        expect(footerInnerTexts.length).toEqual(3);
        expect(footerInnerTexts[2]).toEqual('Totals\t139.939\t10.745\t150.684\t\t0.413\t365');
    });
});
