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
import UsageByUser from './UsageByUser';
import useUsageByUser from '../../hooks/byuser/UseUsageByUser';
import useSort from '../../hooks/common/UseSort';
import Search from '../../components/inputs/Search';
import { fromIPv4 } from '../../utils/ConversionUtils';

jest.mock('../../components/inputs/Search');
jest.mock('../../hooks/byuser/UseUsageByUser');
jest.mock('../../hooks/common/UseSort');

describe('UsageByUser', () => {
    const data = {
        usage: [
            {
                id: 1,
                IP: fromIPv4('192.168.0.1'),
                MAC: '00:0a:95:9d:68:10',
                user: 'User1',
                download: 110000,
                upload: 120000,
                total: 130000,
                percent: 14,
                average: 150000,
                days: 10,
                firstSeen: 1320184802,
                lastSeen: 1322701201,
            },
            {
                id: 2,
                IP: fromIPv4('192.168.0.2'),
                MAC: '00:0a:95:9d:68:16',
                user: 'User2',
                download: 210000,
                upload: 220000,
                total: 230000,
                percent: 24,
                average: 250000,
                days: 20,
                firstSeen: 1320519602,
                lastSeen: 1322361007,
            },
        ],
        total: { download: 310000, upload: 320000, total: 330000, average: 340000, days: 30 },
        years: [2020, 2021, 2022],
        months: ['January', 'February', 'March'],
        setFilter: jest.fn(),
    };

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

        useSort.mockReturnValue({
            ascending: true,
            setAscending: jest.fn(),
            orderBy: 'IP',
            setOrderBy: jest.fn(),
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

    it('renders table header', () => {
        renderComponent();
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
        expect(getByText('192.168.0.1')).toBeInTheDocument();
        expect(getByText('00:0a:95:9d:68:10')).toBeInTheDocument();
        expect(getByText('User1')).toBeInTheDocument();
        expect(getByText('0.110')).toBeInTheDocument();
        expect(getByText('0.120')).toBeInTheDocument();
        expect(getByText('0.130')).toBeInTheDocument();
        expect(getByText('14.0%')).toBeInTheDocument();
        expect(getByText('0.150')).toBeInTheDocument();
        expect(getByText('10')).toBeInTheDocument();
    });

    it('renders table body row 2', () => {
        renderComponent();
        const container = screen.getByTestId('user-data-1');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('192.168.0.2')).toBeInTheDocument();
        expect(getByText('00:0a:95:9d:68:16')).toBeInTheDocument();
        expect(getByText('User2')).toBeInTheDocument();
        expect(getByText('0.210')).toBeInTheDocument();
        expect(getByText('0.220')).toBeInTheDocument();
        expect(getByText('0.230')).toBeInTheDocument();
        expect(getByText('24.0%')).toBeInTheDocument();
        expect(getByText('0.250')).toBeInTheDocument();
        expect(getByText('20')).toBeInTheDocument();
    });

    it('renders table footer', () => {
        renderComponent();
        const container = screen.getByTestId('user-footer');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('Totals')).toBeInTheDocument();
        expect(getByText('0.310')).toBeInTheDocument();
        expect(getByText('0.320')).toBeInTheDocument();
        expect(getByText('0.330')).toBeInTheDocument();
        expect(getByText('0.340')).toBeInTheDocument();
        expect(getByText('30')).toBeInTheDocument();
    });

    it('handles sort by IP', () => {
        renderComponent();
        fireEvent.click(screen.getByText('IP'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('IP');
    });

    it('handles sort by MAC', () => {
        renderComponent();
        fireEvent.click(screen.getByText('MAC'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('MAC');
    });

    it('handles sort by USER', () => {
        renderComponent();
        fireEvent.click(screen.getByText('User'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('user');
    });

    it('handles sort by Total', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Total'));
        expect(useSort().setAscending).toHaveBeenCalled();
        expect(useSort().setOrderBy).toHaveBeenCalledWith('total');
    });

    it('renders with year selector', () => {
        renderComponent();
        const container = screen.getByTestId('user-year');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('2021')).toBeInTheDocument();
    });

    it('renders with month selector', () => {
        renderComponent();
        const container = screen.getByTestId('user-month');
        expect(container).toBeInTheDocument();
        const { getByText } = within(container);
        expect(getByText('February')).toBeInTheDocument();
    });

    it('handles user filter change', () => {
        Search.mockImplementation(({ onChange }) => <input data-testid="user-filter" onChange={onChange} />);
        renderComponent();
        fireEvent.change(screen.getByTestId('user-filter'), { target: { value: 'John' } });
        expect(useUsageByUser().setFilter).toHaveBeenCalledWith('John');
    });
});
