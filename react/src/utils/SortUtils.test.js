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

import { comparator, isAscending, sort } from './SortUtils';

describe('SortUtils', () => {
    describe('comparator', () => {
        const data = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Charlie', age: 35 },
            { name: 'Eve', age: undefined },
            { name: 'Mallory' },
        ];

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

        it('should sort ascending by age', () => {
            const cmp = comparator(true, 'age');
            const sorted = [...data].sort(cmp);
            expect(sorted.map((x) => x.name)).toEqual(['Bob', 'Alice', 'Charlie', 'Eve', 'Mallory']);
        });

        it('should sort descending by age', () => {
            const cmp = comparator(false, 'age');
            const sorted = [...data].sort(cmp);
            expect(sorted.map((x) => x.name)).toEqual(['Charlie', 'Alice', 'Bob', 'Eve', 'Mallory']);
        });

        it('should return 0 for unsafe key', () => {
            const cmp = comparator(true, 'invalid');
            expect(cmp(data[0], data[1])).toBe(0);
        });

        it('should handle non-string keys safely', () => {
            const cmp = comparator(true, 123);
            expect(cmp(data[0], data[1])).toBe(0);
        });

        it('should handle keys with special characters as unsafe', () => {
            const cmp = comparator(true, 'na-me');
            expect(cmp(data[0], data[1])).toBe(0);
        });
        it('should return 0 if orderBy key is missing in a', () => {
            const a = { foo: 1 };
            const b = { value: 2 };
            const fn = comparator(true, 'value');
            expect(fn(a, b)).toEqual(0);
        });

        it('should return 0 if orderBy key is missing in b', () => {
            const a = { value: 1 };
            const b = { foo: 2 };
            const fn = comparator(true, 'value');
            expect(fn(a, b)).toEqual(0);
        });

        it('should return 0 for empty string key', () => {
            const a = { value: 1 };
            const b = { value: 2 };
            const fn = comparator(true, '');
            expect(fn(a, b)).toBe(0);
        });

        it('should return 0 for key with special characters', () => {
            const a = { value: 1 };
            const b = { value: 2 };
            const fn = comparator(true, '$invalid!');
            expect(fn(a, b)).toBe(0);
        });

        it('should return 0 for symbol key', () => {
            const a = { value: 1 };
            const b = { value: 2 };
            const fn = comparator(true, Symbol('value'));
            expect(fn(a, b)).toBe(0);
        });

        it('should return 0 if both objects missing key', () => {
            const a = { foo: 1 };
            const b = { bar: 2 };
            const fn = comparator(true, 'value');
            expect(fn(a, b)).toBe(0);
        });

        it('should handle null values for orderBy', () => {
            const a = { value: null };
            const b = { value: 2 };
            const fn = comparator(true, 'value');
            expect(fn(a, b)).toBe(-1);
        });

        it('should handle both values null for orderBy', () => {
            const a = { value: null };
            const b = { value: null };
            const fn = comparator(true, 'value');
            expect(fn(a, b)).toBe(0);
        });

        it('should handle non-object arguments', () => {
            const fn = comparator(true, 'value');
            expect(fn(42, { value: 1 })).toBe(0);
            expect(fn({ value: 1 }, 42)).toBe(0);
        });

        it('should preserve order if comparator always returns 0', () => {
            const arr = [{ value: 3 }, { value: 1 }, { value: 2 }];
            const cmp = () => 0;
            const sorted = sort(arr, cmp);
            expect(sorted).toEqual(arr);
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

        it('should sort using comparator', () => {
            const arr = [{ value: 3 }, { value: 1 }, { value: 2 }];
            const cmp = comparator(true, 'value');
            const sorted = sort(arr, cmp);
            expect(sorted.map((x) => x.value)).toEqual([1, 2, 3]);
        });

        it('should not mutate original array', () => {
            const arr = [{ value: 2 }, { value: 1 }];
            const cmp = comparator(true, 'value');
            const sorted = sort(arr, cmp);
            expect(arr).toEqual([{ value: 2 }, { value: 1 }]);
            expect(sorted).not.toBe(arr);
        });

        it('should handle empty array', () => {
            const cmp = comparator(true, 'value');
            expect(sort([], cmp)).toEqual([]);
        });
    });

    describe('isAscending', () => {
        it('should return true if orderBy matches property and ascending is false', () => {
            expect(isAscending('name', 'name', false)).toBeTruthy();
        });

        it('should return false if orderBy does not match property', () => {
            expect(isAscending('name', 'age', true)).toBeFalsy();
        });

        it('should return false if orderBy does not match property and ascending is false', () => {
            expect(isAscending('name', 'age', false)).toBeFalsy();
        });

        it('should return false if orderBy matches property and ascending is true', () => {
            expect(isAscending('name', 'name', true)).toBeFalsy();
        });

        it('should test isAscending for all input combinations', () => {
            expect(isAscending('foo', 'foo', true)).toBeFalsy();
            expect(isAscending('foo', 'foo', false)).toBeTruthy();
            expect(isAscending('foo', 'bar', true)).toBeFalsy();
            expect(isAscending('foo', 'bar', false)).toBeFalsy();
        });
    });
});
