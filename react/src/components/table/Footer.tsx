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

import { TableHead, TableRow, TableCell } from '@mui/material';
import type CellInfo from './CellInfo';

export interface FooterProps<T extends Record<keyof T, string | number>> {
    prefix: string;
    cellInfos: readonly CellInfo<T>[];
    values: Partial<T>;
}

const Footer = <T extends Record<keyof T, string | number>>({ prefix, cellInfos, values }: FooterProps<T>) => {
    const convert = (cellInfo: CellInfo<T>, value: string | number): string | number =>
        cellInfo.convert ? cellInfo.convert(value) : value;

    const cellText = (index: number, cellInfo: CellInfo<T>) => {
        const value = values[cellInfo.id];
        return index === 0 ? 'Totals' : cellInfo.footer && value !== undefined ? convert(cellInfo, value) : '';
    };

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

export default Footer;
