/*
 *      Copyright (C) 2010 - 2023 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { fromIPv4, timeToDate, toIPv4, toMonth, toPercent, usageInGBytes } from './ConversionUtils';

describe('ConversionUtils', () => {
    describe('toMonth', () => {
        it('should return december month as full name', () => {
            const expected = 'December';
            const actual = toMonth(12);
            expect(actual).toEqual(expected);
        });

        it('should return january month as full name', () => {
            const expected = 'January';
            const actual = toMonth(1);
            expect(actual).toEqual(expected);
        });
    });

    describe('timeToDate', () => {
        it('should return month as full name', () => {
            const date = DateTime.local(2011, 6, 15, 8, 30, 25);
            const expected = 'Jun 15, 2011 08:30';
            const actual = timeToDate(date.toSeconds());
            expect(actual).toEqual(expected);
        });
    });

    describe('usageInGBytes', () => {
        it('should return value in GBytes', () => {
            const expected = 123.457;
            const actual = Number(usageInGBytes(123456789));
            expect(actual).toEqual(expected);
        });
    });

    describe('toPercent', () => {
        it('should return value with one decimal', () => {
            const expected = '123.5%';
            const actual = toPercent(123.456);
            expect(actual).toEqual(expected);
        });
    });

    describe('toIPv4', () => {
        it('should return IPv4 coverted from number', () => {
            const expected = '12.255.0.6';
            const actual = toIPv4(218038278);
            expect(actual).toEqual(expected);
        });
    });

    describe('fromIPv4', () => {
        it('should return number coverted from IPv4', () => {
            const expected = 218038278;
            const actual = fromIPv4('12.255.0.6');
            expect(actual).toEqual(expected);
        });
    });
});
