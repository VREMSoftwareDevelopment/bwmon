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

import { renderHook } from '@testing-library/react-hooks';
import useUsageByYearGraph from './UseUsageByYearGraph';

jest.mock('../../services/Usage');

describe('UseUsageByYearGraph', () => {
    test('should initialize', async () => {
        const expectedOptions = {
            chart: {
                id: 'usage-by-year',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: [2011, 2012, 2013],
            },
        };

        const expectedSeries = [
            {
                name: 'Total Usage',
                data: [151, 437, 640],
            },
        ];

        const { result, waitForNextUpdate } = renderHook(useUsageByYearGraph);

        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
        expect(result.current.loading).toBeFalsy();
    });
});
