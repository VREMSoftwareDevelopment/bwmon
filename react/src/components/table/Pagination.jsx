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
import { Box, IconButton, TablePagination } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';

const lastPage = (count, rowsPerPage) => Math.ceil(count / rowsPerPage) - 1;

const isFirstPage = (page) => page === 0;
const isLastPage = (page, count, rowsPerPage) => page >= lastPage(count, rowsPerPage);

const FirstPageAction = ({ page, onPageChange }) => (
    <IconButton onClick={(event) => onPageChange(event, 0)} disabled={isFirstPage(page)} aria-label="first page">
        <FirstPage />
    </IconButton>
);

FirstPageAction.propTypes = { page: PropTypes.number.isRequired, onPageChange: PropTypes.func.isRequired };

const LastPageAction = ({ count, page, rowsPerPage, onPageChange }) => (
    <IconButton
        onClick={(event) => onPageChange(event, Math.max(0, lastPage(count, rowsPerPage)))}
        disabled={isLastPage(page, count, rowsPerPage)}
        aria-label="last page"
    >
        <LastPage />
    </IconButton>
);

LastPageAction.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

const PreviousPageAction = ({ page, onPageChange }) => (
    <IconButton onClick={(event) => onPageChange(event, page - 1)} disabled={isFirstPage(page)} aria-label="previous page">
        <KeyboardArrowLeft />
    </IconButton>
);

PreviousPageAction.propTypes = { page: PropTypes.number.isRequired, onPageChange: PropTypes.func.isRequired };

const NextPageAction = ({ count, page, rowsPerPage, onPageChange }) => (
    <IconButton
        onClick={(event) => onPageChange(event, page + 1)}
        disabled={isLastPage(page, count, rowsPerPage)}
        aria-label="next page"
    >
        <KeyboardArrowRight />
    </IconButton>
);

NextPageAction.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

const options = { flexShrink: 0, display: 'flex' };

const Actions = ({ count, page, rowsPerPage, onPageChange }) => (
    <Box sx={options}>
        <FirstPageAction page={page} onPageChange={onPageChange} />
        <PreviousPageAction page={page} onPageChange={onPageChange} />
        <NextPageAction page={page} onPageChange={onPageChange} count={count} rowsPerPage={rowsPerPage} />
        <LastPageAction page={page} onPageChange={onPageChange} count={count} rowsPerPage={rowsPerPage} />
    </Box>
);

Actions.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

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

Pagination.propTypes = { count: PropTypes.number.isRequired, minimum: PropTypes.number.isRequired };

export {
    Pagination,
    rowsPerPageOptions,
    FirstPageAction,
    LastPageAction,
    PreviousPageAction,
    NextPageAction,
    lastPage,
    isFirstPage,
    isLastPage,
};

export default Pagination;
