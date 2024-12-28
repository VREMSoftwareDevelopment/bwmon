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

const isAscending = (orderBy, property, ascending) => (orderBy === property ? !ascending : false);

const comparator = (isAscending, orderBy) => {
    const ascending = (a, b, orderBy) => {
        if (a[orderBy] < b[orderBy]) return -1;
        if (a[orderBy] > b[orderBy]) return 1;
        return 0;
    };
    const descending = (a, b, orderBy) => {
        if (a[orderBy] > b[orderBy]) return -1;
        if (a[orderBy] < b[orderBy]) return 1;
        return 0;
    };
    return isAscending ? (a, b) => ascending(a, b, orderBy) : (a, b) => descending(a, b, orderBy);
};

const sort = (values, comparator) => [...values].sort(comparator);

export { comparator, isAscending, sort };
