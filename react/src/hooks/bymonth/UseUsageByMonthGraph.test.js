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
 * Bandwidth Monitor
 */

import { act, renderHook } from '@testing-library/react-hooks';
import useUsageByMonthGraph from './UseUsageByMonthGraph';

jest.mock('../../services/Usage');

describe('UseUsageByMonthGraph', () => {
    const expectedYears = [2013, 2012, 2011];
    const expectedYearsCount = 3;

    test('should initialize years', async () => {
        const { result, waitForNextUpdate } = renderHook(useUsageByMonthGraph);

        await waitForNextUpdate();

        expect(result.current.years.length).toEqual(expectedYearsCount);
        expect(result.current.years).toEqual(expectedYears);
        expect(result.current.year).toEqual(expectedYears[0]);
    });

    test('should initialize usage', async () => {
        const expectedOptions = {
            chart: {
                id: 'usage-by-month',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                ],
            },
        };
        const expectedSeries = [
            {
                name: 'Total Usage',
                data: [68, 57, 62, 58, 38, 84, 49, 37, 50, 49, 87],
            },
        ];

        const { result, waitForNextUpdate } = renderHook(useUsageByMonthGraph);

        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
        expect(result.current.loading).toBeFalsy();
    });

    test('changing year should change year', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const { result, waitForNextUpdate } = renderHook(useUsageByMonthGraph);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.year).toEqual(expectedYear);
    });

    test('changing year should change usage', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const expectedOptions = {
            chart: {
                id: 'usage-by-month',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
            },
        };
        const expectedSeries = [
            {
                name: 'Total Usage',
                data: [29, 23, 31, 16, 16, 12, 24],
            },
        ];
        const { result, waitForNextUpdate } = renderHook(useUsageByMonthGraph);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
    });
});
