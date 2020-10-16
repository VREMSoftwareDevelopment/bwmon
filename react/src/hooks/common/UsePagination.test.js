import { act, renderHook } from '@testing-library/react-hooks';
import usePagination from './UsePagination';

describe('UsePagination', () => {
    test('should initialize', () => {
        const { result } = renderHook(() => usePagination(10));

        expect(result.current.page).toEqual(0);
        expect(result.current.rowsPerPage).toEqual(10);
    });

    test('changing page should change page', async () => {
        const { result } = renderHook(() => usePagination(10));

        act(() => result.current.setPage(2));

        expect(result.current.page).toEqual(2);
    });

    test('changing rowsPerPage should change rowsPerPage', async () => {
        const { result } = renderHook(() => usePagination(10));

        act(() => result.current.setRowsPerPage(20));

        expect(result.current.rowsPerPage).toEqual(20);
    });
});
