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

import { act, renderHook, waitFor } from '@testing-library/react';
import useYearMonth from './UseYearMonth';
import useYear from './UseYear';
import { API } from '@services';

vi.mock('@services/Usage');
vi.mock('./UseYear', { spy: true });

describe('UseYearMonth', () => {
    const expectedYears = [2013, 2012, 2011];

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const expectedYearsCount = 3;

    it('should initialize years', async () => {
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            expect(result.current.years?.length).toEqual(expectedYearsCount);
            expect(result.current.years).toEqual(expectedYears);
            expect(result.current.year).toEqual(expectedYears[0]);
        });
    });

    it('should initialize months', async () => {
        const expectedCount = 11;
        const expectedFirst = 'November';
        const expectedLast = 'January';
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            expect(result.current.months?.length).toEqual(expectedCount);
            expect(result.current.months?.[0]).toEqual(expectedFirst);
            expect(result.current.months?.[expectedCount - 1]).toEqual(expectedLast);
            expect(result.current.month).toEqual(expectedFirst);
        });
    });

    it('changing year should change year', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            act(() => result.current.setYear(expectedYear));
            expect(result.current.year).toEqual(expectedYear);
        });
    });

    it('changing year should change months', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const expectedCount = 7;
        const expectedFirst = 'December';
        const expectedLast = 'June';
        const { result } = renderHook(() => useYearMonth());

        await waitFor(() => {
            act(() => result.current.setYear(expectedYear));
            expect(result.current.months?.length).toEqual(expectedCount);
            expect(result.current.months?.[0]).toEqual(expectedFirst);
            expect(result.current.months?.[expectedCount - 1]).toEqual(expectedLast);
            expect(result.current.month).toEqual(expectedFirst);
        });
    });

    it('changing month should change month', async () => {
        const expected = 'August';
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            act(() => result.current.setMonth(expected));
            expect(result.current.month).toEqual(expected);
        });
    });

    it('should not update months or month if year is undefined', async () => {
        vi.mocked(useYear).mockReturnValueOnce({ years: [], year: undefined, setYear: vi.fn(), loading: false, error: null });
        const { result } = renderHook(() => useYearMonth());
        expect(result.current.months).toBeUndefined();
        expect(result.current.month).toBeUndefined();
    });

    it('should set error when API.getMonths fails', async () => {
        const errorMessage = 'API Error';
        vi.spyOn(API, 'getMonths').mockRejectedValueOnce(new Error(errorMessage));
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            expect(result.current.error).toEqual(errorMessage);
        });
    });

    it('should stop loading once years and months resolve', async () => {
        const { result } = renderHook(() => useYearMonth());
        expect(result.current.loading).toBeTruthy();
        await waitFor(() => {
            expect(result.current.month).toEqual('November');
            expect(result.current.loading).toBeFalsy();
        });
    });

    it('should stop loading when API.getMonths fails', async () => {
        const errorMessage = 'Months API Error';
        vi.spyOn(API, 'getMonths').mockRejectedValueOnce(new Error(errorMessage));
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            expect(result.current.error).toEqual(errorMessage);
            expect(result.current.loading).toBeFalsy();
        });
    });

    it('should stop loading when API.getYears returns empty array', async () => {
        const getMonths = vi.spyOn(API, 'getMonths');
        vi.spyOn(API, 'getYears').mockResolvedValueOnce([]);
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            expect(result.current.years).toEqual([]);
            expect(result.current.loading).toBeFalsy();
        });
        expect(result.current.year).toBeUndefined();
        expect(result.current.months).toBeUndefined();
        expect(getMonths).not.toHaveBeenCalled();
    });
});
