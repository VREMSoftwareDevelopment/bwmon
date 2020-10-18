import React from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableContainer } from '@material-ui/core';
import Body from '../../components/table/Body';
import CellInfo from '../../components/table/CellInfo';
import DropDown from '../../components/inputs/DropDown';
import Footer from '../../components/table/Footer';
import Header from '../../components/table/Header';
import { toMonth, toPercent, usageInGBytes } from '../../utils/ConversionUtils';
import { comparator, sort } from '../../utils/SortUtils';
import useUsageByMonth from '../../hooks/bymonth/UseUsageByMonth';
import useSort from '../../hooks/common/UseSort';
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
    const { ascending, setAscending, orderBy, setOrderBy } = useSort(false, cellInfos[0].id);

    const handleChangeYear = (event) => setYear(event.target.value);

    const handleRequestSort = (event, property) => {
        setAscending(orderBy === property ? !ascending : false);
        setOrderBy(property);
    };

    const displayData = () =>
        data ? (
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={cellInfos.length}>
                            <DropDown id="month-year" onChange={handleChangeYear} items={years} value={year} />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <Header prefix="month" cellInfos={cellInfos} onRequestSort={handleRequestSort} ascending={ascending} orderBy={orderBy} />
                <Body prefix="month" cellInfos={cellInfos} values={sort(data.usage, comparator(ascending, orderBy))} />
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