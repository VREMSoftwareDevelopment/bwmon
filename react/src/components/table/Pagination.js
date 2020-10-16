import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TablePagination, IconButton } from '@material-ui/core';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
    },
}));

const Actions = ({ count, page, rowsPerPage, onChangePage }) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
                {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
            </IconButton>
        </div>
    );
};

const rowsPerPageOptions = (rowsPerPage, count) => {
    let rowsPerPageOptions = [rowsPerPage];
    if (count > rowsPerPage) {
        for (let i = rowsPerPage * 2; i < count; i = i * 2) {
            rowsPerPageOptions.push(i);
        }
        rowsPerPageOptions.push(count);
    }
    return rowsPerPageOptions;
};

const Pagination = (props) => {
    const options = rowsPerPageOptions(Math.min(props.minimum, props.count), props.count);
    return (
        <TablePagination
            {...props}
            rowsPerPageOptions={options}
            SelectProps={{ inputProps: { 'aria-label': 'rows per page' }, native: true }}
            ActionsComponent={Actions}
        />
    );
};

export default Pagination;
