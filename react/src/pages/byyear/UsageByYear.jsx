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
import { Paper, TableContainer } from '@mui/material';
import CellInfo from '../../components/table/CellInfo';
import UsageTable from '../../components/table/UsageTable';
import { usageInGBytes } from '../../utils/ConversionUtils';
import { comparator, isAscending, sort } from '../../utils/SortUtils';
import useUsageByYear from '../../hooks/byyear/UseUsageByYear';
import { useSortDesc } from '../../hooks/common/UseSort';
import usePagination from '../../hooks/common/UsePagination';
import Loading from '../../components/loading/Loading';

const cellInfos = [
    new CellInfo('id', true, 'left', 'Year', false),
    new CellInfo('download', false, 'right', 'Down', true, usageInGBytes),
    new CellInfo('upload', false, 'right', 'Up', true, usageInGBytes),
    new CellInfo('total', true, 'right', 'Total', true, usageInGBytes),
    new CellInfo('average', false, 'right', 'Average', true, usageInGBytes),
    new CellInfo('days', false, 'left', 'Days', true),
];

const rowsPerPageMin = 20;

const UsageByYear = () => {
    const { data, loading } = useUsageByYear();
    const { page, setPage, rowsPerPage, setRowsPerPage } = usePagination(rowsPerPageMin);
    const { ascending, setAscending, orderBy, setOrderBy } = useSortDesc(cellInfos[0].id);

    const handlePageChange = (event, newPage) => setPage(newPage);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        setAscending(isAscending(orderBy, property, ascending));
        setOrderBy(property);
    };

    const sortedData = () => sort(data, comparator(ascending, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const paginationProps = {
        'data-testid': 'year-pagination-id',
        id: 'year-pagination-id',
        colSpan: cellInfos.length,
        count: data ? data.length : 0,
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
    const bodyProps = { values: data ? sortedData() : [] };
    const displayData = () =>
        data ? (
            <UsageTable
                prefix="year"
                cellInfos={cellInfos}
                columnCount={cellInfos.length}
                paginationProps={paginationProps}
                headerProps={headerProps}
                bodyProps={bodyProps}
                showFooter={false}
            />
        ) : null;

    return (
        <Paper>
            <Loading isLoading={loading} />
            <TableContainer>{displayData()}</TableContainer>
        </Paper>
    );
};

export default UsageByYear;
