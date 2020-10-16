import { act, renderHook } from '@testing-library/react-hooks';
import useSort from './UseSort';

describe('UseSort', () => {
    test('should initialize', () => {
        const { result } = renderHook(() => useSort(false, 'xyz'));

        expect(result.current.ascending).toBeFalsy();
        expect(result.current.orderBy).toEqual('xyz');
    });

    test('changing ascending should change ascending', async () => {
        const { result } = renderHook(() => useSort(false, 'xyz'));

        act(() => result.current.setAscending(true));

        expect(result.current.ascending).toBeTruthy();
    });

    test('changing orderBy should change orderBy', async () => {
        const { result } = renderHook(() => useSort(false, 'xyz'));

        act(() => result.current.setOrderBy('ABC'));

        expect(result.current.orderBy).toEqual('ABC');
    });
});
