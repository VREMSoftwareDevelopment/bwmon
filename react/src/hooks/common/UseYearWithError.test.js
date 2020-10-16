import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import useYear from './UseYear';

fetchMock.enableMocks();

describe('UseYear with error', () => {
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

        const { result, waitForNextUpdate } = renderHook(useYear);

        await waitForNextUpdate();

        expect(result.current.years).toBeFalsy();
        expect(result.current.year).toBeFalsy();
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toEqual('Error! Can NOT load file: /usage.db | 400 Bad request');
    });
});
