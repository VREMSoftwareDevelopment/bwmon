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

type Comparable = string | number;

const isAscending = (orderBy: string, property: string, ascending: boolean): boolean => (orderBy === property ? !ascending : false);

const comparator = <T extends object>(isAscending: boolean, orderBy: string): ((a: T, b: T) => number) => {
    const isSafeKey = <K extends string>(key: K, obj: object): obj is Record<K, Comparable> =>
        typeof key === 'string' && /^[a-zA-Z0-9_$]+$/.test(key) && Object.prototype.hasOwnProperty.call(obj, key);

    const ascending = <K extends string>(a: object, b: object, orderBy: K): number => {
        if (!isSafeKey(orderBy, a) || !isSafeKey(orderBy, b)) return 0;
        if (a[orderBy] < b[orderBy]) return -1;
        if (a[orderBy] > b[orderBy]) return 1;
        return 0;
    };
    const descending = <K extends string>(a: object, b: object, orderBy: K): number => {
        if (!isSafeKey(orderBy, a) || !isSafeKey(orderBy, b)) return 0;
        if (a[orderBy] > b[orderBy]) return -1;
        if (a[orderBy] < b[orderBy]) return 1;
        return 0;
    };
    return isAscending ? (a, b) => ascending(a, b, orderBy) : (a, b) => descending(a, b, orderBy);
};

const sort = <T>(values: readonly T[], comparator: (a: T, b: T) => number): T[] => [...values].sort(comparator);

export { comparator, isAscending, sort };
