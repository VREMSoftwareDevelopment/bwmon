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
import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSortDesc } from '@hooks';
import UsageByMonth from './UsageByMonth';
import useUsageByMonth from './UseUsageByMonth';

jest.mock('@features/bymonth/UseUsageByMonth');
jest.mock('@hooks/UseSort');

describe('UsageByMonth', () => {
    const data = {
        years: [2020, 2021, 2022],
        year: 2021,
        setYear: jest.fn(),
        data: {
            usage: [
                { id: 1, download: 100000, upload: 20000, total: 120000, percent: 10, average: 10000, days: 10 },
                { id: 2, download: 200000, upload: 40000, total: 240000, percent: 20, average: 20000, days: 20 },
            ],
            total: { download: 300000, upload: 60000, total: 360000, percent: 30, average: 15000, days: 30 },
        },
        loading: false,
    };

    beforeEach(() => {
        useUsageByMonth.mockReturnValue(data);
        useSortDesc.mockReturnValue({
            ascending: true,
            setAscending: jest.fn(),
            orderBy: 'id',
            setOrderBy: jest.fn(),
        });
    });

    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <UsageByMonth {...props} />
            </ThemeProvider>
        );

    it('renders loading state', () => {
        useUsageByMonth.mockReturnValue({ data: null, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByTestId('month-header')).not.toBeInTheDocument();
    });

    it('renders error state', () => {
        useUsageByMonth.mockReturnValue({ data: null, loading: false, error: 'Failed to load data' });
        renderComponent();
        expect(screen.getByText('Failed to load data')).toBeInTheDocument();
        expect(screen.queryByTestId('month-header')).not.toBeInTheDocument();
    });

    it('renders table header', () => {
        renderComponent();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        const container = screen.getByTestId('month-header');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('Month')).toBeInTheDocument();
        expect(getByText('Down')).toBeInTheDocument();
        expect(getByText('Up')).toBeInTheDocument();
        expect(getByText('Total')).toBeInTheDocument();
        expect(getByText('Average')).toBeInTheDocument();
        expect(getByText('Days')).toBeInTheDocument();
    });

    it('renders table body row 1', () => {
        renderComponent();
        const container = screen.getByTestId('month-data-0');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('January')).toBeInTheDocument();
        expect(getByText('0.100')).toBeInTheDocument();
        expect(getByText('0.020')).toBeInTheDocument();
        expect(getByText('0.120')).toBeInTheDocument();
        expect(getByText('0.010')).toBeInTheDocument();
        expect(getByText('10')).toBeInTheDocument();
    });

    it('renders table body row 2', () => {
        renderComponent();
        const container = screen.getByTestId('month-data-1');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('February')).toBeInTheDocument();
        expect(getByText('0.200')).toBeInTheDocument();
        expect(getByText('0.040')).toBeInTheDocument();
        expect(getByText('0.240')).toBeInTheDocument();
        expect(getByText('0.020')).toBeInTheDocument();
        expect(getByText('20')).toBeInTheDocument();
    });

    it('renders table footer', () => {
        renderComponent();
        const container = screen.getByTestId('month-footer');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('Totals')).toBeInTheDocument();
        expect(getByText('0.300')).toBeInTheDocument();
        expect(getByText('0.060')).toBeInTheDocument();
        expect(getByText('0.360')).toBeInTheDocument();
        expect(getByText('0.015')).toBeInTheDocument();
        expect(getByText('30')).toBeInTheDocument();
    });

    it('renders year selector', () => {
        renderComponent();
        const container = screen.getByTestId('month-year');
        expect(container).toBeInTheDocument();
        expect(within(container).getByText(2021)).toBeInTheDocument();
    });

    it('handles year selector', () => {
        renderComponent();
        // scan-suspicious-ignore-next-line
        const container = document.querySelector('#month-year');
        fireEvent.mouseDown(container);
        fireEvent.click(screen.getByRole('option', { name: 2020 }));
        expect(useUsageByMonth().setYear).toHaveBeenCalledWith(2020);
    });

    it('handles sort request by month', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Month'));
        expect(useSortDesc().setAscending).toHaveBeenCalled();
        expect(useSortDesc().setOrderBy).toHaveBeenCalledWith('id');
    });

    it('handles sort request by total', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Total'));
        expect(useSortDesc().setAscending).toHaveBeenCalled();
        expect(useSortDesc().setOrderBy).toHaveBeenCalledWith('total');
    });
});
