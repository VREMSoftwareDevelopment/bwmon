/*
 *      Copyright (C) 2010 - 2024 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import PCR from 'puppeteer-chromium-resolver';

global.XMLHttpRequest = undefined;

export const HOME_URL = 'http://localhost:3000/bwmon#/';
export const TIMEOUT = 30000;

export const delay = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

export const materialSelect = async (page, value, selector) => {
    await page.waitForSelector(selector);
    await page.$eval(selector, (element) => {
        const event = new MouseEvent('mousedown');
        event.initEvent('mousedown', true, true);
        element.dispatchEvent(event);
    });
    const valueSelector = `li[data-value="${value}"]`;
    await page.waitForSelector(valueSelector);
    await page.$eval(valueSelector, (element) => element.click());
};

export const startCoverage = async (page) => {
    await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);
};

export const stopCoverage = async (page, tag) => {
    const calculateBytes = (coverage) => {
        const bytes = coverage
            .map(({ ranges, text }) => {
                let usedBytes = 0;
                ranges.forEach((range) => (usedBytes += range.end - range.start - 1));
                return {
                    usedBytes,
                    totalBytes: text.length,
                };
            })
            .reduce(
                (a, b) => {
                    return {
                        usedBytes: a.usedBytes + b.usedBytes,
                        totalBytes: a.totalBytes + b.totalBytes,
                    };
                },
                {
                    usedBytes: 0,
                    totalBytes: 0,
                }
            );
        return bytes.usedBytes / bytes.totalBytes;
    };
    const [jsCoverage, cssCoverage] = await Promise.all([page.coverage.stopJSCoverage(), page.coverage.stopCSSCoverage()]);
    const coverage = (calculateBytes([...jsCoverage, ...cssCoverage]) * 100).toFixed(2);
    console.log(tag + ' coverage: ' + coverage + '%');
};

const launchFast = async () => {
    const stats = await PCR.getStats();
    return stats.puppeteer
        .launch({
            headless: 'new',
            args: ['--no-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions'],
            executablePath: stats.executablePath,
        })
        .catch(function (error) {
            console.log(error);
        });
};

const launchSlow = async () => {
    const stats = await PCR.getStats();
    return stats.puppeteer
        .launch({
            headless: false,
            slowMo: 500,
            devtools: true,
            args: ['--no-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions'],
            executablePath: stats.executablePath,
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const launch = launchFast;

export const debuggerOn = async (page) => {
    await page.evaluate(() => {
        debugger;
    });
};

export const consoleOn = (page) => {
    page.on('console', (msg) => console.log(msg.text()));
};
