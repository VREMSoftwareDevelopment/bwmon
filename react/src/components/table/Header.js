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
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

const SortableCell = ({ prefix, cellInfo, sortHandler, ascending, orderBy }) => {
    const direction = ascending ? 'asc' : 'desc';
    const sortDirection = (orderBy, id) => (orderBy === id ? direction : false);
    const defaultDirection = (orderBy, id) => (orderBy === id ? direction : 'asc');

    return (
        <TableCell
            data-testid={prefix + '-' + cellInfo.id}
            id={prefix + '-' + cellInfo.id}
            align={cellInfo.align}
            sortDirection={sortDirection(orderBy, cellInfo.id)}
        >
            <TableSortLabel
                active={orderBy === cellInfo.id}
                direction={defaultDirection(orderBy, cellInfo.id)}
                onClick={sortHandler(cellInfo.id)}
            >
                {cellInfo.label}
            </TableSortLabel>
        </TableCell>
    );
};

const Cell = ({ cellInfo }) => <TableCell align={cellInfo.align}>{cellInfo.label}</TableCell>;

const Header = ({ prefix, cellInfos, onRequestSort, ascending, orderBy }) => {
    const sortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow key={'header'}>
                {cellInfos.map((cellInfo) => {
                    return cellInfo.sortable ? (
                        <SortableCell
                            key={cellInfo.id}
                            prefix={prefix}
                            cellInfo={cellInfo}
                            sortHandler={sortHandler}
                            ascending={ascending}
                            orderBy={orderBy}
                        ></SortableCell>
                    ) : (
                        <Cell key={cellInfo.id} cellInfo={cellInfo} />
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

export default Header;
