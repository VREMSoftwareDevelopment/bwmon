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

import React, { useEffect } from 'react';
import { Paper, TableCell, TableContainer } from '@mui/material';
import { CellInfo, DropDown, Loading, Search, UsageTable } from '@components';
import { timeToDate, toIPv4, toPercent, usageInGBytes, comparator, isAscending, sort } from '@utils';
import { useSortAsc, usePagination } from '@hooks';
import { useUsageByUser } from '.';

const cellInfos = [
    new CellInfo('IP', true, 'left', 'IP', false, toIPv4),
    new CellInfo('MAC', true, 'left', 'MAC', false),
    new CellInfo('user', true, 'left', 'User', false),
    new CellInfo('download', false, 'right', 'Down', true, usageInGBytes),
    new CellInfo('upload', false, 'right', 'Up', true, usageInGBytes),
    new CellInfo('total', true, 'right', 'Total', true, usageInGBytes),
    new CellInfo('percent', false, 'right', 'Percent', false, toPercent),
    new CellInfo('average', false, 'right', 'Average', true, usageInGBytes),
    new CellInfo('days', false, 'left', 'Days', true),
    new CellInfo('firstSeen', false, 'left', 'First Seen', false, timeToDate),
    new CellInfo('lastSeen', false, 'left', 'Last Seen', false, timeToDate),
];

const rowsPerPageMin = 20;

const UsageByUser = () => {
    const { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading } = useUsageByUser();
    const { page, setPage, rowsPerPage, setRowsPerPage } = usePagination(rowsPerPageMin);
    const { ascending, setAscending, orderBy, setOrderBy } = useSortAsc(cellInfos[0].id);

    const handlePageChange = (event, newPage) => setPage(newPage);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleChangeYear = (event) => setYear(event.target.value);

    const handleChangeMonth = (event) => setMonth(event.target.value);

    const handleChangeFilter = (event) => setFilter(event.target.value);

    const handleRequestSort = (event, property) => {
        setAscending(isAscending(orderBy, property, ascending));
        setOrderBy(property);
    };

    useEffect(() => {
        setPage(0);
    }, [year, month, filter, setPage]);

    const sortedData = () =>
        sort(data.usage, comparator(ascending, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const columnCount = () => cellInfos.length - 4;

    const paginationProps = {
        'data-testid': 'user-pagination-id',
        id: 'user-pagination-id',
        colSpan: columnCount(),
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
    const bodyProps = { values: data && data.usage ? sortedData() : [] };
    const footerProps = { values: data && data.total ? data.total : {} };
    const displayData = () =>
        data ? (
            <UsageTable
                prefix="user"
                cellInfos={cellInfos}
                columnCount={columnCount()}
                paginationProps={paginationProps}
                headerProps={headerProps}
                bodyProps={bodyProps}
                footerProps={footerProps}
                showFooter={true}
            />
        ) : null;

    return (
        <Paper>
            <Loading isLoading={loading} />
            <TableContainer>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
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
