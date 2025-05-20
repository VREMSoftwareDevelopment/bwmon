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

import { renderHook, act } from '@testing-library/react';
import useNavigation from './UseNavigation';

let mockPathname = '/pathname2';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        pathname: mockPathname,
    }),
}));

const mockUseLocation = (pathname) => {
    mockPathname = pathname;
};

describe('UseNavigation', () => {
    beforeEach(() => {
        mockPathname = '/pathname2';
    });

    it('should initialize', () => {
        const menu = [{ pathname: '/pathname1' }, { pathname: '/pathname2' }, { pathname: '/pathname3' }];
        const { result } = renderHook(() => useNavigation(menu));

        expect(result.current.index).toEqual(1);
    });

    it('should default to first path if not found', () => {
        const menu = [{ pathname: '/pathname1' }, { pathname: '/pathname3' }];
        const { result } = renderHook(() => useNavigation(menu));

        expect(result.current.index).toEqual(0);
    });

    it('should not change index if setIndex is called with invalid value', () => {
        mockUseLocation('/pathname1');
        const menu = [{ pathname: '/pathname1' }, { pathname: '/pathname2' }];
        const { result } = renderHook(() => useNavigation(menu));
        expect(result.current.index).toEqual(0);
        act(() => {
            result.current.setIndex(-1);
        });
        expect(result.current.index).toEqual(0);
        act(() => {
            result.current.setIndex(100);
        });
        expect(result.current.index).toEqual(0);
    });

    it('should reset index to 0 if menu changes and current index is out of bounds', () => {
        mockUseLocation('/pathname2');
        let menu = [{ pathname: '/pathname1' }, { pathname: '/pathname2' }];
        const { result, rerender } = renderHook(() => useNavigation(menu));
        expect(result.current.index).toEqual(1);
        menu = [{ pathname: '/pathname1' }];
        rerender();
        expect(result.current.index).toEqual(0);
    });

    it('should keep index if menu changes but current index is still valid', () => {
        mockUseLocation('/pathname2');
        let menu = [{ pathname: '/pathname1' }, { pathname: '/pathname2' }, { pathname: '/pathname3' }];
        const { result, rerender } = renderHook(() => useNavigation(menu));
        expect(result.current.index).toEqual(1);
        menu = [{ pathname: '/pathname1' }, { pathname: '/pathname2' }, { pathname: '/pathname4' }];
        rerender();
        expect(result.current.index).toEqual(1);
    });

    it('should handle repeated setIndex calls to the same value', () => {
        mockUseLocation('/pathname1');
        const menu = [{ pathname: '/pathname1' }, { pathname: '/pathname2' }];
        const { result } = renderHook(() => useNavigation(menu));
        expect(result.current.index).toEqual(0);
        act(() => {
            result.current.setIndex(0);
            result.current.setIndex(0);
        });
        expect(result.current.index).toEqual(0);
    });
});
