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
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useUsageByYear from '../../hooks/byyear/UseUsageByYear';
import useSort from '../../hooks/common/UseSort';
import UsageByYear from './UsageByYear';

jest.mock('../../hooks/byyear/UseUsageByYear');
jest.mock('../../hooks/common/UseSort');

describe('UsageByYear', () => {
    const data = [
        { id: '2020', download: 100000, upload: 20000, total: 120000, average: 10000, days: 12 },
        { id: '2021', download: 200000, upload: 40000, total: 240000, average: 20000, days: 24 },
    ];

    beforeEach(() => {
        useUsageByYear.mockReturnValue({ data: data, loading: false });
        useSort.mockReturnValue({
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
                <UsageByYear {...props} />
            </ThemeProvider>
        );

    it('renders loading state', () => {
        useUsageByYear.mockReturnValue({ data: null, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders table header', () => {
        renderComponent();
        const container = screen.getByTestId('year-header');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('Year')).toBeInTheDocument();
        expect(getByText('Down')).toBeInTheDocument();
        expect(getByText('Up')).toBeInTheDocument();
        expect(getByText('Total')).toBeInTheDocument();
        expect(getByText('Average')).toBeInTheDocument();
        expect(getByText('Days')).toBeInTheDocument();
    });

    it('renders table body row 1', () => {
        renderComponent();
        const container = screen.getByTestId('year-data-0');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('2020')).toBeInTheDocument();
        expect(getByText('0.100')).toBeInTheDocument();
        expect(getByText('0.020')).toBeInTheDocument();
        expect(getByText('0.120')).toBeInTheDocument();
        expect(getByText('0.010')).toBeInTheDocument();
        expect(getByText('12')).toBeInTheDocument();
    });

    it('renders table body row 2', () => {
        renderComponent();
        const container = screen.getByTestId('year-data-1');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('2021')).toBeInTheDocument();
        expect(getByText('0.200')).toBeInTheDocument();
        expect(getByText('0.040')).toBeInTheDocument();
        expect(getByText('0.240')).toBeInTheDocument();
        expect(getByText('0.020')).toBeInTheDocument();
        expect(getByText('24')).toBeInTheDocument();
    });

    it('handles sort request by year', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Year'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('id');
    });

    it('handles sort request by total', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Total'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('total');
    });
});
