import React from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';

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
