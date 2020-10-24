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
import useYear from './UseYear';

jest.mock('../../services/Usage');

describe('UseYear', () => {
    const expectedYears = [2013, 2012, 2011];

    test('should initialize', async () => {
        const { result, waitForNextUpdate } = renderHook(useYear);

        await waitForNextUpdate();

        expect(result.current.years.length).toEqual(expectedYears.length);
        expect(result.current.years).toEqual(expectedYears);
        expect(result.current.year).toEqual(expectedYears[0]);
    });

    test('changing year should change year', async () => {
        const expected = expectedYears[expectedYears.length - 1];
        const { result, waitForNextUpdate } = renderHook(useYear);

        await waitForNextUpdate();

        act(() => result.current.setYear(expected));

        expect(result.current.year).toEqual(expected);
    });
});
