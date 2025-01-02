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

import { act, renderHook, waitFor } from '@testing-library/react';
import usePagination from './UsePagination';

describe('UsePagination', () => {
    it('should initialize', async () => {
        const { result } = renderHook(() => usePagination(10));
        await waitFor(() => {
            expect(result.current.page).toEqual(0);
            expect(result.current.rowsPerPage).toEqual(10);
        });
    });

    it('changing page should change page', async () => {
        const { result } = renderHook(() => usePagination(10));
        await waitFor(() => {
            act(() => result.current.setPage(2));
            expect(result.current.page).toEqual(2);
        });
    });

    it('changing rowsPerPage should change rowsPerPage', async () => {
        const { result } = renderHook(() => usePagination(10));
        await waitFor(() => {
            act(() => result.current.setRowsPerPage(20));
            expect(result.current.rowsPerPage).toEqual(20);
        });
    });
});
