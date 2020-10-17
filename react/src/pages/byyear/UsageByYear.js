import React from 'react';
import { Paper, Table, TableRow, TableHead, TableContainer } from '@material-ui/core';
import Body from '../../components/table/Body';
import CellInfo from '../../components/table/CellInfo';
import Header from '../../components/table/Header';
import Pagination from '../../components/table/Pagination';
import { usageInGBytes } from '../../utils/ConversionUtils';
import { comparator, sort } from '../../utils/SortUtils';
import useUsageByYear from '../../hooks/byyear/UseUsageByYear';
import useSort from '../../hooks/common/UseSort';
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

const rowsPerPageMin = 12;

const UsageByYear = () => {
    const { data, loading } = useUsageByYear();
    const { page, setPage, rowsPerPage, setRowsPerPage } = usePagination(rowsPerPageMin);
    const { ascending, setAscending, orderBy, setOrderBy } = useSort(false, cellInfos[0].id);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        setAscending(orderBy === property ? !ascending : false);
        setOrderBy(property);
    };

    const values = () => sort(data, comparator(ascending, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const filters = () => (
        <TableHead>
            <TableRow>
                <Pagination
                    colSpan={cellInfos.length}
                    count={data.length}
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
                    <Header prefix="year" cellInfos={cellInfos} onRequestSort={handleRequestSort} ascending={ascending} orderBy={orderBy} />
                    <Body prefix="year" cellInfos={cellInfos} values={values()} />
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UsageByYear;
