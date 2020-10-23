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

import { act, renderHook } from '@testing-library/react-hooks';
import useNavigation from './UseNavigation';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: '/pathname2',
    }),
}));

describe('UseNavigation', () => {
    test('should initialize', () => {
        const menu = [{ pathname: '/pathname1' }, { pathname: '/pathname2' }, { pathname: '/pathname3' }];
        const { result } = renderHook(() => useNavigation(menu));

        expect(result.current.index).toEqual(1);
    });

    test('should default to first path if not found', () => {
        const menu = [{ pathname: '/pathname1' }, { pathname: '/pathname3' }];
        const { result } = renderHook(() => useNavigation(menu));

        expect(result.current.index).toEqual(0);
    });
});
