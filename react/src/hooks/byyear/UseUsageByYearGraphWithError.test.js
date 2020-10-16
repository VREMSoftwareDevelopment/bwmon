import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import useUsageByYearGraph from './UseUsageByYearGraph';

fetchMock.enableMocks();

describe('UseUsageByYearGraph with error', () => {
    beforeEach(() => {
        fetch.resetMocks();
        fetch.doMock();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should return error when exception', async () => {
        const expectedOptions = {
            chart: {
                id: 'usage-by-year',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: [],
            },
        };

        const expectedSeries = [
            {
                name: 'Total Usage',
                data: [],
            },
        ];

        fetch.mockResponseOnce('', { status: 400, statusText: 'Bad request' });

        const { result, waitForNextUpdate } = renderHook(useUsageByYearGraph);

        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toEqual('Error! Can NOT load file: /usage.db | 400 Bad request');
    });
});
