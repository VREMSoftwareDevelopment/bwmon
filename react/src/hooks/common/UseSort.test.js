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
import useSort from './UseSort';

describe('UseSort', () => {
    it('should initialize', () => {
        const { result } = renderHook(() => useSort(false, 'xyz'));

        expect(result.current.ascending).toBeFalsy();
        expect(result.current.orderBy).toEqual('xyz');
    });

    it('changing ascending should change ascending', async () => {
        const { result } = renderHook(() => useSort(false, 'xyz'));

        act(() => result.current.setAscending(true));

        expect(result.current.ascending).toBeTruthy();
    });

    it('changing orderBy should change orderBy', async () => {
        const { result } = renderHook(() => useSort(false, 'xyz'));

        act(() => result.current.setOrderBy('ABC'));

        expect(result.current.orderBy).toEqual('ABC');
    });
});
