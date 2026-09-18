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

import { Box, IconButton, TablePagination } from '@mui/material';
import type { TablePaginationActionsProps, TablePaginationProps } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';

type ActionsProps = Pick<TablePaginationActionsProps, 'count' | 'page' | 'rowsPerPage' | 'onPageChange'>;
type PageActionProps = Pick<TablePaginationActionsProps, 'page' | 'onPageChange'>;

export type PaginationProps = Omit<
    TablePaginationProps,
    'rowsPerPageOptions' | 'ActionsComponent' | 'labelRowsPerPage' | 'slotProps'
> & {
    minimum: number;
};

const lastPage = (count: number, rowsPerPage: number): number => Math.ceil(count / rowsPerPage) - 1;

const isFirstPage = (page: number): boolean => page === 0;
const isLastPage = (page: number, count: number, rowsPerPage: number): boolean => page >= lastPage(count, rowsPerPage);

const FirstPageAction = ({ page, onPageChange }: PageActionProps) => (
    <IconButton onClick={(event) => onPageChange(event, 0)} disabled={isFirstPage(page)} aria-label="first page">
        <FirstPage />
    </IconButton>
);

const LastPageAction = ({ count, page, rowsPerPage, onPageChange }: ActionsProps) => (
    <IconButton
        onClick={(event) => onPageChange(event, Math.max(0, lastPage(count, rowsPerPage)))}
        disabled={isLastPage(page, count, rowsPerPage)}
        aria-label="last page"
    >
        <LastPage />
    </IconButton>
);

const PreviousPageAction = ({ page, onPageChange }: PageActionProps) => (
    <IconButton onClick={(event) => onPageChange(event, page - 1)} disabled={isFirstPage(page)} aria-label="previous page">
        <KeyboardArrowLeft />
    </IconButton>
);

const NextPageAction = ({ count, page, rowsPerPage, onPageChange }: ActionsProps) => (
    <IconButton
        onClick={(event) => onPageChange(event, page + 1)}
        disabled={isLastPage(page, count, rowsPerPage)}
        aria-label="next page"
    >
        <KeyboardArrowRight />
    </IconButton>
);

const options = { flexShrink: 0, display: 'flex' };

const Actions = ({ count, page, rowsPerPage, onPageChange }: ActionsProps) => (
    <Box sx={options}>
        <FirstPageAction page={page} onPageChange={onPageChange} />
        <PreviousPageAction page={page} onPageChange={onPageChange} />
        <NextPageAction page={page} onPageChange={onPageChange} count={count} rowsPerPage={rowsPerPage} />
        <LastPageAction page={page} onPageChange={onPageChange} count={count} rowsPerPage={rowsPerPage} />
    </Box>
);

const rowsPerPageOptions = (rowsPerPage: number, count: number): number[] => {
    const rowsPerPageOptions = [rowsPerPage];
    if (rowsPerPage !== count) {
        for (let i = rowsPerPage * 2; i < count; i *= 2) {
            rowsPerPageOptions.push(i);
        }
        rowsPerPageOptions.push(count);
    }
    return rowsPerPageOptions;
};

const Pagination = ({ minimum, ...rest }: PaginationProps) => {
    const options = rowsPerPageOptions(Math.min(minimum, rest.count), rest.count);
    const selectProps = {
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
        id: 'select-rows-per-page-id',
        labelId: 'select-label-rows-per-page-id',
    };

    return (
        <TablePagination
            {...rest}
            labelRowsPerPage=""
            slotProps={{ select: selectProps }}
            rowsPerPageOptions={options}
            ActionsComponent={Actions}
        />
    );
};

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
