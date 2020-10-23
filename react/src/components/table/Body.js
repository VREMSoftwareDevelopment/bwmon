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
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Body = ({ prefix, cellInfos, values }) => (
    <TableBody>
        {values.map((value, index) => (
            <TableRow
                key={value.id}
                id={prefix + '-data-' + index}
                style={index % 2 ? { background: 'ghostwhite' } : { background: 'white' }}
            >
                {cellInfos.map((cellInfo) => {
                    return (
                        <TableCell key={cellInfo.id} align={cellInfo.align}>
                            {cellInfo.convert ? cellInfo.convert(value[cellInfo.id]) : value[cellInfo.id]}
                        </TableCell>
                    );
                })}
            </TableRow>
        ))}
    </TableBody>
);

export default Body;
