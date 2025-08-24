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

import fetchMock from 'jest-fetch-mock';
import { fromIPv4 } from '../utils/ConversionUtils';
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

    it('should return data', async () => {
        const response =
            '2011-06,192.168.1.14,00:24:8D:28:F2:9A,\rCOMPUTER-1,202809,11512,1307160300,1308013207\n' +
            '\r\n' +
            '2012-01,192.168.1.20,00:1A:E9:92:A5:5F,COMPUTER-8,23120,428,1325970007,\r1325970007\n' +
            '\r\n' +
            '\r\n' +
            '2013-01,192.168.1.16,00:90:A9:C6:19:5B,COMPUTER-11,\r212959,10700,1357322402,1359313201\n';
        const expected = [
            {
                IP: fromIPv4('192.168.1.14'),
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
            },
            {
                IP: fromIPv4('192.168.1.20'),
                MAC: '00:1A:E9:92:A5:5F',
                average: 23548,
                days: 1,
                download: 23120,
                firstSeen: 1325970007,
                id: 2,
                lastSeen: 1325970007,
                month: 1,
                total: 23548,
                upload: 428,
                user: 'COMPUTER-8',
                year: 2012,
            },
            {
                IP: fromIPv4('192.168.1.16'),
                MAC: '00:90:A9:C6:19:5B',
                average: 9319.125,
                days: 24,
                download: 212959,
                firstSeen: 1357322402,
                id: 5,
                lastSeen: 1359313201,
                month: 1,
                total: 223659,
                upload: 10700,
                user: 'COMPUTER-11',
                year: 2013,
            },
        ];
        fetch.mockResponseOnce(response);
        const data = await usage.request('xyz');
        expect(data.length).toEqual(expected.length);
        expected.forEach((item, index) => {
            expect(data[index]).toEqual(item);
        });
        expect(fetch).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith('xyz/usage.db');
    });

    it('should throw error when status is not OK', async () => {
        fetch.mockResponseOnce('', { status: 400, statusText: 'Bad request' });
        try {
            await usage.request('xyz');
            expect(true).toBeFalsy();
        } catch (e) {
            expect(e.message).toEqual('400 Bad request');
        }
    });
});
