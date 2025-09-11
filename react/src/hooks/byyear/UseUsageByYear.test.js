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

import { renderHook, waitFor } from '@testing-library/react';
import API from '@services/API';
import useUsageByYear from './UseUsageByYear';

jest.mock('@services/Usage');

describe('UseUsageByYear', () => {
    it('should initialize', async () => {
        const expectedCount = 3;
        const expectedFirst = {
            average: 1752605.622,
            days: 365,
            download: 603928097,
            id: 2013,
            total: 639701052,
            upload: 35772955,
        };
        const expectedLast = {
            average: 412831.811,
            days: 365,
            download: 139938627,
            id: 2011,
            total: 150683611,
            upload: 10744984,
        };
        const { result } = renderHook(useUsageByYear);
        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data.length).toEqual(expectedCount);
        expect(result.current.data[0]).toEqual(expectedFirst);
        expect(result.current.data[expectedCount - 1]).toEqual(expectedLast);
    });

    it('should handle API returning empty array', async () => {
        jest.spyOn(API, 'getUsageByYear').mockResolvedValueOnce([]);
        const { result } = renderHook(useUsageByYear);
        await waitFor(() => {
            expect(result.current.data).toEqual([]);
            expect(result.current.loading).toBeFalsy();
        });
    });

    it('should handle API returning null', async () => {
        jest.spyOn(API, 'getUsageByYear').mockResolvedValueOnce(null);
        const { result } = renderHook(useUsageByYear);
        await waitFor(() => {
            expect(result.current.data).toBeNull();
            expect(result.current.loading).toBeFalsy();
        });
    });
});
