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

import { act, renderHook } from '@testing-library/react';
import useInterval from './UseInterval';

describe('useInterval', () => {
    const DELAY = 100;
    let callback = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        callback.mockReset();
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it('should set an interval', () => {
        renderHook(() => useInterval(callback, DELAY));
        expect(callback).not.toHaveBeenCalled();
        for (let i = 0; i < 5; i++) {
            act(() => jest.runOnlyPendingTimers());
            expect(callback).toHaveBeenCalledTimes(i + 1);
        }
    });

    it('should stop running on unmount', () => {
        const { unmount } = renderHook(() => useInterval(callback, 100));
        unmount();
        jest.runOnlyPendingTimers();
        expect(callback).not.toHaveBeenCalled();
    });

    it('should update callback if it changes', () => {
        let cb = jest.fn();
        const { rerender } = renderHook(({ fn }) => useInterval(fn, DELAY), {
            initialProps: { fn: cb },
        });
        act(() => jest.runOnlyPendingTimers());
        expect(cb).toHaveBeenCalledTimes(1);

        const newCb = jest.fn();
        rerender({ fn: newCb });
        act(() => jest.runOnlyPendingTimers());
        expect(newCb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledTimes(1);
    });

    it('should update interval if delay changes', () => {
        const { rerender } = renderHook(({ delay }) => useInterval(callback, delay), { initialProps: { delay: DELAY } });
        act(() => jest.runOnlyPendingTimers());
        expect(callback).toHaveBeenCalledTimes(1);

        rerender({ delay: DELAY * 2 });
        act(() => jest.advanceTimersByTime(DELAY * 2));
        expect(callback).toHaveBeenCalledTimes(2);
    });
});
