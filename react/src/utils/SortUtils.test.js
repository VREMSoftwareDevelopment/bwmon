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

import { comparator, sort } from './SortUtils';

describe('SortUtils', () => {
    describe('comparator', () => {
        it('ascending 1', () => {
            const a = { value: 20 };
            const b = { value: 10 };
            const fn = comparator(true, 'value');
            expect(fn(a, b)).toEqual(1);
        });

        it('ascending -1', () => {
            const a = { value: 10 };
            const b = { value: 20 };
            const fn = comparator(true, 'value');
            expect(fn(a, b)).toEqual(-1);
        });

        it('ascending 0', () => {
            const a = { value: 10 };
            const b = { value: 10 };
            const fn = comparator(true, 'value');
            expect(fn(a, b)).toEqual(0);
        });

        it('descending 1', () => {
            const a = { value: 10 };
            const b = { value: 20 };
            const fn = comparator(false, 'value');
            expect(fn(a, b)).toEqual(1);
        });

        it('descending -1', () => {
            const a = { value: 20 };
            const b = { value: 10 };
            const fn = comparator(false, 'value');
            expect(fn(a, b)).toEqual(-1);
        });

        it('descending 0', () => {
            const a = { value: 10 };
            const b = { value: 10 };
            const fn = comparator(false, 'value');
            expect(fn(a, b)).toEqual(0);
        });
    });

    describe('sort', () => {
        it('ascending', () => {
            const values = [{ value: 20 }, { value: 10 }, { value: 30 }, { value: 20 }];
            const fn = comparator(true, 'value');
            const expected = [{ value: 10 }, { value: 20 }, { value: 20 }, { value: 30 }];

            const result = sort(values, fn);

            expect(result).toEqual(expected);
            expect(values !== result).toBeTruthy();
        });

        it('descending', () => {
            const values = [{ value: 20 }, { value: 10 }, { value: 30 }];
            const fn = comparator(false, 'value');
            const expected = [{ value: 30 }, { value: 20 }, { value: 10 }];

            const result = sort(values, fn);

            expect(result).toEqual(expected);
            expect(values !== result).toBeTruthy();
        });
    });
});
