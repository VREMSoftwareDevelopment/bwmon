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
 * Bandwidth Usage Monitor
 */

import { act, renderHook } from '@testing-library/react-hooks';
import usePagination from './UsePagination';

describe('UsePagination', () => {
    test('should initialize', () => {
        const { result } = renderHook(() => usePagination(10));

        expect(result.current.page).toEqual(0);
        expect(result.current.rowsPerPage).toEqual(10);
    });

    test('changing page should change page', async () => {
        const { result } = renderHook(() => usePagination(10));

        act(() => result.current.setPage(2));

        expect(result.current.page).toEqual(2);
    });

    test('changing rowsPerPage should change rowsPerPage', async () => {
        const { result } = renderHook(() => usePagination(10));

        act(() => result.current.setRowsPerPage(20));

        expect(result.current.rowsPerPage).toEqual(20);
    });
});
