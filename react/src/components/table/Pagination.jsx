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
import { useTheme } from '@mui/styles';
import { TablePagination, IconButton } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';
import { paginationStyles } from '../../utils/StylesUtils';

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

// Stryker disable next-line all
FirstPageAction.propTypes = { page: PropTypes.number.isRequired, onPageChange: PropTypes.func.isRequired };

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

// Stryker disable all
LastPageAction.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
// Stryker restore all

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

// Stryker disable next-line all
PreviousPageAction.propTypes = { page: PropTypes.number.isRequired, onPageChange: PropTypes.func.isRequired };

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

// Stryker disable all
NextPageAction.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
// Stryker restore all

const Actions = ({ count, page, rowsPerPage, onPageChange }) => {
    const classes = paginationStyles();

    return (
        <div className={classes.root}>
            <FirstPageAction page={page} onPageChange={onPageChange} />
            <PreviousPageAction page={page} onPageChange={onPageChange} />
            <NextPageAction page={page} onPageChange={onPageChange} count={count} rowsPerPage={rowsPerPage} />
            <LastPageAction page={page} onPageChange={onPageChange} count={count} rowsPerPage={rowsPerPage} />
        </div>
    );
};

// Stryker disable all
Actions.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
// Stryker restore all

const rowsPerPageOptions = (rowsPerPage, count) => {
    let rowsPerPageOptions = [rowsPerPage];
    if (rowsPerPage !== count) {
        for (let i = rowsPerPage * 2; i < count; i *= 2) {
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
        testid: 'select-rows-per-page-id',
        id: 'select-rows-per-page-id',
        labelId: 'select-label-rows-per-page-id',
    };
    return (
        <TablePagination
            {...props}
            labelRowsPerPage=""
            slotProps={{ select: selectProps }}
            rowsPerPageOptions={options}
            ActionsComponent={Actions}
        />
    );
};

// Stryker disable next-line all
Pagination.propTypes = { count: PropTypes.number.isRequired, minimum: PropTypes.number.isRequired };

export {
    Pagination,
    rowsPerPageOptions,
    FirstPageAction,
    LastPageAction,
    PreviousPageAction,
    NextPageAction,
    lastPage,
    isRTL,
    isFirstPage,
    isLastPage,
};

export default Pagination;
