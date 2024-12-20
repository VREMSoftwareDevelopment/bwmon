/*
 *      Copyright (C) 2010 - 2024 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UsageByMonthGraph from './UsageByMonthGraph';
import useUsageByMonthGraph from '../../hooks/bymonth/UseUsageByMonthGraph';

jest.mock('../../components/graph/Graph');
jest.mock('../../hooks/bymonth/UseUsageByMonthGraph');

describe('UsageByMonthGraph', () => {
    const data = {
        options: {},
        series: [],
        years: ['2021', '2022', '2023'],
        year: '2022',
        setYear: jest.fn(),
        loading: false,
    };

    beforeEach(() => {
        useUsageByMonthGraph.mockReturnValue(data);
    });

    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <UsageByMonthGraph {...props} />
            </ThemeProvider>
        );

    it('renders loading state', () => {
        useUsageByMonthGraph.mockReturnValue({ ...data, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders graph when data is loaded', () => {
        renderComponent();
        expect(screen.getByTestId('test-graph-id')).toBeInTheDocument();
    });

    it('renders graph with year selector', () => {
        renderComponent();
        const container = screen.getByTestId('month-year-graph');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('2022')).toBeInTheDocument();
    });

    it('displays correct graph options and series', () => {
        useUsageByMonthGraph.mockReturnValue({
            options: { chart: { id: 'test-chart' } },
            series: [{ name: 'test-series', data: [1, 2, 3] }],
            loading: false,
        });
        renderComponent();
        expect(screen.getByTestId('test-graph-id')).toBeInTheDocument();
        expect(screen.getByTestId('test-graph-id')).toHaveTextContent('Graph');
        expect(screen.getByTestId('test-graph-id')).toHaveTextContent('{"chart":{"id":"test-chart"}}');
        expect(screen.getByTestId('test-graph-id')).toHaveTextContent('[{"name":"test-series","data":[1,2,3]}]');
    });
});
