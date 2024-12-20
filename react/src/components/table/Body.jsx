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
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';

const Body = ({ prefix, cellInfos, values }) => (
    <TableBody>
        {values.map((value, index) => (
            <TableRow
                key={value.id}
                id={prefix + '-data-' + index}
                data-testid={prefix + '-data-' + index}
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

Body.propTypes = {
    prefix: PropTypes.string.isRequired,
    cellInfos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            align: PropTypes.string,
            convert: PropTypes.func
        })
    ).isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Body;
