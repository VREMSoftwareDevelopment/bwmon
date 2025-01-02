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
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UsageByUserGraph from './UsageByUserGraph';
import useUsageByUserGraph from '../../hooks/byuser/UseUsageByUserGraph';
import Search from '../../components/inputs/Search';

jest.mock('../../components/graph/Graph');
jest.mock('../../components/inputs/Search');
jest.mock('../../hooks/byuser/UseUsageByUserGraph');

describe('UsageByUserGraph', () => {
    const data = {
        options: {},
        series: [],
        years: [2020, 2021, 2022],
        year: 2021,
        setYear: jest.fn(),
        months: ['January', 'February', 'March'],
        month: 'February',
        setMonth: jest.fn(),
        setFilter: jest.fn(),
        loading: false,
    };

    beforeEach(() => {
        useUsageByUserGraph.mockReturnValue(data);
    });

    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <UsageByUserGraph {...props} />
            </ThemeProvider>
        );

    it('renders loading state', () => {
        useUsageByUserGraph.mockReturnValue({ ...data, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders graph when data is loaded', () => {
        renderComponent();
        expect(screen.getByTestId('test-graph-id')).toBeInTheDocument();
    });

    it('renders year selector', () => {
        renderComponent();
        const container = screen.getByTestId('user-year-graph');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText(2021)).toBeInTheDocument();
    });

    it('handles year selector', () => {
        renderComponent();
        const container = document.querySelector('#user-year-graph');
        fireEvent.mouseDown(container);
        fireEvent.click(screen.getByRole('option', { name: 2020 }));
        expect(useUsageByUserGraph().setYear).toHaveBeenCalledWith(2020);
    });

    it('renders month selector', () => {
        renderComponent();
        const container = screen.getByTestId('user-month-graph');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('February')).toBeInTheDocument();
    });

    it('handles month selector', () => {
        renderComponent();
        const container = document.querySelector('#user-month-graph');
        fireEvent.mouseDown(container);
        fireEvent.click(screen.getByRole('option', { name: 'January' }));
        expect(useUsageByUserGraph().setMonth).toHaveBeenCalledWith('January');
    });

    it('displays correct graph options and series', () => {
        useUsageByUserGraph.mockReturnValue({
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

    it('handles user filter change', () => {
        Search.mockImplementation(({ onChange }) => <input data-testid="user-filter-graph" onChange={onChange} />);
        renderComponent();
        fireEvent.change(screen.getByTestId('user-filter-graph'), { target: { value: 'John' } });
        expect(data.setFilter).toHaveBeenCalledWith('John');
    });
});
