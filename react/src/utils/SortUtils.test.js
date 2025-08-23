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
    describe('isAscending', () => {
        it('should return true if orderBy matches property and ascending is false', () => {
            expect(isAscending('name', 'name', false)).toBe(true);
        });
        it('should return false if orderBy does not match property', () => {
            expect(isAscending('name', 'age', true)).toBe(false);
        });
        it('should return false if orderBy does not match property and ascending is false', () => {
            expect(isAscending('name', 'age', false)).toBe(false);
        });
        it('should return false if orderBy matches property and ascending is true', () => {
            expect(isAscending('name', 'name', true)).toBe(false);
        });
    });

    describe('comparator', () => {
        const data = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Charlie', age: 35 },
            { name: 'Eve', age: undefined },
            { name: 'Mallory' },
        ];
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
    });

    describe('sort', () => {
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

    it('isAscending', () => {
        expect(isAscending('value1', 'value1', true)).toBeFalsy();
        expect(isAscending('value1', 'value1', false)).toBeTruthy();
        expect(isAscending('value1', 'value2', true)).toBeFalsy();
        expect(isAscending('value1', 'value2', false)).toBeFalsy();
    });
});
