import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import useUsageByYear from './UseUsageByYear';

fetchMock.enableMocks();

describe('UseUsageByYear with error', () => {
    beforeEach(() => {
        fetch.resetMocks();
        fetch.doMock();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should return error when exception', async () => {
        fetch.mockResponseOnce('', { status: 400, statusText: 'Bad request' });

        const { result, waitForNextUpdate } = renderHook(useUsageByYear);

        await waitForNextUpdate();

        expect(result.current.data).toEqual([]);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toEqual('Error! Can NOT load file: /usage.db | 400 Bad request');
    });
});
