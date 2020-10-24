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
import useUsageByUserGraph from './UseUsageByUserGraph';

jest.mock('../../services/Usage');

describe('UseUsageByUserGraph', () => {
    const expectedYears = [2013, 2012, 2011];
    const expectedYearsCount = 3;

    test('should initialize years', async () => {
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        expect(result.current.years.length).toEqual(expectedYearsCount);
        expect(result.current.years).toEqual(expectedYears);
        expect(result.current.year).toEqual(expectedYears[0]);
    });

    test('should initialize months', async () => {
        const expectedCount = 11;
        const expectedFirst = 'November';
        const expectedLast = 'January';
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        expect(result.current.months.length).toEqual(expectedCount);
        expect(result.current.months[0]).toEqual(expectedFirst);
        expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
    });

    test('should initialize usage', async () => {
        const expectedOptions = {
            chart: {
                id: 'usage-by-user',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: [
                    '192.168.1.10',
                    '192.168.1.11',
                    '192.168.1.110',
                    '192.168.1.113',
                    '192.168.1.115',
                    '192.168.1.12',
                    '192.168.1.120',
                    '192.168.1.13',
                    '192.168.1.133',
                    '192.168.1.14',
                    '192.168.1.140',
                    '192.168.1.148',
                    '192.168.1.15',
                    '192.168.1.16',
                    '192.168.1.20',
                    '192.168.1.21',
                    '192.168.1.22',
                    '192.168.1.23',
                    '192.168.1.24',
                    '192.168.1.25',
                    '192.168.1.26',
                    '192.168.1.27',
                    '192.168.1.28',
                    '192.168.2.101',
                    '192.168.2.106',
                    '192.168.2.142',
                    '192.168.2.146',
                ],
            },
        };
        const expectedSeries = [
            {
                name: 'Total Usage',
                data: [
                    '16.0',
                    '0.1',
                    '0.0',
                    '0.0',
                    '0.1',
                    '0.6',
                    '0.1',
                    '3.8',
                    '0.0',
                    '0.2',
                    '0.4',
                    '0.1',
                    '27.7',
                    '0.1',
                    '0.0',
                    '1.5',
                    '0.2',
                    '9.6',
                    '21.3',
                    '0.9',
                    '0.7',
                    '1.3',
                    '0.0',
                    '0.3',
                    '1.5',
                    '0.0',
                    '0.6',
                ],
            },
        ];
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
        expect(result.current.loading).toBeFalsy();
    });

    test('changing year should change year', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.year).toEqual(expectedYear);
    });

    test('changing year should change months', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const expectedCount = 7;
        const expectedFirst = 'December';
        const expectedLast = 'June';
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.months.length).toEqual(expectedCount);
        expect(result.current.months[0]).toEqual(expectedFirst);
        expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.month).toEqual(expectedFirst);
    });

    test('changing year should change usage', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const expectedOptions = {
            chart: {
                id: 'usage-by-user',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: [
                    '192.168.1.10',
                    '192.168.1.12',
                    '192.168.1.14',
                    '192.168.1.20',
                    '192.168.1.21',
                    '192.168.1.24',
                    '192.168.1.25',
                ],
            },
        };
        const expectedSeries = [
            {
                name: 'Total Usage',
                data: ['13.8', '4.2', '0.2', '0.0', '0.0', '4.7', '0.9'],
            },
        ];
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
    });

    test('changing month should change month', async () => {
        const expected = 'August';
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        act(() => result.current.setMonth(expected));
        await waitForNextUpdate();

        expect(result.current.month).toEqual(expected);
    });

    test('changing month should change usage', async () => {
        const expected = 'August';
        const expectedOptions = {
            chart: {
                id: 'usage-by-user',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: [
                    '192.168.1.10',
                    '192.168.1.12',
                    '192.168.1.15',
                    '192.168.1.16',
                    '192.168.1.21',
                    '192.168.1.23',
                    '192.168.1.25',
                    '192.168.1.26',
                    '192.168.1.27',
                ],
            },
        };
        const expectedSeries = [
            {
                name: 'Total Usage',
                data: ['10.7', '1.1', '9.6', '0.2', '0.2', '12.4', '1.2', '0.3', '0.9'],
            },
        ];
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        act(() => result.current.setMonth(expected));
        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
    });

    test('changing filter should change filter', async () => {
        const expected = '20';
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        act(() => result.current.setFilter(expected));
        await waitForNextUpdate();

        expect(result.current.filter).toEqual(expected);
    });

    test('changing filter should change usage', async () => {
        const expected = '20';
        const expectedOptions = {
            chart: {
                id: 'usage-by-user',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ['192.168.1.113', '192.168.1.120', '192.168.1.20'],
            },
        };
        const expectedSeries = [
            {
                name: 'Total Usage',
                data: ['0.0', '0.1', '0.0'],
            },
        ];
        const { result, waitForNextUpdate } = renderHook(useUsageByUserGraph);

        await waitForNextUpdate();

        act(() => result.current.setFilter(expected));
        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
    });
});
