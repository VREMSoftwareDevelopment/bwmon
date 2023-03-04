/*
 *      Copyright (C) 2010 - 2023 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { makeStyles, useTheme } from '@mui/styles';
import { TablePagination, IconButton } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
    },
}));

const lastPage = (count, rowsPerPage) => Math.ceil(count / rowsPerPage) - 1;

const isRTL = (theme) => {
    return theme.direction === 'rtl';
};

const isFirstPage = (page) => {
    return page === 0;
};

const isLastPage = (page, count, rowsPerPage) => {
    return page >= lastPage(count, rowsPerPage);
};

const FirstPageAction = ({ page, onPageChange }) => {
    const theme = useTheme();

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    return (
        <IconButton onClick={handleFirstPageButtonClick} disabled={isFirstPage(page)} aria-label="first page">
            {isRTL(theme) ? <LastPage /> : <FirstPage />}
        </IconButton>
    );
};

const LastPageAction = ({ count, page, rowsPerPage, onPageChange }) => {
    const theme = useTheme();

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, lastPage(count, rowsPerPage)));
    };

    return (
        <IconButton onClick={handleLastPageButtonClick} disabled={isLastPage(page, count, rowsPerPage)} aria-label="last page">
            {isRTL(theme) ? <FirstPage /> : <LastPage />}
        </IconButton>
    );
};

const PreviousPageAction = ({ page, onPageChange }) => {
    const theme = useTheme();

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    return (
        <IconButton onClick={handleBackButtonClick} disabled={isFirstPage(page)} aria-label="previous page">
            {isRTL(theme) ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
    );
};

const NextPageAction = ({ count, page, rowsPerPage, onPageChange }) => {
    const theme = useTheme();

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <IconButton onClick={handleNextButtonClick} disabled={isLastPage(page, count, rowsPerPage)} aria-label="next page">
            {isRTL(theme) ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
    );
};

const Actions = ({ count, page, rowsPerPage, onPageChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FirstPageAction page={page} onPageChange={onPageChange} />
            <PreviousPageAction page={page} onPageChange={onPageChange} />
            <NextPageAction page={page} onPageChange={onPageChange} count={count} rowsPerPage={rowsPerPage} />
            <LastPageAction page={page} onPageChange={onPageChange} count={count} rowsPerPage={rowsPerPage} />
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
    const selectProps = {
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
        id: 'select-rows-per-page-id',
        labelId: 'select-label-rows-per-page-id',
    };

    return (
        <TablePagination
            {...props}
            labelRowsPerPage=""
            SelectProps={selectProps}
            rowsPerPageOptions={options}
            ActionsComponent={Actions}
        />
    );
};

export { Pagination, rowsPerPageOptions };

export default Pagination;
