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

import puppeteer from 'puppeteer';

global.XMLHttpRequest = undefined;

export const HOME_URL = 'http://localhost:3000/bwmon/';
export const TIMEOUT = 30000;

export const delay = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

export const materialSelect = async (page, newSelectedValue, cssSelector) => {
    await page.evaluate(
        (newSelectedValue, cssSelector) => {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            var selectNode = document.querySelector(cssSelector);
            selectNode.dispatchEvent(clickEvent);
            [...document.querySelectorAll('li')].filter((el) => el.innerText === newSelectedValue)[0].click();
        },
        newSelectedValue,
        cssSelector
    );
};

export const launch = () =>
    puppeteer.launch({
        headless: true,
    });

/*
export const launch = () =>
    puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'],
        slowMo: 250,
    });
*/
