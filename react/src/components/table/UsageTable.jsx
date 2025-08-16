import React from 'react';
import { Table, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const UsageTable = ({ prefix, cellInfos, columnCount, paginationProps, headerProps, bodyProps, footerProps, showFooter }) => (
    <Table stickyHeader size="small">
        <TableHead>
            <TableRow>
                <Pagination {...paginationProps} />
            </TableRow>
        </TableHead>
        <Header prefix={prefix} cellInfos={cellInfos} {...headerProps} />
        <Body prefix={prefix} cellInfos={cellInfos} {...bodyProps} />
        {showFooter && <Footer prefix={prefix} cellInfos={cellInfos} {...footerProps} />}
    </Table>
);

export default UsageTable;
