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
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    test('changing year should change year', async () => {
        const expected = expectedYears[expectedYears.length - 1];
        const { result, waitForNextUpdate } = renderHook(useYear);

        await waitForNextUpdate();

        act(() => result.current.setYear(expected));

        expect(result.current.year).toEqual(expected);
    });
});
