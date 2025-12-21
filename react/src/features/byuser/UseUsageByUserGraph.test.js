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
import useUsageByUserGraph from './UseUsageByUserGraph';

jest.mock('@services/Usage');

describe('UseUsageByUserGraph', () => {
    const expectedYears = [2013, 2012, 2011];
    const expectedYearsCount = 3;

    it('should initialize years', async () => {
        const { result } = renderHook(useUsageByUserGraph);
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
        const { result } = renderHook(useUsageByUserGraph);
        await waitFor(() => {
            expect(result.current.months.length).toEqual(expectedCount);
            expect(result.current.months[0]).toEqual(expectedFirst);
            expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
        });
    });

    it('should initialize usage', async () => {
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
                    '192.168.1.12',
                    '192.168.1.13',
                    '192.168.1.14',
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
                    '192.168.1.110',
                    '192.168.1.113',
                    '192.168.1.115',
                    '192.168.1.120',
                    '192.168.1.133',
                    '192.168.1.140',
                    '192.168.1.148',
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
                    '0.6',
                    '3.8',
                    '0.2',
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
                    '0.0',
                    '0.0',
                    '0.1',
                    '0.1',
                    '0.0',
                    '0.4',
                    '0.1',
                    '0.3',
                    '1.5',
                    '0.0',
                    '0.6',
                ],
            },
        ];
        const { result } = renderHook(useUsageByUserGraph);
        await waitFor(() => {
            expect(result.current.options).toEqual(expectedOptions);
            expect(result.current.series).toEqual(expectedSeries);
            expect(result.current.loading).toBeFalsy();
        });
    });

    it('changing year should change year', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const { result } = renderHook(useUsageByUserGraph);
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
        const { result } = renderHook(useUsageByUserGraph);
        await waitFor(() => {
            act(() => result.current.setYear(expectedYear));
            expect(result.current.months.length).toEqual(expectedCount);
            expect(result.current.months[0]).toEqual(expectedFirst);
            expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
            expect(result.current.month).toEqual(expectedFirst);
        });
    });

    it('changing year should change usage', async () => {
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
        const { result } = renderHook(useUsageByUserGraph);
        await waitFor(() => {
            act(() => result.current.setYear(expectedYear));
            expect(result.current.options).toEqual(expectedOptions);
            expect(result.current.series).toEqual(expectedSeries);
        });
    });

    it('changing month should change month', async () => {
        const expected = 'August';
        const { result } = renderHook(useUsageByUserGraph);
        await waitFor(() => {
            act(() => result.current.setMonth(expected));
            expect(result.current.month).toEqual(expected);
        });
    });

    it('changing month should change usage', async () => {
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
        const { result } = renderHook(useUsageByUserGraph);
        await waitFor(() => {
            act(() => result.current.setMonth(expected));
            expect(result.current.options).toEqual(expectedOptions);
            expect(result.current.series).toEqual(expectedSeries);
        });
    });

    it('changing filter should change filter', async () => {
        const expected = '20';
        const { result } = renderHook(useUsageByUserGraph);
        await waitFor(() => {
            act(() => result.current.setFilter(expected));
            expect(result.current.filter).toEqual(expected);
        });
    });

    it('changing filter should change usage', async () => {
        const expected = '20';
        const expectedOptions = {
            chart: {
                id: 'usage-by-user',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ['192.168.1.20', '192.168.1.113', '192.168.1.120'],
            },
        };
        const expectedSeries = [
            {
                name: 'Total Usage',
                data: ['0.0', '0.0', '0.1'],
            },
        ];
        const { result } = renderHook(useUsageByUserGraph);
        await waitFor(() => {
            act(() => result.current.setFilter(expected));
            expect(result.current.options).toEqual(expectedOptions);
            expect(result.current.series).toEqual(expectedSeries);
        });
    });
});
