import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Body = ({ prefix, cellInfos, values }) => (
    <TableBody>
        {values.map((value, index) => (
            <TableRow key={value.id} id={prefix + '-data-' + index}>
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
