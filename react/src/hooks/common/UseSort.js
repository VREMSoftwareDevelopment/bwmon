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

/**
 * Custom React hooks for managing sorting state.
 * @param {string} orderByDefault - Default sort key.
 * @param {boolean} ascendingDefault - Default sort direction.
 * @returns {{ ascending, setAscending, orderBy, setOrderBy }}
 */
import { useState } from 'react';

const useSortAsc = (orderByDefault) => useSort(orderByDefault, true);

const useSortDesc = (orderByDefault) => useSort(orderByDefault, false);

const useSort = (orderByDefault, ascendingDefault) => {
    const [ascending, setAscending] = useState(ascendingDefault);
    const [orderBy, setOrderBy] = useState(orderByDefault);

    return { ascending, setAscending, orderBy, setOrderBy };
};

export { useSortDesc, useSortAsc };
