import { renderHook } from '@testing-library/react-hooks';
import useUsageByYearGraph from './UseUsageByYearGraph';

jest.mock('../../services/Usage');

describe('UseUsageByYearGraph', () => {
    test('should initialize', async () => {
        const expectedOptions = {
            chart: {
                id: 'usage-by-year',
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: [2011, 2012, 2013],
            },
        };

        const expectedSeries = [
            {
                name: 'Total Usage',
                data: [151, 437, 640],
            },
        ];

        const { result, waitForNextUpdate } = renderHook(useUsageByYearGraph);

        await waitForNextUpdate();

        expect(result.current.options).toEqual(expectedOptions);
        expect(result.current.series).toEqual(expectedSeries);
        expect(result.current.loading).toBeFalsy();
    });
});
