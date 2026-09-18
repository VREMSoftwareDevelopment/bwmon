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
import {
    fromIPv4,
    timeToDate,
    toErrorMessage,
    toGBytes,
    toIPv4,
    toMonth,
    toPercent,
    toPercentage,
    usageInGBytes,
} from './ConversionUtils';

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

    describe('toGBytes', () => {
        it('should return value in GBytes without rounding', () => {
            const expected = 123.456789;
            const actual = toGBytes(123456789);
            expect(actual).toEqual(expected);
        });

        it('should return zero for zero', () => {
            const expected = 0;
            const actual = toGBytes(0);
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

    describe('toPercentage', () => {
        it('should return percentage rounded to one decimal', () => {
            const expected = 33.3;
            const actual = toPercentage(1, 3);
            expect(actual).toEqual(expected);
        });

        it('should round percentage up', () => {
            const expected = 66.7;
            const actual = toPercentage(2, 3);
            expect(actual).toEqual(expected);
        });

        it('should return one hundred when value equals total', () => {
            const expected = 100;
            const actual = toPercentage(25, 25);
            expect(actual).toEqual(expected);
        });

        it('should return zero when total is zero', () => {
            const expected = 0;
            const actual = toPercentage(0, 0);
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

    describe('toErrorMessage', () => {
        it('should return the message of an Error instance', () => {
            const expected = 'API Error';
            const actual = toErrorMessage(new Error(expected));
            expect(actual).toEqual(expected);
        });

        it('should return a string rejection unchanged', () => {
            const expected = 'not an error instance';
            const actual = toErrorMessage(expected);
            expect(actual).toEqual(expected);
        });

        it('should convert a number to a string', () => {
            const expected = '404';
            const actual = toErrorMessage(404);
            expect(actual).toEqual(expected);
        });

        it('should convert undefined to a string', () => {
            const expected = 'undefined';
            const actual = toErrorMessage(undefined);
            expect(actual).toEqual(expected);
        });
    });
});
