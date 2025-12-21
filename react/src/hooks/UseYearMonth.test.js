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
import useYearMonth from './UseYearMonth';
import { API } from '@services';

jest.mock('@services/Usage');

describe('UseYearMonth', () => {
    const expectedYears = [2013, 2012, 2011];

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const expectedYearsCount = 3;

    it('should initialize years', async () => {
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            expect(result.current.years.length).toEqual(expectedYearsCount);
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
            expect(result.current.months.length).toEqual(expectedCount);
            expect(result.current.months[0]).toEqual(expectedFirst);
            expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
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
            expect(result.current.months.length).toEqual(expectedCount);
            expect(result.current.months[0]).toEqual(expectedFirst);
            expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
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
        // scan-suspicious-ignore-next-line
        const useYear = require('./UseYear');
        const originalDefault = useYear.default;
        useYear.default = jest.fn().mockReturnValue({ years: [], year: undefined, setYear: jest.fn() });
        const { result } = renderHook(() => useYearMonth());
        expect(result.current.months).toBeUndefined();
        expect(result.current.month).toBeUndefined();
        useYear.default = originalDefault;
    });

    it('should set error when API.getMonths fails', async () => {
        const errorMessage = 'API Error';
        jest.spyOn(API, 'getMonths').mockRejectedValueOnce(new Error(errorMessage));
        const { result } = renderHook(() => useYearMonth());
        await waitFor(() => {
            expect(result.current.error).toEqual(errorMessage);
        });
    });
});
