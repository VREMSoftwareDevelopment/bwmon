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
import { usePagination, useSortDesc } from '@hooks';
import { useUsageByYear } from '@features/byyear';
import UsageByYear from './UsageByYear';

jest.mock('@features/byyear/UseUsageByYear');
jest.mock('@hooks/UsePagination');
jest.mock('@hooks/UseSort');

describe('UsageByYear', () => {
    const data = [
        { id: '2001', download: 100000, upload: 10000, total: 110000, average: 1000, days: 1 },
        { id: '2002', download: 200000, upload: 20000, total: 220000, average: 2000, days: 2 },
        { id: '2003', download: 300000, upload: 30000, total: 330000, average: 3000, days: 3 },
        { id: '2004', download: 400000, upload: 40000, total: 440000, average: 4000, days: 4 },
        { id: '2005', download: 500000, upload: 50000, total: 550000, average: 5000, days: 5 },
        { id: '2006', download: 600000, upload: 60000, total: 660000, average: 6000, days: 6 },
        { id: '2007', download: 700000, upload: 70000, total: 770000, average: 7000, days: 7 },
        { id: '2008', download: 800000, upload: 80000, total: 880000, average: 8000, days: 8 },
        { id: '2009', download: 900000, upload: 90000, total: 990000, average: 9000, days: 9 },
        { id: '2010', download: 1000000, upload: 100000, total: 1100000, average: 10000, days: 10 },
        { id: '2011', download: 1000000, upload: 100000, total: 1100000, average: 11000, days: 11 },
        { id: '2012', download: 2000000, upload: 200000, total: 2200000, average: 22000, days: 12 },
        { id: '2013', download: 3000000, upload: 300000, total: 3300000, average: 33000, days: 13 },
        { id: '2014', download: 4000000, upload: 400000, total: 4400000, average: 44000, days: 14 },
        { id: '2015', download: 5000000, upload: 500000, total: 5500000, average: 55000, days: 15 },
        { id: '2016', download: 6000000, upload: 600000, total: 6600000, average: 66000, days: 16 },
        { id: '2017', download: 7000000, upload: 700000, total: 7700000, average: 77000, days: 17 },
        { id: '2018', download: 8000000, upload: 800000, total: 8800000, average: 88000, days: 18 },
        { id: '2019', download: 9000000, upload: 900000, total: 9900000, average: 99000, days: 19 },
        { id: '2020', download: 10000000, upload: 1000000, total: 11000000, average: 100000, days: 20 },
        { id: '2021', download: 10000000, upload: 1000000, total: 11000000, average: 110000, days: 21 },
        { id: '2022', download: 20000000, upload: 2000000, total: 22000000, average: 220000, days: 22 },
        { id: '2023', download: 30000000, upload: 3000000, total: 33000000, average: 330000, days: 23 },
        { id: '2024', download: 40000000, upload: 4000000, total: 44000000, average: 440000, days: 24 },
        { id: '2025', download: 50000000, upload: 5000000, total: 55000000, average: 550000, days: 25 },
        { id: '2026', download: 60000000, upload: 6000000, total: 66000000, average: 660000, days: 26 },
        { id: '2027', download: 70000000, upload: 7000000, total: 77000000, average: 770000, days: 27 },
        { id: '2028', download: 80000000, upload: 8000000, total: 88000000, average: 880000, days: 28 },
        { id: '2029', download: 90000000, upload: 9000000, total: 99000000, average: 990000, days: 29 },
    ];

    beforeEach(() => {
        useUsageByYear.mockReturnValue({ data: data, loading: false });
        useSortDesc.mockReturnValue({
            ascending: true,
            setAscending: jest.fn(),
            orderBy: 'id',
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
                <UsageByYear {...props} />
            </ThemeProvider>
        );

    it('renders loading state', () => {
        useUsageByYear.mockReturnValue({ data: null, loading: true });
        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByTestId('year-header')).not.toBeInTheDocument();
    });

    it('renders error state', () => {
        useUsageByYear.mockReturnValue({ data: null, loading: false, error: 'Failed to load data' });
        renderComponent();
        expect(screen.getByText('Failed to load data')).toBeInTheDocument();
        expect(screen.queryByTestId('year-header')).not.toBeInTheDocument();
    });

    it('renders table header', () => {
        renderComponent();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
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
        expect(getByText('2001')).toBeInTheDocument();
        expect(getByText('0.100')).toBeInTheDocument();
        expect(getByText('0.010')).toBeInTheDocument();
        expect(getByText('0.110')).toBeInTheDocument();
        expect(getByText('0.010')).toBeInTheDocument();
    });

    it('renders table body row 20', () => {
        renderComponent();
        const container = screen.getByTestId('year-data-19');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('2020')).toBeInTheDocument();
        expect(getByText('10.000')).toBeInTheDocument();
        expect(getByText('1.000')).toBeInTheDocument();
        expect(getByText('11.000')).toBeInTheDocument();
        expect(getByText('0.100')).toBeInTheDocument();
    });

    it('does not render table body row 21', () => {
        renderComponent();
        const container = screen.queryByTestId('year-data-20');
        expect(container).not.toBeInTheDocument();
    });

    it('renders pagination', () => {
        renderComponent();
        const container = screen.getByTestId('year-pagination-id');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('1–20 of 29')).toBeInTheDocument();
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
        fireEvent.change(container, { target: { value: '29' } });
        expect(usePagination().setRowsPerPage).toHaveBeenCalledWith(29);
    });

    it('handles sort request by year', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Year'));
        expect(useSortDesc().setAscending).toHaveBeenCalled();
        expect(useSortDesc().setOrderBy).toHaveBeenCalledWith('id');
    });

    it('handles sort request by total', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Total'));
        expect(useSortDesc().setAscending).toHaveBeenCalled();
        expect(useSortDesc().setOrderBy).toHaveBeenCalledWith('total');
    });

    it('renders sorted and paginated data (sortedData)', () => {
        useSortDesc.mockReturnValue({
            ascending: true,
            setAscending: jest.fn(),
            orderBy: 'id',
            setOrderBy: jest.fn(),
        });
        usePagination.mockReturnValue({
            page: 0,
            setPage: jest.fn(),
            rowsPerPage: 5,
            setRowsPerPage: jest.fn(),
        });
        renderComponent();
        for (let i = 0; i < 5; i++) {
            expect(screen.getByTestId(`year-data-${i}`)).toHaveTextContent((2001 + i).toString());
        }
        expect(screen.queryByTestId('year-data-5')).not.toBeInTheDocument();
    });

    it('renders sorted and paginated data (sortedData, descending)', () => {
        useSortDesc.mockReturnValue({
            ascending: false,
            setAscending: jest.fn(),
            orderBy: 'id',
            setOrderBy: jest.fn(),
        });
        usePagination.mockReturnValue({
            page: 0,
            setPage: jest.fn(),
            rowsPerPage: 3,
            setRowsPerPage: jest.fn(),
        });
        renderComponent();
        expect(screen.getByTestId('year-data-0')).toHaveTextContent('2029');
        expect(screen.getByTestId('year-data-1')).toHaveTextContent('2028');
        expect(screen.getByTestId('year-data-2')).toHaveTextContent('2027');
        expect(screen.queryByTestId('year-data-3')).not.toBeInTheDocument();
    });

    it('renders sorted and paginated data (sortedData, sort by total)', () => {
        useSortDesc.mockReturnValue({
            ascending: true,
            setAscending: jest.fn(),
            orderBy: 'total',
            setOrderBy: jest.fn(),
        });
        usePagination.mockReturnValue({
            page: 1,
            setPage: jest.fn(),
            rowsPerPage: 2,
            setRowsPerPage: jest.fn(),
        });
        renderComponent();
        expect(screen.getByTestId('year-data-0')).toHaveTextContent('2003');
        expect(screen.getByTestId('year-data-1')).toHaveTextContent('2004');
        expect(screen.queryByTestId('year-data-2')).not.toBeInTheDocument();
    });
});
