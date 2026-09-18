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

import { useMemo } from 'react';
import type { MouseEvent } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableContainer } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Body, CellInfo, DropDown, ErrorMessage, Loading, TableFooter as Footer, TableHeader as Header } from '@components';
import type { UsageSummary, UsageWithPercent } from '@services';
import { toMonth, toPercent, usageInGBytes, comparator, isAscending, sort } from '@utils';
import { useSortDesc } from '@hooks';
import { useUsageByMonth } from '.';

type MonthRow = UsageWithPercent<UsageSummary>;

const monthCell = new CellInfo<MonthRow>('id', true, 'left', 'Month', false, toMonth);

const cellInfos: CellInfo<MonthRow>[] = [
    monthCell,
    new CellInfo<MonthRow>('download', false, 'right', 'Down', true, usageInGBytes),
    new CellInfo<MonthRow>('upload', false, 'right', 'Up', true, usageInGBytes),
    new CellInfo<MonthRow>('total', true, 'right', 'Total', true, usageInGBytes),
    new CellInfo<MonthRow>('percent', false, 'right', 'Percent', false, toPercent),
    new CellInfo<MonthRow>('average', false, 'right', 'Average', true, usageInGBytes),
    new CellInfo<MonthRow>('days', false, 'left', 'Days', true),
];

const UsageByMonth = () => {
    const { years, year, setYear, data, loading, error } = useUsageByMonth();
    const { ascending, setAscending, orderBy, setOrderBy } = useSortDesc(monthCell.id);

    const handleChangeYear = (event: SelectChangeEvent<number>) => setYear(event.target.value);

    const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
        setAscending(isAscending(orderBy, property, ascending));
        setOrderBy(property);
    };

    const sortedData = useMemo(
        () => (data?.usage ? sort(data.usage, comparator<MonthRow>(ascending, orderBy)) : []),
        [data?.usage, ascending, orderBy]
    );

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
                <Body prefix="month" cellInfos={cellInfos} values={sortedData} />
                <Footer prefix="month" cellInfos={cellInfos} values={data.total} />
            </Table>
        ) : null;

    return (
        <Paper>
            <Loading isLoading={loading} />
            {error && <ErrorMessage message={error} />}
            <TableContainer>{displayData()}</TableContainer>
        </Paper>
    );
};

export default UsageByMonth;
