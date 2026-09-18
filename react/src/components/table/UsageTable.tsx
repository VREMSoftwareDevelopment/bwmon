/*
 *      Copyright (C) 2010 - 2026 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import { Table, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';
import type { PaginationProps } from './Pagination';
import Header from './Header';
import type { HeaderProps } from './Header';
import Body from './Body';
import type { BodyProps } from './Body';
import Footer from './Footer';
import type { FooterProps } from './Footer';
import type CellInfo from './CellInfo';

export interface UsageTableProps<T extends Record<keyof T, string | number> & { id: string | number }> {
    prefix: string;
    cellInfos: readonly CellInfo<T>[];
    paginationProps: PaginationProps;
    headerProps: Omit<HeaderProps<T>, 'prefix' | 'cellInfos'>;
    bodyProps: Omit<BodyProps<T>, 'prefix' | 'cellInfos'>;
    footerProps?: Omit<FooterProps<T>, 'prefix' | 'cellInfos'>;
    showFooter: boolean;
}

const UsageTable = <T extends Record<keyof T, string | number> & { id: string | number }>({
    prefix,
    cellInfos,
    paginationProps,
    headerProps,
    bodyProps,
    footerProps,
    showFooter,
}: UsageTableProps<T>) => (
    <Table stickyHeader size="small">
        <TableHead>
            <TableRow>
                <Pagination {...paginationProps} />
            </TableRow>
        </TableHead>
        <Header prefix={prefix} cellInfos={cellInfos} {...headerProps} />
        <Body prefix={prefix} cellInfos={cellInfos} {...bodyProps} />
        {showFooter && footerProps && <Footer prefix={prefix} cellInfos={cellInfos} {...footerProps} />}
    </Table>
);

export default UsageTable;
