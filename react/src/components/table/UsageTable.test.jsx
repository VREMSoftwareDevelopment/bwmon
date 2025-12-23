import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsageTable from './UsageTable';

const cellInfos = [
    { id: 'id', label: 'ID', align: 'left' },
    { id: 'value', label: 'Value', align: 'right' },
];

const paginationProps = {
    'data-testid': 'test-pagination',
    id: 'test-pagination',
    colSpan: 2,
    count: 2,
    minimum: 1,
    rowsPerPage: 2,
    page: 0,
    onPageChange: jest.fn(),
    onRowsPerPageChange: jest.fn(),
};

const headerProps = {
    onRequestSort: jest.fn(),
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
                showFooter={false}
            />
        );
        expect(screen.getByTestId('test-pagination')).toBeInTheDocument();
        expect(screen.getByTestId('test-header')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-0')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-1')).toBeInTheDocument();
        expect(screen.queryByTestId('test-footer')).not.toBeInTheDocument();
    });
});
