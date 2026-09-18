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

/**
 * Custom React hooks for managing sorting state.
 */
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type SortState = {
    ascending: boolean;
    setAscending: Dispatch<SetStateAction<boolean>>;
    orderBy: string;
    setOrderBy: Dispatch<SetStateAction<string>>;
};

const useSortAsc = (orderByDefault: string): SortState => useSort(orderByDefault, true);

const useSortDesc = (orderByDefault: string): SortState => useSort(orderByDefault, false);

const useSort = (orderByDefault: string, ascendingDefault: boolean): SortState => {
    const [ascending, setAscending] = useState(ascendingDefault);
    const [orderBy, setOrderBy] = useState(orderByDefault);

    return { ascending, setAscending, orderBy, setOrderBy };
};

export { useSortDesc, useSortAsc };
