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

import { DateTime } from 'luxon';

export const timeToDate = (time) => DateTime.fromSeconds(Number(time)).toFormat('MMM dd, yyyy HH:mm');
export const toMonth = (month) => DateTime.local(2012, month).toFormat('MMMM');
export const usageInGBytes = (value) => (Number(value) / 1000000).toFixed(3);
export const toPercent = (value) => Number(value).toFixed(1) + '%';
export const toIPv4 = (value) => (value >>> 24) + '.' + ((value >> 16) & 255) + '.' + ((value >> 8) & 255) + '.' + (value & 255);
export const fromIPv4 = (value) => value.split('.').reduce((value, octet) => (value << 8) + parseInt(octet, 10), 0) >>> 0;
