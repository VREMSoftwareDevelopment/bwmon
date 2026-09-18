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

import type { MouseEvent } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import type CellInfo from './CellInfo';

const ASCENDING = 'asc';
const DESCENDING = 'desc';

type Direction = typeof ASCENDING | typeof DESCENDING;

type SortHandler<T> = (property: keyof T & string) => (event: MouseEvent<unknown>) => void;

const getDirection = (ascending: boolean): Direction => (ascending ? ASCENDING : DESCENDING);
const sortDirection = (orderBy: string, id: string, ascending: boolean): Direction | false =>
    orderBy === id ? getDirection(ascending) : false;
const sortDefaultDirection = (orderBy: string, id: string, ascending: boolean): Direction =>
    getDirection(ascending || orderBy !== id);
const isActive = (orderBy: string, id: string): boolean => orderBy === id;

interface SortableCellProps<T extends Record<keyof T, string | number>> {
    prefix: string;
    cellInfo: CellInfo<T>;
    sortHandler: SortHandler<T>;
    ascending: boolean;
    orderBy: string;
}

const SortableCell = <T extends Record<keyof T, string | number>>({
    prefix,
    cellInfo,
    sortHandler,
    ascending,
    orderBy,
}: SortableCellProps<T>) => (
    <TableCell
        data-testid={prefix + '-' + cellInfo.id}
        id={prefix + '-' + cellInfo.id}
        align={cellInfo.align}
        sortDirection={sortDirection(orderBy, cellInfo.id, ascending)}
    >
        <TableSortLabel
            active={isActive(orderBy, cellInfo.id)}
            direction={sortDefaultDirection(orderBy, cellInfo.id, ascending)}
            onClick={sortHandler(cellInfo.id)}
        >
            {cellInfo.label}
        </TableSortLabel>
    </TableCell>
);

interface CellProps<T extends Record<keyof T, string | number>> {
    cellInfo: CellInfo<T>;
}

const Cell = <T extends Record<keyof T, string | number>>({ cellInfo }: CellProps<T>) => (
    <TableCell align={cellInfo.align}>{cellInfo.label}</TableCell>
);

export interface HeaderProps<T extends Record<keyof T, string | number>> {
    prefix: string;
    cellInfos: readonly CellInfo<T>[];
    onRequestSort: (event: MouseEvent<unknown>, property: keyof T & string) => void;
    ascending: boolean;
    orderBy: string;
}

const Header = <T extends Record<keyof T, string | number>>({
    prefix,
    cellInfos,
    onRequestSort,
    ascending,
    orderBy,
}: HeaderProps<T>) => {
    const sortHandler: SortHandler<T> = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow key="header" data-testid={prefix + '-header'} id={prefix + '-header'}>
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

export { Header, Cell, SortableCell, getDirection, sortDirection, sortDefaultDirection, isActive };

export default Header;
