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
import { Paper, Table, TableRow, TableHead, TableCell, TableContainer } from '@mui/material';
import Body from '../../components/table/Body';
import CellInfo from '../../components/table/CellInfo';
import DropDown from '../../components/inputs/DropDown';
import Footer from '../../components/table/Footer';
import Header from '../../components/table/Header';
import { toMonth, toPercent, usageInGBytes } from '../../utils/ConversionUtils';
import { comparator, isAscending, sort } from '../../utils/SortUtils';
import useUsageByMonth from '../../hooks/bymonth/UseUsageByMonth';
import { useSortDesc } from '../../hooks/common/UseSort';
import Loading from '../../components/loading/Loading';

const cellInfos = [
    new CellInfo('id', true, 'left', 'Month', false, toMonth),
    new CellInfo('download', false, 'right', 'Down', true, usageInGBytes),
    new CellInfo('upload', false, 'right', 'Up', true, usageInGBytes),
    new CellInfo('total', true, 'right', 'Total', true, usageInGBytes),
    new CellInfo('percent', false, 'right', 'Percent', false, toPercent),
    new CellInfo('average', false, 'right', 'Average', true, usageInGBytes),
    new CellInfo('days', false, 'left', 'Days', true),
];

const UsageByMonth = () => {
    const { years, year, setYear, data, loading } = useUsageByMonth();
    const { ascending, setAscending, orderBy, setOrderBy } = useSortDesc(cellInfos[0].id);

    const handleChangeYear = (event) => setYear(event.target.value);

    const handleRequestSort = (event, property) => {
        setAscending(isAscending(orderBy, property, ascending));
        setOrderBy(property);
    };

    const sortedData = () => sort(data.usage, comparator(ascending, orderBy));

    const displayData = () =>
        data ? (
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={cellInfos.length}>
                            <DropDown
                                data-testid="month-year"
                                id="month-year"
                                onChange={handleChangeYear}
                                items={years}
                                value={year}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <Header
                    prefix="month"
                    cellInfos={cellInfos}
                    onRequestSort={handleRequestSort}
                    ascending={ascending}
                    orderBy={orderBy}
                />
                <Body prefix="month" cellInfos={cellInfos} values={sortedData()} />
                <Footer prefix="month" cellInfos={cellInfos} values={data.total} />
            </Table>
        ) : null;

    return (
        <Paper>
            <Loading isLoading={loading} />
            <TableContainer>{displayData()}</TableContainer>
        </Paper>
    );
};

export default UsageByMonth;
