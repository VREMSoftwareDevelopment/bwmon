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
import { HOME_URL, getTBodyRowTexts, getTHeadRowTexts } from './e2e-config';

test.describe('UsageByUser e2e', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOME_URL + 'UsageByUser');
        await page.waitForLoadState('networkidle');
        await expect(page.locator('#user-year')).toBeVisible();
        await expect(page.locator('#user-month')).toBeVisible();
        await expect(page.locator('#user-filter')).toBeVisible();
        await expect(page.locator('#user-data-0')).toBeVisible();
        await expect(page.locator('#user-footer')).toBeVisible();
    });

    test('should have footer', async ({ page }) => {
        const innerTexts = await getTHeadRowTexts(page);
        expect(innerTexts.length).toEqual(3);
        expect(innerTexts[2]).toEqual('Totals\t\t\t83.066\t4.263\t87.329\t\t2.911\t30\t\t');
    });

    test('should have table', async ({ page }) => {
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts.length).toEqual(20);
        expect(innerTexts[0].length).toBeGreaterThan(0);
    });

    test('should sort by IP ascending', async ({ page }) => {
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts[0]).toContain('192.168.1.10\t00:1C:25:27:9B:AE\tCOMPUTER-3\t15.004\t0.973\t15.978\t18.3%\t0.533\t30');
        expect(innerTexts[19]).toContain('192.168.1.120\t00:26:6C:A8:EE:D6\tCOMPUTER-21\t0.089\t0.003\t0.092\t0.1%\t0.003\t30');
    });

    test('should sort by IP descending', async ({ page }) => {
        await page.locator('#user-IP > span').click();
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts[0]).toContain('192.168.2.146\t0C:EE:E6:80:C8:8C\tCOMPUTER-27\t0.573\t0.025\t0.597\t0.7%\t0.020\t30');
        expect(innerTexts[19]).toContain('192.168.1.20\t00:1A:E9:92:A5:5F\tCOMPUTER-8\t0.023\t0.000\t0.024\t0.0%\t0.001\t30');
    });

    test('should sort by MAC', async ({ page }) => {
        await page.locator('#user-MAC > span').click();
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts[0]).toContain('192.168.1.28\t94:EB:CD:3D:82:CD\tCOMPUTER-14\t0.000\t0.000\t0.000\t0.0%\t0.000\t30');
        expect(innerTexts[19]).toContain('192.168.1.20\t00:1A:E9:92:A5:5F\tCOMPUTER-8\t0.023\t0.000\t0.024\t0.0%\t0.001\t30');
    });

    test('should sort by user', async ({ page }) => {
        await page.locator('#user-user > span').click();
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts[0]).toContain('192.168.1.15\t00:1A:A0:C7:19:08\tCOMPUTER-9\t27.175\t0.565\t27.740\t31.8%\t0.925\t30');
        expect(innerTexts[19]).toContain('192.168.1.27\t10:D5:42:88:3F:A0\tCOMPUTER-16\t1.207\t0.067\t1.273\t1.5%\t0.042\t30');
    });

    test('should sort by total', async ({ page }) => {
        await page.locator('#user-total > span').click();
        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts[0]).toContain('192.168.1.15\t00:1A:A0:C7:19:08\tCOMPUTER-9\t27.175\t0.565\t27.740\t31.8%\t0.925\t30');
        expect(innerTexts[19]).toContain('192.168.1.115\t00:1A:A0:C7:27:D5\tCOMPUTER-19\t0.077\t0.001\t0.078\t0.1%\t0.003\t30');
    });

    test('should show different information when changing year', async ({ page }) => {
        await page.locator('#user-year').click();
        await page.locator('li[data-value="2011"]').click();

        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts.length).toEqual(7);
        expect(innerTexts[0]).toContain('192.168.1.10\t00:1C:25:27:9B:AE\tCOMPUTER-3\t12.806\t1.016\t13.822\t57.9%\t0.446\t31');
        expect(innerTexts[6]).toContain('192.168.1.25\t70:D4:F2:DA:FA:C9\tCOMPUTER-15\t0.863\t0.018\t0.881\t3.7%\t0.088\t10');

        const footerInnerTexts = await getTHeadRowTexts(page);
        expect(footerInnerTexts.length).toEqual(3);
        expect(footerInnerTexts[2]).toEqual('Totals\t\t\t21.926\t1.937\t23.863\t\t0.770\t31\t\t');
    });

    test('should show different information when changing month', async ({ page }) => {
        await page.locator('#user-month').click();
        await page.locator('li[data-value="August"]').click();

        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts.length).toEqual(9);
        expect(innerTexts[0]).toContain('192.168.1.10\t00:1C:25:27:9B:AE\tCOMPUTER-3\t10.481\t0.204\t10.685\t29.1%\t0.356\t30');
        expect(innerTexts[8]).toContain('192.168.1.27\t10:D5:42:88:3F:A0\tCOMPUTER-16\t0.853\t0.066\t0.919\t2.5%\t0.033\t28');

        const footerInnerTexts = await getTHeadRowTexts(page);
        expect(footerInnerTexts.length).toEqual(3);
        expect(footerInnerTexts[2]).toEqual('Totals\t\t\t34.516\t2.147\t36.664\t\t1.183\t31\t\t');
    });

    test('should show different information when rows per page', async ({ page }) => {
        await page.locator('#select-rows-per-page-id').selectOption('27');

        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts.length).toEqual(27);
        expect(innerTexts[0]).toContain('192.168.1.10\t00:1C:25:27:9B:AE\tCOMPUTER-3\t15.004\t0.973\t15.978\t18.3%\t0.533\t30');
        expect(innerTexts[26]).toContain('192.168.2.146\t0C:EE:E6:80:C8:8C\tCOMPUTER-27\t0.573\t0.025\t0.597\t0.7%\t0.020\t30');

        const footerInnerTexts = await getTHeadRowTexts(page);
        expect(footerInnerTexts.length).toEqual(3);
        expect(footerInnerTexts[2]).toEqual('Totals\t\t\t83.066\t4.263\t87.329\t\t2.911\t30\t\t');
    });

    test('should show different information when changing IP/MAC/User', async ({ page }) => {
        await page.locator('#user-filter').fill('11');
        await expect(page.locator('tbody tr')).toHaveCount(5);

        const innerTexts = await getTBodyRowTexts(page);
        expect(innerTexts.length).toEqual(5);
        expect(innerTexts[0]).toContain('192.168.1.11\t70:5A:B6:F3:58:AB\tCOMPUTER-12\t0.120\t0.003\t0.123\t47.4%\t0.004\t30');
        expect(innerTexts[4]).toContain('192.168.1.115\t00:1A:A0:C7:27:D5\tCOMPUTER-19\t0.077\t0.001\t0.078\t30.0%\t0.003\t30');

        const footerInnerTexts = await getTHeadRowTexts(page);
        expect(footerInnerTexts.length).toEqual(3);
        expect(footerInnerTexts[2]).toEqual('Totals\t\t\t0.253\t0.006\t0.259\t\t0.009\t30\t\t');
    });
});
