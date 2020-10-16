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
