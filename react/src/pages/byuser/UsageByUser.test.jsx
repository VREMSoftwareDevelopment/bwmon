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
import UsageByUser from './UsageByUser';
import { useUsageByUser, usePagination, useSortAsc } from '@hooks';
import { Search } from '@components';
import { fromIPv4 } from '@utils';

jest.mock('@components/inputs/Search');
jest.mock('@hooks/byuser/UseUsageByUser');
jest.mock('@hooks/common/UsePagination');
jest.mock('@hooks/common/UseSort');

describe('UsageByUser', () => {
    beforeEach(() => {
        useUsageByUser.mockReturnValue({
            years: data.years,
            year: 2021,
            setYear: jest.fn(),
            months: data.months,
            month: 'February',
            setMonth: jest.fn(),
            filter: '',
            setFilter: jest.fn(),
            data: data,
            loading: false,
        });
        useSortAsc.mockReturnValue({
            ascending: true,
            setAscending: jest.fn(),
            orderBy: 'IP',
            setOrderBy: jest.fn(),
        });
        usePagination.mockReturnValue({
            page: 0,
            setPage: jest.fn(),
            rowsPerPage: 20,
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
        useUsageByUser.mockReturnValue({ data: null, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByTestId('user-header')).not.toBeInTheDocument();
    });

    it('Pagination colSpan matches columnCount', () => {
        renderComponent();
        const pagination = screen.getByTestId('user-pagination-id');
        expect(pagination).toHaveAttribute('colspan', '7');
    });

    it('renders table header', () => {
        renderComponent();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        const container = screen.getByTestId('user-header');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('IP')).toBeInTheDocument();
        expect(getByText('MAC')).toBeInTheDocument();
        expect(getByText('User')).toBeInTheDocument();
        expect(getByText('Down')).toBeInTheDocument();
        expect(getByText('Up')).toBeInTheDocument();
        expect(getByText('Total')).toBeInTheDocument();
        expect(getByText('Average')).toBeInTheDocument();
        expect(getByText('Days')).toBeInTheDocument();
        expect(getByText('First Seen')).toBeInTheDocument();
        expect(getByText('Last Seen')).toBeInTheDocument();
    });

    it('renders table body row 1', () => {
        renderComponent();
        const container = screen.getByTestId('user-data-0');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('192.168.0.11')).toBeInTheDocument();
        expect(getByText('11:00:00:00:00:00')).toBeInTheDocument();
        expect(getByText('User11')).toBeInTheDocument();
        expect(getByText('0.100')).toBeInTheDocument();
        expect(getByText('0.010')).toBeInTheDocument();
        expect(getByText('0.110')).toBeInTheDocument();
        expect(getByText('1.0%')).toBeInTheDocument();
        expect(getByText('0.001')).toBeInTheDocument();
    });

    it('renders table body row 20', () => {
        renderComponent();
        const container = screen.getByTestId('user-data-19');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('192.168.0.32')).toBeInTheDocument();
        expect(getByText('32:00:00:00:00:00')).toBeInTheDocument();
        expect(getByText('User32')).toBeInTheDocument();
        expect(getByText('20.000')).toBeInTheDocument();
        expect(getByText('2.000')).toBeInTheDocument();
        expect(getByText('22.000')).toBeInTheDocument();
        expect(getByText('200.0%')).toBeInTheDocument();
        expect(getByText('0.200')).toBeInTheDocument();
    });

    it('does not render table body row 21', () => {
        renderComponent();
        const container = screen.queryByTestId('user-data-20');
        expect(container).not.toBeInTheDocument();
    });

    it('renders table footer', () => {
        renderComponent();
        const container = screen.getByTestId('user-footer');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('Totals')).toBeInTheDocument();
        expect(getByText('10.000')).toBeInTheDocument();
        expect(getByText('1.000')).toBeInTheDocument();
        expect(getByText('11.000')).toBeInTheDocument();
        expect(getByText('0.100')).toBeInTheDocument();
        expect(getByText('10')).toBeInTheDocument();
    });

    it('renders pagination', () => {
        renderComponent();
        const container = screen.getByTestId('user-pagination-id');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('1–20 of 27')).toBeInTheDocument();
    });

    it('handles next page change', () => {
        renderComponent();
        const container = screen.getByLabelText('next page');
        fireEvent.click(container);
        expect(usePagination().setPage).toHaveBeenCalledWith(1);
    });

    it('handles last page change', () => {
        renderComponent();
        const container = screen.getByLabelText('last page');
        fireEvent.click(container);
        expect(usePagination().setPage).toHaveBeenCalledWith(1);
    });

    it('handles rows per page change', () => {
        renderComponent();
        const container = screen.getByLabelText('rows per page');
        fireEvent.change(container, { target: { value: '27' } });
        expect(usePagination().setRowsPerPage).toHaveBeenCalledWith(27);
    });

    it('handles sort by IP', () => {
        renderComponent();
        fireEvent.click(screen.getByText('IP'));
        expect(useSortAsc().setAscending).toHaveBeenCalled();
        expect(useSortAsc().setOrderBy).toHaveBeenCalledWith('IP');
    });

    it('handles sort by MAC', () => {
        renderComponent();
        fireEvent.click(screen.getByText('MAC'));
        expect(useSortAsc().setAscending).toHaveBeenCalled();
        expect(useSortAsc().setOrderBy).toHaveBeenCalledWith('MAC');
    });

    it('handles sort by USER', () => {
        renderComponent();
        fireEvent.click(screen.getByText('User'));
        expect(useSortAsc().setAscending).toHaveBeenCalled();
        expect(useSortAsc().setOrderBy).toHaveBeenCalledWith('user');
    });

    it('handles sort by Total', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Total'));
        expect(useSortAsc().setAscending).toHaveBeenCalled();
        expect(useSortAsc().setOrderBy).toHaveBeenCalledWith('total');
    });

    it('renders year selector', () => {
        renderComponent();
        const container = screen.getByTestId('user-year');
        expect(container).toBeInTheDocument();
        expect(within(container).getByText(2021)).toBeInTheDocument();
    });

    it('handles year selector', () => {
        renderComponent();
        // scan-suspicious-ignore-next-line
        const container = document.querySelector('#user-year');
        fireEvent.mouseDown(container);
        fireEvent.click(screen.getByRole('option', { name: 2020 }));
        expect(useUsageByUser().setYear).toHaveBeenCalledWith(2020);
    });

    it('renders month selector', () => {
        renderComponent();
        const container = screen.getByTestId('user-month');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('February')).toBeInTheDocument();
    });

    it('handles month selector', () => {
        renderComponent();
        // scan-suspicious-ignore-next-line
        const container = document.querySelector('#user-month');
        fireEvent.mouseDown(container);
        fireEvent.click(screen.getByRole('option', { name: 'January' }));
        expect(useUsageByUser().setMonth).toHaveBeenCalledWith('January');
    });

    it('handles user filter change', () => {
        Search.mockImplementation(({ onChange }) => <input data-testid="user-filter" onChange={onChange} />);
        renderComponent();
        fireEvent.change(screen.getByTestId('user-filter'), { target: { value: 'John' } });
        expect(useUsageByUser().setFilter).toHaveBeenCalledWith('John');
    });

    it('returns the correct number of rows for the first page', () => {
        usePagination.mockReturnValue({
            page: 0,
            setPage: jest.fn(),
            rowsPerPage: 2,
            setRowsPerPage: jest.fn(),
        });
        renderComponent();
        expect(screen.getByTestId('user-data-0')).toHaveTextContent('11:00:00:00:00:00');
        expect(screen.getByTestId('user-data-1')).toHaveTextContent('12:00:00:00:00:00');
        expect(screen.queryByTestId('user-data-3')).not.toBeInTheDocument();
    });

    it('returns the correct rows for the second page', () => {
        usePagination.mockReturnValue({
            page: 1,
            setPage: jest.fn(),
            rowsPerPage: 2,
            setRowsPerPage: jest.fn(),
        });
        renderComponent();
        expect(screen.getByTestId('user-data-0')).toHaveTextContent('13:00:00:00:00:00');
        expect(screen.getByTestId('user-data-1')).toHaveTextContent('14:00:00:00:00:00');
        expect(screen.queryByTestId('user-data-3')).not.toBeInTheDocument();
    });

    it('returns no rows if data.usage is empty', () => {
        useUsageByUser.mockReturnValue({
            years: data.years,
            year: 2021,
            setYear: jest.fn(),
            months: data.months,
            month: 'February',
            setMonth: jest.fn(),
            filter: '',
            setFilter: jest.fn(),
            data: { ...data, usage: [] },
            loading: false,
        });
        renderComponent();
        expect(screen.queryByTestId('user-data-0')).not.toBeInTheDocument();
    });

    const data = {
        usage: [
            {
                id: 1,
                IP: fromIPv4('192.168.0.11'),
                MAC: '11:00:00:00:00:00',
                user: 'User11',
                download: 100000,
                upload: 10000,
                total: 110000,
                percent: 1,
                average: 1000,
                days: 1,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 2,
                IP: fromIPv4('192.168.0.12'),
                MAC: '12:00:00:00:00:00',
                user: 'User12',
                download: 200000,
                upload: 20000,
                total: 220000,
                percent: 2,
                average: 2000,
                days: 2,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 3,
                IP: fromIPv4('192.168.0.13'),
                MAC: '13:00:00:00:00:00',
                user: 'User13',
                download: 300000,
                upload: 30000,
                total: 330000,
                percent: 3,
                average: 3000,
                days: 3,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 4,
                IP: fromIPv4('192.168.0.14'),
                MAC: '14:00:00:00:00:00',
                user: 'User14',
                download: 400000,
                upload: 40000,
                total: 440000,
                percent: 4,
                average: 4000,
                days: 4,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 5,
                IP: fromIPv4('192.168.0.15'),
                MAC: '15:00:00:00:00:00',
                user: 'User15',
                download: 500000,
                upload: 50000,
                total: 550000,
                percent: 5,
                average: 5000,
                days: 5,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 6,
                IP: fromIPv4('192.168.0.16'),
                MAC: '16:00:00:00:00:00',
                user: 'User16',
                download: 600000,
                upload: 60000,
                total: 660000,
                percent: 6,
                average: 6000,
                days: 6,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 7,
                IP: fromIPv4('192.168.0.17'),
                MAC: '17:00:00:00:00:00',
                user: 'User17',
                download: 700000,
                upload: 70000,
                total: 770000,
                percent: 7,
                average: 7000,
                days: 7,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 8,
                IP: fromIPv4('192.168.0.18'),
                MAC: '18:00:00:00:00:00',
                user: 'User18',
                download: 800000,
                upload: 80000,
                total: 880000,
                percent: 8,
                average: 8000,
                days: 8,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 9,
                IP: fromIPv4('192.168.0.19'),
                MAC: '19:00:00:00:00:00',
                user: 'User19',
                download: 900000,
                upload: 90000,
                total: 990000,
                percent: 9,
                average: 9000,
                days: 9,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 10,
                IP: fromIPv4('192.168.0.21'),
                MAC: '21:00:00:00:00:00',
                user: 'User21',
                download: 1000000,
                upload: 100000,
                total: 1100000,
                percent: 10,
                average: 10000,
                days: 1,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 11,
                IP: fromIPv4('192.168.0.22'),
                MAC: '22:00:00:00:00:00',
                user: 'User22',
                download: 2000000,
                upload: 200000,
                total: 2200000,
                percent: 20,
                average: 20000,
                days: 2,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 12,
                IP: fromIPv4('192.168.0.23'),
                MAC: '23:00:00:00:00:00',
                user: 'User23',
                download: 3000000,
                upload: 300000,
                total: 3300000,
                percent: 30,
                average: 30000,
                days: 3,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 13,
                IP: fromIPv4('192.168.0.24'),
                MAC: '24:00:00:00:00:00',
                user: 'User24',
                download: 4000000,
                upload: 400000,
                total: 4400000,
                percent: 40,
                average: 40000,
                days: 4,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 14,
                IP: fromIPv4('192.168.0.25'),
                MAC: '25:00:00:00:00:00',
                user: 'User25',
                download: 5000000,
                upload: 500000,
                total: 5500000,
                percent: 50,
                average: 50000,
                days: 5,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 15,
                IP: fromIPv4('192.168.0.26'),
                MAC: '26:00:00:00:00:00',
                user: 'User26',
                download: 6000000,
                upload: 600000,
                total: 6600000,
                percent: 60,
                average: 60000,
                days: 6,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 16,
                IP: fromIPv4('192.168.0.27'),
                MAC: '27:00:00:00:00:00',
                user: 'User27',
                download: 7000000,
                upload: 700000,
                total: 7700000,
                percent: 70,
                average: 70000,
                days: 7,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 17,
                IP: fromIPv4('192.168.0.28'),
                MAC: '28:00:00:00:00:00',
                user: 'User28',
                download: 8000000,
                upload: 800000,
                total: 8800000,
                percent: 80,
                average: 80000,
                days: 8,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 18,
                IP: fromIPv4('192.168.0.29'),
                MAC: '29:00:00:00:00:00',
                user: 'User29',
                download: 9000000,
                upload: 900000,
                total: 9900000,
                percent: 90,
                average: 90000,
                days: 9,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 19,
                IP: fromIPv4('192.168.0.31'),
                MAC: '31:00:00:00:00:00',
                user: 'User31',
                download: 10000000,
                upload: 1000000,
                total: 11000000,
                percent: 100,
                average: 100000,
                days: 1,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 20,
                IP: fromIPv4('192.168.0.32'),
                MAC: '32:00:00:00:00:00',
                user: 'User32',
                download: 20000000,
                upload: 2000000,
                total: 22000000,
                percent: 200,
                average: 200000,
                days: 2,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 21,
                IP: fromIPv4('192.168.0.33'),
                MAC: '33:00:00:00:00:00',
                user: 'User33',
                download: 30000000,
                upload: 3000000,
                total: 33000000,
                percent: 300,
                average: 300000,
                days: 3,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 22,
                IP: fromIPv4('192.168.0.34'),
                MAC: '34:00:00:00:00:00',
                user: 'User34',
                download: 40000000,
                upload: 4000000,
                total: 44000000,
                percent: 400,
                average: 400000,
                days: 4,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 23,
                IP: fromIPv4('192.168.0.35'),
                MAC: '35:00:00:00:00:00',
                user: 'User35',
                download: 50000000,
                upload: 5000000,
                total: 55000000,
                percent: 500,
                average: 500000,
                days: 5,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 24,
                IP: fromIPv4('192.168.0.36'),
                MAC: '36:00:00:00:00:00',
                user: 'User36',
                download: 60000000,
                upload: 6000000,
                total: 66000000,
                percent: 600,
                average: 600000,
                days: 6,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 25,
                IP: fromIPv4('192.168.0.37'),
                MAC: '37:00:00:00:00:00',
                user: 'User37',
                download: 70000000,
                upload: 7000000,
                total: 77000000,
                percent: 700,
                average: 700000,
                days: 7,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 26,
                IP: fromIPv4('192.168.0.38'),
                MAC: '38:00:00:00:00:00',
                user: 'User38',
                download: 80000000,
                upload: 8000000,
                total: 88000000,
                percent: 800,
                average: 800000,
                days: 8,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 27,
                IP: fromIPv4('192.168.0.39'),
                MAC: '39:00:00:00:00:00',
                user: 'User39',
                download: 90000000,
                upload: 9000000,
                total: 99000000,
                percent: 900,
                average: 900000,
                days: 9,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
        ],
        total: { download: 10000000, upload: 1000000, total: 11000000, average: 100000, days: 10 },
        years: [2020, 2021, 2022],
        months: ['January', 'February', 'March'],
        setFilter: jest.fn(),
    };
});
