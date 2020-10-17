import { act, renderHook } from '@testing-library/react-hooks';
import useUsageByMonth from './UseUsageByMonth';

jest.mock('../../services/Usage');

describe('UseUsageByMonth', () => {
    const expectedYears = [2013, 2012, 2011];
    const expectedYearsCount = 3;

    test('should initialize years', async () => {
        const { result, waitForNextUpdate } = renderHook(useUsageByMonth);

        await waitForNextUpdate();

        expect(result.current.years.length).toEqual(expectedYearsCount);
        expect(result.current.years).toEqual(expectedYears);
        expect(result.current.year).toEqual(expectedYears[0]);
    });

    test('should initialize usage', async () => {
        const expectedCount = 11;
        const expectedTotal = {
            average: 1752605.622,
            days: 365,
            download: 603928097,
            id: 2013,
            total: 639701052,
            upload: 35772955,
        };
        const expectedFirst = {
            average: 2910960.6,
            days: 30,
            download: 83065864,
            id: 11,
            percent: 13.7,
            total: 87328818,
            upload: 4262954,
        };
        const expectedLast = {
            average: 2198342.935,
            days: 31,
            download: 64043397,
            id: 1,
            percent: 10.7,
            total: 68148631,
            upload: 4105234,
        };
        const { result, waitForNextUpdate } = renderHook(useUsageByMonth);

        await waitForNextUpdate();

        expect(result.current.data.total).toEqual(expectedTotal);
        expect(result.current.data.usage.length).toEqual(expectedCount);
        expect(result.current.data.usage[0]).toEqual(expectedFirst);
        expect(result.current.data.usage[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.loading).toBeFalsy();
    });

    test('changing year should change year', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const { result, waitForNextUpdate } = renderHook(useUsageByMonth);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.year).toEqual(expectedYear);
    });

    test('changing year should change usage', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const expectedCount = 7;
        const expectedTotal = { average: 412831.811, days: 365, download: 139938627, id: 2011, total: 150683611, upload: 10744984 };
        const expectedFirst = {
            average: 769768.258,
            days: 31,
            download: 21926209,
            id: 12,
            percent: 15.8,
            total: 23862816,
            upload: 1936607,
        };
        const expectedLast = { average: 967836.233, days: 30, download: 26949429, id: 6, percent: 19.3, total: 29035087, upload: 2085658 };
        const { result, waitForNextUpdate } = renderHook(useUsageByMonth);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.data.total).toEqual(expectedTotal);
        expect(result.current.data.usage.length).toEqual(expectedCount);
        expect(result.current.data.usage[0]).toEqual(expectedFirst);
        expect(result.current.data.usage[expectedCount - 1]).toEqual(expectedLast);
    });
});
