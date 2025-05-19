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

const HOME_URL = 'http://localhost:3000/bwmon/#/';

const getTBodyRowTexts = async (page) => {
    const locator = page.locator('tbody tr');
    return await locator.evaluateAll((elements) => elements.map((e) => e.innerText));
};

const getTHeadRowTexts = async (page) => {
    const locator = page.locator('thead tr');
    return await locator.evaluateAll((elements) => elements.map((e) => e.innerText));
};

export { HOME_URL, getTBodyRowTexts, getTHeadRowTexts };
