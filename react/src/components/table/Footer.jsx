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
import { TableHead, TableRow, TableCell } from '@mui/material';

const Footer = ({ prefix, cellInfos, values }) => {
    const cellText = (index, cellInfo) =>
        index === 0
            ? 'Totals'
            : cellInfo.footer
              ? cellInfo.convert
                  ? cellInfo.convert(values[cellInfo.id])
                  : values[cellInfo.id]
              : '';

    return (
        <TableHead>
            <TableRow key="footer" data-testid={prefix + '-footer'} id={prefix + '-footer'}>
                {cellInfos.map((cellInfo, index) => {
                    return (
                        <TableCell key={cellInfo.id} align={cellInfo.align}>
                            {cellText(index, cellInfo)}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

Footer.propTypes = {
    prefix: PropTypes.string.isRequired,
    cellInfos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            align: PropTypes.string,
            footer: PropTypes.bool,
            convert: PropTypes.func,
        })
    ).isRequired,
    values: PropTypes.object.isRequired,
};

export default Footer;
