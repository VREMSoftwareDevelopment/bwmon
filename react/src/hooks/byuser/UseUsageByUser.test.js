import { act, renderHook } from '@testing-library/react-hooks';
import useUsageByUser from './UseUsageByUser';

jest.mock('../../services/Usage');

describe('UseUsageByUser', () => {
    const expectedYears = [2013, 2012, 2011];
    const expectedYearsCount = 3;

    test('should initialize years', async () => {
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        expect(result.current.years.length).toEqual(expectedYearsCount);
        expect(result.current.years).toEqual(expectedYears);
        expect(result.current.year).toEqual(expectedYears[0]);
    });

    test('should initialize months', async () => {
        const expectedCount = 11;
        const expectedFirst = 'November';
        const expectedLast = 'January';
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        expect(result.current.months.length).toEqual(expectedCount);
        expect(result.current.months[0]).toEqual(expectedFirst);
        expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
    });

    test('should initialize usage', async () => {
        const expectedCount = 27;
        const expectedTotal = { average: 2910960.6, days: 30, download: 83065864, id: 11, total: 87328818, upload: 4262954 };
        const expectedFirst = {
            IP: '192.168.1.10',
            MAC: '00:1C:25:27:9B:AE',
            average: 532586.133,
            days: 30,
            download: 15004318,
            firstSeen: 1383337801,
            id: 235,
            lastSeen: 1385868602,
            month: 11,
            percent: 18.3,
            total: 15977584,
            upload: 973266,
            user: 'COMPUTER-3',
            year: 2013,
        };
        const expectedLast = {
            IP: '192.168.2.146',
            MAC: '0C:EE:E6:80:C8:8C',
            average: 19914.6,
            days: 30,
            download: 572601,
            firstSeen: 1383337801,
            id: 234,
            lastSeen: 1385868602,
            month: 11,
            percent: 0.7,
            total: 597438,
            upload: 24837,
            user: 'COMPUTER-27',
            year: 2013,
        };
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        expect(result.current.data.total).toEqual(expectedTotal);
        expect(result.current.data.usage.length).toEqual(expectedCount);
        expect(result.current.data.usage[0]).toEqual(expectedFirst);
        expect(result.current.data.usage[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.loading).toBeFalsy();
    });

    test('changing year should change year', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.year).toEqual(expectedYear);
    });

    test('changing year should change months', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const expectedCount = 7;
        const expectedFirst = 'December';
        const expectedLast = 'June';
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.months.length).toEqual(expectedCount);
        expect(result.current.months[0]).toEqual(expectedFirst);
        expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.month).toEqual(expectedFirst);
    });

    test('changing year should change usage', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const expectedCount = 7;
        const expectedTotal = { average: 769768.258, days: 31, download: 21926209, id: 12, total: 23862816, upload: 1936607 };
        const expectedFirst = {
            IP: '192.168.1.10',
            MAC: '00:1C:25:27:9B:AE',
            average: 445855.806,
            days: 31,
            download: 12805542,
            firstSeen: 1322757002,
            id: 45,
            lastSeen: 1325392201,
            month: 12,
            percent: 57.9,
            total: 13821530,
            upload: 1015988,
            user: 'COMPUTER-3',
            year: 2011,
        };
        const expectedLast = {
            IP: '192.168.1.25',
            MAC: '70:D4:F2:DA:FA:C9',
            average: 88103.9,
            days: 10,
            download: 862905,
            firstSeen: 1324515601,
            id: 43,
            lastSeen: 1325352601,
            month: 12,
            percent: 3.7,
            total: 881039,
            upload: 18134,
            user: 'COMPUTER-15',
            year: 2011,
        };
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.data.total).toEqual(expectedTotal);
        expect(result.current.data.usage.length).toEqual(expectedCount);
        expect(result.current.data.usage[0]).toEqual(expectedFirst);
        expect(result.current.data.usage[expectedCount - 1]).toEqual(expectedLast);
    });

    test('changing month should change month', async () => {
        const expected = 'August';
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        act(() => result.current.setMonth(expected));
        await waitForNextUpdate();

        expect(result.current.month).toEqual(expected);
    });

    test('changing month should change usage', async () => {
        const expected = 'August';
        const expectedCount = 9;
        const expectedTotal = { average: 1182695.032, days: 31, download: 34516261, id: 8, total: 36663546, upload: 2147285 };
        const expectedFirst = {
            IP: '192.168.1.10',
            MAC: '00:1C:25:27:9B:AE',
            average: 356156.3,
            days: 30,
            download: 10480930,
            firstSeen: 1375399802,
            id: 197,
            lastSeen: 1377918007,
            month: 8,
            percent: 29.1,
            total: 10684689,
            upload: 203759,
            user: 'COMPUTER-3',
            year: 2013,
        };
        const expectedLast = {
            IP: '192.168.1.27',
            MAC: '10:D5:42:88:3F:A0',
            average: 32825.036,
            days: 28,
            download: 852825,
            firstSeen: 1375401602,
            id: 194,
            lastSeen: 1377802802,
            month: 8,
            percent: 2.5,
            total: 919101,
            upload: 66276,
            user: 'COMPUTER-16',
            year: 2013,
        };
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        act(() => result.current.setMonth(expected));
        await waitForNextUpdate();

        expect(result.current.data.total).toEqual(expectedTotal);
        expect(result.current.data.usage.length).toEqual(expectedCount);
        expect(result.current.data.usage[0]).toEqual(expectedFirst);
        expect(result.current.data.usage[expectedCount - 1]).toEqual(expectedLast);
    });

    test('changing filter should change filter', async () => {
        const expected = '20';
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        act(() => result.current.setFilter(expected));
        await waitForNextUpdate();

        expect(result.current.filter).toEqual(expected);
    });

    test('changing filter should change usage', async () => {
        const expected = '20';
        const expectedCount = 3;
        const expectedTotal = { average: 3911.033, days: 30, download: 113795, id: 11, total: 117331, upload: 3536 };
        const expectedFirst = {
            IP: '192.168.1.113',
            MAC: '00:1A:A0:C7:27:D3',
            average: 68.767,
            days: 30,
            download: 1812,
            firstSeen: 1383337801,
            id: 229,
            lastSeen: 1385868602,
            month: 11,
            percent: 1.8,
            total: 2063,
            upload: 251,
            user: 'COMPUTER-20',
            year: 2013,
        };
        const expectedLast = {
            IP: '192.168.1.20',
            MAC: '00:1A:E9:92:A5:5F',
            average: 784.933,
            days: 30,
            download: 23120,
            firstSeen: 1383337801,
            id: 242,
            lastSeen: 1385868602,
            month: 11,
            percent: 20.1,
            total: 23548,
            upload: 428,
            user: 'COMPUTER-8',
            year: 2013,
        };
        const { result, waitForNextUpdate } = renderHook(useUsageByUser);

        await waitForNextUpdate();

        act(() => result.current.setFilter(expected));
        await waitForNextUpdate();

        expect(result.current.data.total).toEqual(expectedTotal);
        expect(result.current.data.usage.length).toEqual(expectedCount);
        expect(result.current.data.usage[0]).toEqual(expectedFirst);
        expect(result.current.data.usage[expectedCount - 1]).toEqual(expectedLast);
    });
});
