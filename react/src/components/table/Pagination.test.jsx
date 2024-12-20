/*
 *      Copyright (C) 2010 - 2024 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Pagination, FirstPageAction, LastPageAction, PreviousPageAction, NextPageAction } from './Pagination';

const mockOnPageChange = jest.fn();

describe('Pagination Suite', () => {
    describe('Pagination', () => {
        const defaultProps = {
            count: 100,
            page: 0,
            rowsPerPage: 10,
            onPageChange: mockOnPageChange,
            minimum: 10,
        };

        const theme = createTheme();

        const renderComponent = (props = defaultProps) =>
            render(
                <ThemeProvider theme={theme}>
                    <table>
                        <thead>
                            <tr>
                                <Pagination {...props} />
                            </tr>
                        </thead>
                    </table>
                </ThemeProvider>
            );

        it('renders pagination actions', () => {
            renderComponent();
            expect(screen.getByLabelText('first page')).toBeInTheDocument();
            expect(screen.getByLabelText('previous page')).toBeInTheDocument();
            expect(screen.getByLabelText('next page')).toBeInTheDocument();
            expect(screen.getByLabelText('last page')).toBeInTheDocument();
        });

        it('calls onPageChange when next page button is clicked', () => {
            renderComponent();
            const nextPageButton = screen.getByLabelText('next page');
            fireEvent.click(nextPageButton);
            expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 1);
        });

        it('disables first and previous page buttons on the first page', () => {
            renderComponent();
            expect(screen.getByLabelText('first page')).toBeDisabled();
            expect(screen.getByLabelText('previous page')).toBeDisabled();
        });

        it('disables last and next page buttons on the last page', () => {
            const lastPageProps = { ...defaultProps, page: 9 };
            renderComponent(lastPageProps);
            expect(screen.getByLabelText('last page')).toBeDisabled();
            expect(screen.getByLabelText('next page')).toBeDisabled();
        });

        it('renders rows per page selector', () => {
            renderComponent();
            expect(screen.getByLabelText('rows per page')).toBeInTheDocument();
        });

        it('displays correct rows per page options', () => {
            renderComponent();
            const rowsPerPageSelector = screen.getByLabelText('rows per page');
            fireEvent.mouseDown(rowsPerPageSelector);
            expect(screen.getByText('10')).toBeInTheDocument();
            expect(screen.getByText('20')).toBeInTheDocument();
            expect(screen.getByText('40')).toBeInTheDocument();
            expect(screen.getByText('100')).toBeInTheDocument();
        });

        it('handles edge case where count is less than rowsPerPage', () => {
            const edgeCaseProps = { ...defaultProps, count: 5, rowsPerPage: 10 };
            renderComponent(edgeCaseProps);
            expect(screen.getByLabelText('first page')).toBeDisabled();
            expect(screen.getByLabelText('previous page')).toBeDisabled();
            expect(screen.getByLabelText('next page')).toBeDisabled();
            expect(screen.getByLabelText('last page')).toBeDisabled();
        });

        it('correctly adjusts rows per page options based on minimum and count', () => {
            const adjustedProps = { ...defaultProps, count: 75, minimum: 5 };
            renderComponent(adjustedProps);
            const rowsPerPageSelector = screen.getByLabelText('rows per page');
            fireEvent.mouseDown(rowsPerPageSelector);
            expect(screen.getByText('5')).toBeInTheDocument();
            expect(screen.getByText('10')).toBeInTheDocument();
            expect(screen.getByText('20')).toBeInTheDocument();
            expect(screen.getByText('40')).toBeInTheDocument();
            expect(screen.getByText('75')).toBeInTheDocument();
        });
    });

    describe('FirstPageAction', () => {
        const defaultProps = {
            page: 1,
            onPageChange: mockOnPageChange,
        };

        const renderComponent = (props = defaultProps, themeDirection = 'ltr') => {
            const theme = createTheme({ direction: themeDirection });
            return render(
                <ThemeProvider theme={theme}>
                    <FirstPageAction {...props} />
                </ThemeProvider>
            );
        };

        it('renders first page button', () => {
            renderComponent();
            expect(screen.getByLabelText('first page')).toBeInTheDocument();
        });

        it('calls onPageChange when button is clicked', () => {
            renderComponent();
            fireEvent.click(screen.getByLabelText('first page'));

            expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 0);
        });

        it('disables button when page is the first page', () => {
            renderComponent({ page: 0, onPageChange: mockOnPageChange });
            expect(screen.getByLabelText('first page')).toBeDisabled();
        });

        it('renders LastPage icon in RTL theme', () => {
            renderComponent(defaultProps, 'rtl');
            expect(screen.getByLabelText('first page').querySelector('svg')).toHaveClass('MuiSvgIcon-root');
        });

        it('renders FirstPage icon in LTR theme', () => {
            renderComponent(defaultProps, 'ltr');
            expect(screen.getByLabelText('first page').querySelector('svg')).toHaveClass('MuiSvgIcon-root');
        });
    });

    describe('LastPageAction', () => {
        const defaultProps = {
            count: 100,
            page: 1,
            rowsPerPage: 10,
            onPageChange: mockOnPageChange,
        };

        const renderComponent = (props = defaultProps, themeDirection = 'ltr') => {
            const theme = createTheme({ direction: themeDirection });
            return render(
                <ThemeProvider theme={theme}>
                    <LastPageAction {...props} />
                </ThemeProvider>
            );
        };

        it('renders last page button', () => {
            renderComponent();
            expect(screen.getByLabelText('last page')).toBeInTheDocument();
        });

        it('calls onPageChange when button is clicked', () => {
            renderComponent();
            fireEvent.click(screen.getByLabelText('last page'));
            const lastPageIndex = Math.max(0, Math.ceil(defaultProps.count / defaultProps.rowsPerPage) - 1);
            expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), lastPageIndex);
        });

        it('disables button when already on the last page', () => {
            const props = { ...defaultProps, page: 9 };
            renderComponent(props);
            expect(screen.getByLabelText('last page')).toBeDisabled();
        });

        it('renders FirstPage icon in RTL theme', () => {
            renderComponent(defaultProps, 'rtl');
            expect(screen.getByLabelText('last page').querySelector('svg')).toHaveClass('MuiSvgIcon-root');
        });

        it('renders LastPage icon in LTR theme', () => {
            renderComponent(defaultProps, 'ltr');
            expect(screen.getByLabelText('last page').querySelector('svg')).toHaveClass('MuiSvgIcon-root');
        });
    });

    describe('PreviousPageAction', () => {
        const defaultProps = {
            page: 1,
            onPageChange: mockOnPageChange,
        };

        const renderComponent = (props = defaultProps, themeDirection = 'ltr') => {
            const theme = createTheme({ direction: themeDirection });
            return render(
                <ThemeProvider theme={theme}>
                    <PreviousPageAction {...props} />
                </ThemeProvider>
            );
        };

        it('renders previous page button', () => {
            renderComponent();
            expect(screen.getByLabelText('previous page')).toBeInTheDocument();
        });

        it('calls onPageChange when button is clicked', () => {
            renderComponent();
            fireEvent.click(screen.getByLabelText('previous page'));
            expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 0);
        });

        it('disables button when already on the first page', () => {
            renderComponent({ page: 0, onPageChange: mockOnPageChange });
            expect(screen.getByLabelText('previous page')).toBeDisabled();
        });

        it('renders KeyboardArrowRight icon in RTL theme', () => {
            renderComponent(defaultProps, 'rtl');
            expect(screen.getByLabelText('previous page').querySelector('svg')).toHaveClass('MuiSvgIcon-root');
        });

        it('renders KeyboardArrowLeft icon in LTR theme', () => {
            renderComponent(defaultProps, 'ltr');
            expect(screen.getByLabelText('previous page').querySelector('svg')).toHaveClass('MuiSvgIcon-root');
        });
    });

    describe('NextPageAction', () => {
        const defaultProps = {
            count: 100,
            page: 0,
            rowsPerPage: 10,
            onPageChange: mockOnPageChange,
        };

        const renderComponent = (props = defaultProps, themeDirection = 'ltr') => {
            const theme = createTheme({ direction: themeDirection });
            return render(
                <ThemeProvider theme={theme}>
                    <NextPageAction {...props} />
                </ThemeProvider>
            );
        };

        it('renders next page button', () => {
            renderComponent();
            expect(screen.getByLabelText('next page')).toBeInTheDocument();
        });

        it('calls onPageChange when button is clicked', () => {
            renderComponent();
            fireEvent.click(screen.getByLabelText('next page'));
            expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 1);
        });

        it('disables button when already on the last page', () => {
            const lastPageProps = { ...defaultProps, page: 9 };
            renderComponent(lastPageProps);
            expect(screen.getByLabelText('next page')).toBeDisabled();
        });

        it('renders KeyboardArrowLeft icon in RTL theme', () => {
            renderComponent(defaultProps, 'rtl');
            expect(screen.getByLabelText('next page').querySelector('svg')).toHaveClass('MuiSvgIcon-root');
        });

        it('renders KeyboardArrowRight icon in LTR theme', () => {
            renderComponent(defaultProps, 'ltr');
            expect(screen.getByLabelText('next page').querySelector('svg')).toHaveClass('MuiSvgIcon-root');
        });
    });
});
