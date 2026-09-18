/*
 *      Copyright (C) 2010 - 2026 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import { useEffect, useMemo } from 'react';
import type { ChangeEvent, ChangeEventHandler, MouseEvent } from 'react';
import { Paper, TableContainer } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { CellInfo, DropDown, ErrorMessage, Loading, Search, UsageTable } from '@components';
import type { Data, UsageWithPercent } from '@services';
import { timeToDate, toIPv4, toPercent, usageInGBytes, comparator, isAscending, sort } from '@utils';
import { useSortAsc, usePagination } from '@hooks';
import { useUsageByUser } from '.';

type UserRow = UsageWithPercent<Data>;

const ipCell = new CellInfo<UserRow>('IP', true, 'left', 'IP', false, toIPv4);

const cellInfos: CellInfo<UserRow>[] = [
    ipCell,
    new CellInfo<UserRow>('MAC', true, 'left', 'MAC', false),
    new CellInfo<UserRow>('user', true, 'left', 'User', false),
    new CellInfo<UserRow>('download', false, 'right', 'Down', true, usageInGBytes),
    new CellInfo<UserRow>('upload', false, 'right', 'Up', true, usageInGBytes),
    new CellInfo<UserRow>('total', true, 'right', 'Total', true, usageInGBytes),
    new CellInfo<UserRow>('percent', false, 'right', 'Percent', false, toPercent),
    new CellInfo<UserRow>('average', false, 'right', 'Average', true, usageInGBytes),
    new CellInfo<UserRow>('days', false, 'left', 'Days', true),
    new CellInfo<UserRow>('firstSeen', false, 'left', 'First Seen', false, timeToDate),
    new CellInfo<UserRow>('lastSeen', false, 'left', 'Last Seen', false, timeToDate),
];

const rowsPerPageMin = 20;

const toolbarStyle = { display: 'flex', gap: '1rem', padding: '8px 16px' };

const UsageByUser = () => {
    const { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading, error } = useUsageByUser();
    const { page, setPage, rowsPerPage, setRowsPerPage } = usePagination(rowsPerPageMin);
    const { ascending, setAscending, orderBy, setOrderBy } = useSortAsc(ipCell.id);

    const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);

    const handleRowsPerPageChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleChangeYear = (event: SelectChangeEvent<number>) => setYear(event.target.value);

    const handleChangeMonth = (event: SelectChangeEvent<string>) => setMonth(event.target.value);

    const handleChangeFilter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(event.target.value);

    const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
        setAscending(isAscending(orderBy, property, ascending));
        setOrderBy(property);
    };

    useEffect(() => {
        setPage(0);
    }, [year, month, filter, setPage]);

    const sortedData = useMemo(
        () => (data?.usage ? sort(data.usage, comparator<UserRow>(ascending, orderBy)) : []),
        [data?.usage, ascending, orderBy]
    );

    const paginatedData = useMemo(
        () => sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [sortedData, page, rowsPerPage]
    );

    const paginationProps = {
        'data-testid': 'user-pagination-id',
        id: 'user-pagination-id',
        count: data && data.usage ? data.usage.length : 0,
        minimum: rowsPerPageMin,
        rowsPerPage,
        page,
        onPageChange: handlePageChange,
        onRowsPerPageChange: handleRowsPerPageChange,
    };
    const headerProps = {
        onRequestSort: handleRequestSort,
        ascending,
        orderBy,
    };
    const bodyProps = { values: paginatedData };
    const displayData = () =>
        data ? (
            <UsageTable
                prefix="user"
                cellInfos={cellInfos}
                paginationProps={paginationProps}
                headerProps={headerProps}
                bodyProps={bodyProps}
                footerProps={{ values: data.total }}
                showFooter={true}
            />
        ) : null;

    return (
        <Paper>
            <Loading isLoading={loading} />
            {error && <ErrorMessage message={error} />}
            <TableContainer>
                <div style={toolbarStyle}>
                    <DropDown data-testid="user-year" id="user-year" onChange={handleChangeYear} items={years} value={year} />
                    <DropDown data-testid="user-month" id="user-month" onChange={handleChangeMonth} items={months} value={month} />
                    <Search data-testid="user-filter" id="user-filter" onChange={handleChangeFilter} />
                </div>
                {displayData()}
            </TableContainer>
        </Paper>
    );
};

export default UsageByUser;
