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

import React, { useEffect } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableContainer } from '@mui/material';
import Body from '../../components/table/Body';
import CellInfo from '../../components/table/CellInfo';
import DropDown from '../../components/inputs/DropDown';
import Footer from '../../components/table/Footer';
import Header from '../../components/table/Header';
import Pagination from '../../components/table/Pagination';
import Search from '../../components/inputs/Search';
import { timeToDate, toIPv4, toPercent, usageInGBytes } from '../../utils/ConversionUtils';
import { comparator, isAscending, sort } from '../../utils/SortUtils';
import useUsageByUser from '../../hooks/byuser/UseUsageByUser';
import useSort from '../../hooks/common/UseSort';
import usePagination from '../../hooks/common/UsePagination';
import Loading from '../../components/loading/Loading';

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

const rowsPerPageMin = 12;

const UsageByUser = () => {
    const { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading } = useUsageByUser();
    const { page, setPage, rowsPerPage, setRowsPerPage } = usePagination(rowsPerPageMin);
    const { ascending, setAscending, orderBy, setOrderBy } = useSort(true, cellInfos[0].id);

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

    const displayData = () =>
        data ? (
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <DropDown
                                data-testid="user-year"
                                id="user-year"
                                onChange={handleChangeYear}
                                items={years}
                                value={year}
                            />
                        </TableCell>
                        <TableCell>
                            <DropDown
                                data-testid="user-month"
                                id="user-month"
                                onChange={handleChangeMonth}
                                items={months}
                                value={month}
                            />
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Search data-testid="user-filter" id="user-filter" onChange={handleChangeFilter} />
                        </TableCell>
                        <Pagination
                            colSpan={cellInfos.length - 4}
                            count={data.usage.length}
                            minimum={rowsPerPageMin}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </TableRow>
                </TableHead>
                <Header
                    prefix="user"
                    cellInfos={cellInfos}
                    onRequestSort={handleRequestSort}
                    ascending={ascending}
                    orderBy={orderBy}
                />
                <Body
                    prefix="user"
                    cellInfos={cellInfos}
                    values={sort(data.usage, comparator(ascending, orderBy)).slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                    )}
                />
                <Footer prefix="user" cellInfos={cellInfos} values={data.total} />
            </Table>
        ) : null;

    return (
        <Paper>
            <Loading isLoading={loading} />
            <TableContainer>{displayData()}</TableContainer>
        </Paper>
    );
};

export default UsageByUser;
