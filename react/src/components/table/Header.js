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
