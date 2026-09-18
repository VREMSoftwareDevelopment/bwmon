/*
 *      Copyright (C) 2010 - 2026 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import { DateTime } from 'luxon';

export const timeToDate = (time: string | number): string => DateTime.fromSeconds(Number(time)).toFormat('MMM dd, yyyy HH:mm');
export const toMonth = (month: string | number): string => DateTime.local(2012, Number(month)).toFormat('MMMM');
export const usageInGBytes = (value: string | number): string => (Number(value) / 1000000).toFixed(3);
export const toPercent = (value: string | number): string => Number(value).toFixed(1) + '%';
export const toIPv4 = (value: string | number): string => {
    const v = Number(value);
    return (v >>> 24) + '.' + ((v >> 16) & 255) + '.' + ((v >> 8) & 255) + '.' + (v & 255);
};
export const fromIPv4 = (value: string): number =>
    value.split('.').reduce((value, octet) => (value << 8) + parseInt(octet, 10), 0) >>> 0;
