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
import useUsageByYear from '../../hooks/byyear/UseUsageByYear';
import usePagination from '../../hooks/common/UsePagination';
import useSort from '../../hooks/common/UseSort';
import UsageByYear from './UsageByYear';

jest.mock('../../hooks/byyear/UseUsageByYear');
jest.mock('../../hooks/common/UsePagination');
jest.mock('../../hooks/common/UseSort');

describe('UsageByYear', () => {
    const data = [
        { id: '2020', download: 100, upload: 20, total: 120, average: 10, days: 12 },
        { id: '2021', download: 200, upload: 40, total: 240, average: 20, days: 12 },
    ];

    beforeEach(() => {
        useUsageByYear.mockReturnValue({ data: data, loading: false });
        usePagination.mockReturnValue({
            page: 0,
            setPage: jest.fn(),
            rowsPerPage: 12,
            setRowsPerPage: jest.fn(),
        });
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

    it('renders table with data', () => {
        renderComponent();
        expect(screen.getByText('Year')).toBeInTheDocument();
        expect(screen.getByText('Down')).toBeInTheDocument();
        expect(screen.getByText('Up')).toBeInTheDocument();
        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('Average')).toBeInTheDocument();
        expect(screen.getByText('Days')).toBeInTheDocument();
        expect(screen.getByText('2020')).toBeInTheDocument();
        expect(screen.getByText('2021')).toBeInTheDocument();
    });

    it('handles sort request', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Year'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('id');
    });
});
