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

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UsageByYearGraph from './UsageByYearGraph';
import useUsageByYearGraph from '@hooks/byyear/UseUsageByYearGraph';

jest.mock('@components/graph/Graph');
jest.mock('@hooks/byyear/UseUsageByYearGraph');

describe('UsageByYearGraph', () => {
    const data = {
        options: {},
        series: [],
        loading: false,
    };

    beforeEach(() => {
        useUsageByYearGraph.mockReturnValue(data);
    });

    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <UsageByYearGraph {...props} />
            </ThemeProvider>
        );

    it('renders loading state', () => {
        useUsageByYearGraph.mockReturnValue({ ...data, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders graph when data is loaded', () => {
        renderComponent();
        expect(screen.getByTestId('test-graph-id')).toBeInTheDocument();
    });

    it('displays correct graph options and series', () => {
        useUsageByYearGraph.mockReturnValue({
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
