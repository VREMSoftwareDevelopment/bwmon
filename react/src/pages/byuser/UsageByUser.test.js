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
import UsageByUser from './UsageByUser'; // Adjust the path as necessary
import useUsageByUser from '../../hooks/byuser/UseUsageByUser';
import useSort from '../../hooks/common/UseSort';
import usePagination from '../../hooks/common/UsePagination';

jest.mock('../../hooks/byuser/UseUsageByUser');
jest.mock('../../hooks/common/UsePagination');
jest.mock('../../hooks/common/UseSort');

describe('UsageByUser', () => {
    const data = {
        usage: [
            {
                id: 1,
                IP: '192.168.0.1',
                MAC: '00:0a:95:9d:68:16',
                user: 'User1',
                download: 100,
                upload: 50,
                total: 150,
                percent: 50,
                average: 75,
                days: 10,
                firstSeen: '2021-01-01',
                lastSeen: '2021-01-10',
            },
        ],
        total: { download: 500, upload: 250, total: 750 },
        years: [2021, 2022],
        months: ['January', 'February'],
    };

    beforeEach(() => {
        useUsageByUser.mockReturnValue({
            years: data.years,
            year: 2021,
            setYear: jest.fn(),
            months: data.months,
            month: 'January',
            setMonth: jest.fn(),
            filter: '',
            setFilter: jest.fn(),
            data: data,
            loading: false,
        });

        useSort.mockReturnValue({
            ascending: true,
            setAscending: jest.fn(),
            orderBy: 'IP',
            setOrderBy: jest.fn(),
        });

        usePagination.mockReturnValue({
            page: 0,
            setPage: jest.fn(),
            rowsPerPage: 10,
            setRowsPerPage: jest.fn(),
        });
    });

    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <UsageByUser {...props} />
            </ThemeProvider>
        );

    it('renders loading state', () => {
        useUsageByUser.mockReturnValue({ ...data, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders table with data', () => {
        renderComponent();
        expect(screen.getByText('IP')).toBeInTheDocument();
        expect(screen.getByText('MAC')).toBeInTheDocument();
    });

    it('handles sort by IP', () => {
        renderComponent();
        fireEvent.click(screen.getByText('IP'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('IP');
    });
});
