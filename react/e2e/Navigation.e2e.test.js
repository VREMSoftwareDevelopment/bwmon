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

test.describe('Navigation e2e', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOME_URL);
        await page.waitForLoadState('networkidle');
    });

    test('Usage by Year', async ({ page }) => {
        await page.locator('#usage-by-year').click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(HOME_URL + 'UsageByYear');
    });

    test('Usage by Year Graph', async ({ page }) => {
        await page.locator('#usage-by-year-graph').click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(HOME_URL + 'UsageByYearGraph');
    });

    test('Usage by Month', async ({ page }) => {
        await page.locator('#usage-by-month').click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(HOME_URL + 'UsageByMonth');
    });

    test('Usage by Month Graph', async ({ page }) => {
        await page.locator('#usage-by-month-graph').click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(HOME_URL + 'UsageByMonthGraph');
    });

    test('Usage by User', async ({ page }) => {
        await page.locator('#usage-by-user').click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(HOME_URL + 'UsageByUser');
    });

    test('Usage by User Graph', async ({ page }) => {
        await page.locator('#usage-by-user-graph').click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(HOME_URL + 'UsageByUserGraph');
    });
});
