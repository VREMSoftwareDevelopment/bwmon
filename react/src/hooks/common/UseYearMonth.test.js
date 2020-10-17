import { act, renderHook } from '@testing-library/react-hooks';
import useYearMonth from './UseYearMonth';

jest.mock('../../services/Usage');

describe('UseYearMonth', () => {
    const expectedYears = [2013, 2012, 2011];
    const expectedYearsCount = 3;

    test('should initialize years', async () => {
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();

        expect(result.current.years.length).toEqual(expectedYearsCount);
        expect(result.current.years).toEqual(expectedYears);
        expect(result.current.year).toEqual(expectedYears[0]);
    });

    test('should initialize months', async () => {
        const expectedCount = 11;
        const expectedFirst = 'November';
        const expectedLast = 'January';
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();

        expect(result.current.months.length).toEqual(expectedCount);
        expect(result.current.months[0]).toEqual(expectedFirst);
        expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.month).toEqual(expectedFirst);
    });

    test('changing year should change year', async () => {
        const expectedYear = expectedYears[expectedYearsCount - 1];
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

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
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();

        act(() => result.current.setYear(expectedYear));
        await waitForNextUpdate();

        expect(result.current.months.length).toEqual(expectedCount);
        expect(result.current.months[0]).toEqual(expectedFirst);
        expect(result.current.months[expectedCount - 1]).toEqual(expectedLast);
        expect(result.current.month).toEqual(expectedFirst);
    });

    test('changing month should change month', async () => {
        const expected = 'August';
        const { result, waitForNextUpdate } = renderHook(useYearMonth);

        await waitForNextUpdate();
        act(() => result.current.setMonth(expected));

        expect(result.current.month).toEqual(expected);
    });
});
