import fetchMock from 'jest-fetch-mock';
import usage from './Usage';

fetchMock.enableMocks();

describe('Usage', () => {
    beforeEach(() => {
        fetch.resetMocks();
        fetch.doMock();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should return data', async () => {
        const response =
            '2011-06,192.168.1.14,00:24:8D:28:F2:9A,COMPUTER-1,202809,11512,1307160300,1308013207\n' +
            '\n' +
            '2012-01,192.168.1.20,00:1A:E9:92:A5:5F,COMPUTER-8,23120,428,1325970007,1325970007\n' +
            '\n' +
            '2013-01,192.168.1.16,00:90:A9:C6:19:5B,COMPUTER-11,212959,10700,1357322402,1359313201\n';
        const expectedFirst = {
            IP: '192.168.1.14',
            MAC: '00:24:8D:28:F2:9A',
            average: 21432.1,
            days: 10,
            download: 202809,
            firstSeen: 1307160300,
            id: 0,
            lastSeen: 1308013207,
            month: 6,
            total: 214321,
            upload: 11512,
            user: 'COMPUTER-1',
            year: 2011,
        };
        const expectedLast = {
            IP: '192.168.1.16',
            MAC: '00:90:A9:C6:19:5B',
            average: 9319.125,
            days: 24,
            download: 212959,
            firstSeen: 1357322402,
            id: 4,
            lastSeen: 1359313201,
            month: 1,
            total: 223659,
            upload: 10700,
            user: 'COMPUTER-11',
            year: 2013,
        };

        fetch.mockResponseOnce(response);

        const data = await usage.request('xyz');

        expect(data.length).toEqual(3);
        expect(data[0]).toEqual(expectedFirst);
        expect(data[2]).toEqual(expectedLast);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('xyz/usage.db');
    });

    test('should return error when status is not OK', async () => {
        fetch.mockResponseOnce('', { status: 400, statusText: 'Bad request' });

        try {
            await usage.request('xyz');
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toEqual('400 Bad request');
        }
    });
});
