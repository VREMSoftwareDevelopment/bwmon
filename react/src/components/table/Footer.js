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
 * Bandwidth Monitor
 */

import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

const Footer = ({ prefix, cellInfos, values }) => (
    <TableHead>
        <TableRow key="footer" id={prefix + '-footer'}>
            {cellInfos.map((cellInfo, index) => {
                const text =
                    index === 0
                        ? 'Totals'
                        : cellInfo.footer
                        ? cellInfo.convert
                            ? cellInfo.convert(values[cellInfo.id])
                            : values[cellInfo.id]
                        : '';
                return (
                    <TableCell key={cellInfo.id} align={cellInfo.align}>
                        {text}
                    </TableCell>
                );
            })}
        </TableRow>
    </TableHead>
);

export default Footer;
