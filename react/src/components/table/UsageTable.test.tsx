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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsageTable from './UsageTable';
import CellInfo from './CellInfo';

type Row = { id: string; value: number };

const cellInfos = [new CellInfo<Row>('id', false, 'left', 'ID', false), new CellInfo<Row>('value', false, 'right', 'Value', false)];

const paginationProps = {
    'data-testid': 'test-pagination',
    id: 'test-pagination',
    colSpan: 2,
    count: 2,
    minimum: 1,
    rowsPerPage: 2,
    page: 0,
    onPageChange: vi.fn(),
    onRowsPerPageChange: vi.fn(),
};

const headerProps = {
    onRequestSort: vi.fn(),
    ascending: true,
    orderBy: 'id',
};

const bodyProps = {
    values: [
        { id: 'row1', value: 10 },
        { id: 'row2', value: 20 },
    ],
};

const footerProps = {
    values: { id: 'total', value: 30 },
};

describe('UsageTable', () => {
    it('renders table with header, body, footer, and pagination', () => {
        render(
            <UsageTable
                prefix="test"
                cellInfos={cellInfos}
                paginationProps={paginationProps}
                headerProps={headerProps}
                bodyProps={bodyProps}
                footerProps={footerProps}
                showFooter={true}
            />
        );
        expect(screen.getByTestId('test-pagination')).toBeInTheDocument();
        expect(screen.getByTestId('test-header')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-0')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-1')).toBeInTheDocument();
        expect(screen.getByTestId('test-footer')).toBeInTheDocument();
    });

    it('renders table without footer when showFooter is false', () => {
        render(
            <UsageTable
                prefix="test"
                cellInfos={cellInfos}
                paginationProps={paginationProps}
                headerProps={headerProps}
                bodyProps={bodyProps}
                footerProps={footerProps}
                showFooter={false}
            />
        );
        expect(screen.getByTestId('test-pagination')).toBeInTheDocument();
        expect(screen.getByTestId('test-header')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-0')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-1')).toBeInTheDocument();
        expect(screen.queryByTestId('test-footer')).not.toBeInTheDocument();
    });

    it('renders table without footer when footerProps is omitted', () => {
        render(
            <UsageTable
                prefix="test"
                cellInfos={cellInfos}
                paginationProps={paginationProps}
                headerProps={headerProps}
                bodyProps={bodyProps}
                showFooter={true}
            />
        );
        expect(screen.getByTestId('test-pagination')).toBeInTheDocument();
        expect(screen.getByTestId('test-header')).toBeInTheDocument();
        expect(screen.queryByTestId('test-footer')).not.toBeInTheDocument();
    });

    it('renders table without pagination when paginationProps is omitted', () => {
        render(
            <UsageTable
                prefix="test"
                cellInfos={cellInfos}
                headerProps={headerProps}
                bodyProps={bodyProps}
                footerProps={footerProps}
                showFooter={true}
            />
        );
        expect(screen.queryByTestId('test-pagination')).not.toBeInTheDocument();
        expect(screen.getByTestId('test-header')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-0')).toBeInTheDocument();
        expect(screen.getByTestId('test-footer')).toBeInTheDocument();
    });
});
