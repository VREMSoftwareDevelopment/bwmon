import React, { useEffect } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableContainer } from '@material-ui/core';
import Body from '../../components/table/Body';
import CellInfo from '../../components/table/CellInfo';
import DropDown from '../../components/inputs/DropDown';
import Footer from '../../components/table/Footer';
import Header from '../../components/table/Header';
import Pagination from '../../components/table/Pagination';
import Search from '../../components/inputs/Search';
import { timeToDate, toPercent, usageInGBytes } from '../../utils/ConversionUtils';
import { comparator, sort } from '../../utils/SortUtils';
import useUsageByUser from '../../hooks/byuser/UseUsageByUser';
import useSort from '../../hooks/common/UseSort';
import usePagination from '../../hooks/common/UsePagination';
import Loading from '../../components/loading/Loading';

const cellInfos = [
    new CellInfo('IP', true, 'left', 'IP', false),
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

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleChangeYear = (event) => setYear(event.target.value);

    const handleChangeMonth = (event) => setMonth(event.target.value);

    const handleChangeFilter = (event) => setFilter(event.target.value);

    const handleRequestSort = (event, property) => {
        setAscending(orderBy === property ? !ascending : false);
        setOrderBy(property);
    };

    const values = () => sort(data.usage, comparator(ascending, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    useEffect(() => {
        setPage(0);
    }, [year, month, filter, setPage]);

    const filters = () => (
        <TableHead>
            <TableRow>
                <TableCell>
                    <DropDown id="user-year" onChange={handleChangeYear} items={years} value={year} />
                </TableCell>
                <TableCell>
                    <DropDown id="user-month" onChange={handleChangeMonth} items={months} value={month} />
                </TableCell>
                <TableCell colSpan={2}>
                    <Search id="user-filter" onChange={handleChangeFilter} />
                </TableCell>
                <Pagination
                    colSpan={cellInfos.length - 4}
                    count={data.usage.length}
                    minimum={rowsPerPageMin}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableRow>
        </TableHead>
    );

    return (
        <Paper>
            <Loading isLoading={loading} />
            <TableContainer>
                <Table stickyHeader size="small">
                    {filters()}
                    <Header prefix="user" cellInfos={cellInfos} onRequestSort={handleRequestSort} ascending={ascending} orderBy={orderBy} />
                    <Body prefix="user" cellInfos={cellInfos} values={values()} />
                    <Footer prefix="user" cellInfos={cellInfos} values={data.total} />
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UsageByUser;
