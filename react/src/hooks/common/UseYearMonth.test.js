/*
 *      Copyright (C) 2010 - 2023 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import { act, renderHook } from '@testing-library/react-hooks';
import useYearMonth from './UseYearMonth';

jest.mock('../../services/Usage');

describe('UseYearMonth', () => {
    const expectedYears = [2013, 2012, 2011];
    const expectedYearsCount = 3;

    it('should initialize years', async () => {
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();

        expect(result.current.years.length).toEqual(expectedYearsCount);
        expect(result.current.years).toEqual(expectedYears);
        expect(result.current.year).toEqual(expectedYears[0]);
    });

    it('should initialize months', async () => {
        const expectedCount = 11;
        const expectedFirst = 'November';
        const expectedLast = 'January';
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();

        expect(result.current.months.length).toEqual(expectedCount);
        expect(result.current.months[0]).toEqual(expectedFirst);
        expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.month).toEqual(expectedFirst);
    });

    it('changing year should change year', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.year).toEqual(expectedYear);
    });

    it('changing year should change months', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const expectedCount = 7;
        const expectedFirst = 'December';
        const expectedLast = 'June';
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.months.length).toEqual(expectedCount);
        expect(result.current.months[0]).toEqual(expectedFirst);
        expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.month).toEqual(expectedFirst);
    });

    it('changing month should change month', async () => {
        const expected = 'August';
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();
        act(() => result.current.setMonth(expected));

        expect(result.current.month).toEqual(expected);
    });
});
