/*
 *      Copyright (C) 2010 - 2020 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
 * Bandwidth Usage Monitor
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const Header = ({ prefix, cellInfos, onRequestSort, ascending, orderBy }) => {
    const classes = useStyles();
    const sortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow key={'header'}>
                {cellInfos.map((cellInfo) => {
                    if (cellInfo.sortable) {
                        const direction = ascending ? 'asc' : 'desc';
                        return (
                            <TableCell
                                id={prefix + '-' + cellInfo.id}
                                key={cellInfo.id}
                                align={cellInfo.align}
                                sortDirection={orderBy === cellInfo.id ? direction : false}
                            >
                                <TableSortLabel
                                    active={orderBy === cellInfo.id}
                                    direction={orderBy === cellInfo.id ? direction : 'asc'}
                                    onClick={sortHandler(cellInfo.id)}
                                >
                                    {cellInfo.label}
                                    {orderBy === cellInfo.id ? (
                                        <span className={classes.visuallyHidden}>
                                            {direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        );
                    } else {
                        return (
                            <TableCell key={cellInfo.id} align={cellInfo.align}>
                                {cellInfo.label}
                            </TableCell>
                        );
                    }
                })}
            </TableRow>
        </TableHead>
    );
};

export default Header;
