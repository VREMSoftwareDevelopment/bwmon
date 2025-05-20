/*
 *      Copyright (C) 2010 - 2025 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

const ASCENDING = 'asc';
const DESCENDING = 'desc';

const getDirection = (ascending) => (ascending ? ASCENDING : DESCENDING);
const sortDirection = (orderBy, id, ascending) => (orderBy === id ? getDirection(ascending) : false);
const sortDefaultDirection = (orderBy, id, ascending) => getDirection(ascending || orderBy !== id);
const isActive = (orderBy, id) => orderBy === id;

const SortableCell = ({ prefix, cellInfo, sortHandler, ascending, orderBy }) => (
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

SortableCell.propTypes = {
    prefix: PropTypes.string.isRequired,
    cellInfo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        align: PropTypes.string,
        label: PropTypes.string.isRequired,
        sortable: PropTypes.bool,
    }).isRequired,
    sortHandler: PropTypes.func.isRequired,
    ascending: PropTypes.bool.isRequired,
    orderBy: PropTypes.string.isRequired,
};

const Cell = ({ cellInfo }) => <TableCell align={cellInfo.align}>{cellInfo.label}</TableCell>;

Cell.propTypes = {
    cellInfo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        align: PropTypes.string,
        label: PropTypes.string.isRequired,
        sortable: PropTypes.bool,
    }).isRequired,
};

const Header = ({ prefix, cellInfos, onRequestSort, ascending, orderBy }) => {
    const sortHandler = (property) => (event) => {
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

Header.propTypes = {
    prefix: PropTypes.string.isRequired,
    cellInfos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            align: PropTypes.string,
            label: PropTypes.string.isRequired,
            sortable: PropTypes.bool,
        })
    ).isRequired,
    onRequestSort: PropTypes.func.isRequired,
    ascending: PropTypes.bool.isRequired,
    orderBy: PropTypes.string.isRequired,
};

export { Header, Cell, SortableCell, getDirection, sortDirection, sortDefaultDirection, isActive };

export default Header;
