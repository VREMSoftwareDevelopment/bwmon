import { renderHook } from '@testing-library/react-hooks';
import useUsageByYear from './UseUsageByYear';

jest.mock('../../services/Usage');

describe('UseUsageByYear', () => {
    test.only('should initialize', async () => {
        const expectedCount = 3;
        const expectedFirst = {
            average: 1752605.622,
            days: 365,
            download: 603928097,
            id: 2013,
            total: 639701052,
            upload: 35772955,
        };
        const expectedLast = {
            average: 412831.811,
            days: 365,
            download: 139938627,
            id: 2011,
            total: 150683611,
            upload: 10744984,
        };
        const { result, waitForNextUpdate } = renderHook(useUsageByYear);

        await waitForNextUpdate();

        expect(result.current.data.length).toEqual(expectedCount);
        expect(result.current.data[0]).toEqual(expectedFirst);
        expect(result.current.data[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });
});
