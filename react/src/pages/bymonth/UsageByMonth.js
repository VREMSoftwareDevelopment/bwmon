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
import Error from '../../components/messages/Error';

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
    const { years, year, setYear, data, loading, error } = useUsageByMonth();
    const { ascending, setAscending, orderBy, setOrderBy } = useSort(false, cellInfos[0].id);

    const handleChangeYear = (event) => setYear(event.target.value);

    const handleRequestSort = (event, property) => {
        setAscending(orderBy === property ? !ascending : false);
        setOrderBy(property);
    };

    const values = () => sort(data.usage, comparator(ascending, orderBy));

    const filters = () => (
        <TableHead>
            <TableRow>
                <TableCell colSpan={cellInfos.length}>
                    <DropDown id="month-year" onChange={handleChangeYear} items={years} value={year} />
                </TableCell>
            </TableRow>
        </TableHead>
    );

    return (
        <Paper>
            <Error message={error} />
            <Loading isLoading={loading} />
            <TableContainer>
                <Table stickyHeader size="small">
                    {filters()}
                    <Header
                        prefix="month"
                        cellInfos={cellInfos}
                        onRequestSort={handleRequestSort}
                        ascending={ascending}
                        orderBy={orderBy}
                    />
                    <Body prefix="month" cellInfos={cellInfos} values={values()} />
                    <Footer prefix="month" cellInfos={cellInfos} values={data.total} />
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UsageByMonth;
