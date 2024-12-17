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
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UsageByMonth from './UsageByMonth';
import useUsageByMonth from '../../hooks/bymonth/UseUsageByMonth';
import useSort from '../../hooks/common/UseSort';

jest.mock('../../hooks/bymonth/UseUsageByMonth');
jest.mock('../../hooks/common/UseSort');

describe('UsageByMonth', () => {
    const data = {
        years: [2020, 2021, 2022],
        year: 2021,
        setYear: jest.fn(),
        data: {
            usage: [
                { id: '2021-01', download: 100, upload: 20, total: 120, percent: 10, average: 10, days: 31 },
                { id: '2021-02', download: 200, upload: 40, total: 240, percent: 20, average: 20, days: 28 },
            ],
            total: { download: 300, upload: 60, total: 360, percent: 30, average: 15, days: 59 },
        },
        loading: false,
    };

    beforeEach(() => {
        useUsageByMonth.mockReturnValue(data);
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
                <UsageByMonth {...props} />
            </ThemeProvider>
        );

    it('renders loading state', () => {
        useUsageByMonth.mockReturnValue({ ...data, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders table with data', () => {
        renderComponent();
        expect(screen.getByText('Month')).toBeInTheDocument();
        expect(screen.getByText('Down')).toBeInTheDocument();
        expect(screen.getByText('Up')).toBeInTheDocument();
        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('Percent')).toBeInTheDocument();
        expect(screen.getByText('Average')).toBeInTheDocument();
        expect(screen.getByText('Days')).toBeInTheDocument();
    });

    it('handles sort request', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Month'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('id');
    });
});
