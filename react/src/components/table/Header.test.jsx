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
import { Header, Cell, SortableCell } from './Header';

describe('Header Suite', () => {
    const onRequestSort = jest.fn();

    describe('Header', () => {
        const cellInfos = [
            { id: 'name', label: 'Name', align: 'left', sortable: true },
            { id: 'age', label: 'Age', align: 'right', sortable: true },
            { id: 'location', label: 'Location', align: 'left', sortable: false },
        ];

        const defaultProps = {
            prefix: 'test',
            cellInfos,
            onRequestSort: onRequestSort,
            ascending: true,
            orderBy: 'name',
        };

        const renderComponent = (props = defaultProps) => {
            return render(
                <table>
                    <Header {...props} />
                </table>
            );
        };

        it('renders sortable and non-sortable cells', () => {
            renderComponent();
            const headerRow = screen.getByTestId('test-header');
            expect(headerRow).toBeInTheDocument();
            const headerCells = screen.getAllByRole('columnheader');
            expect(headerCells[0]).toHaveTextContent('Name');
            expect(headerCells[1]).toHaveTextContent('Age');
            expect(headerCells[2]).toHaveTextContent('Location');
        });

        it('calls onRequestSort when sortable cell is clicked', () => {
            renderComponent();
            const nameSortLabel = screen.getByTestId('test-name').querySelector('.MuiTableSortLabel-root');
            fireEvent.click(nameSortLabel);
            expect(onRequestSort).toHaveBeenCalledWith(expect.anything(), 'name');
        });
    });

    describe('Cell', () => {
        const renderComponent = (cellInfo) => {
            return render(
                <table>
                    <tbody>
                        <tr>
                            <Cell key={cellInfo.id} cellInfo={cellInfo} />
                        </tr>
                    </tbody>
                </table>
            );
        };

        it('renders cell', () => {
            renderComponent({ id: 'name', label: 'Name', align: 'left' });
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByRole('cell')).toHaveClass('MuiTableCell-alignLeft');
        });
    });

    describe('SortableCell', () => {
        const cellInfo = { id: 'name', label: 'Name', align: 'left', sortable: true };

        const ascendingProps = {
            prefix: 'test',
            cellInfo,
            onRequestSort: onRequestSort,
            ascending: true,
            orderBy: 'name',
        };

        const descendingProps = {
            prefix: 'test',
            cellInfo,
            onRequestSort: onRequestSort,
            ascending: false,
            orderBy: 'name',
        };

        const renderComponent = (props) => {
            return render(
                <table>
                    <tbody>
                        <tr>
                            <SortableCell
                                key={props.cellInfo.id}
                                prefix={props.prefix}
                                cellInfo={cellInfo}
                                sortHandler={props.onRequestSort}
                                ascending={props.ascending}
                                orderBy={props.orderBy}
                            />
                        </tr>
                    </tbody>
                </table>
            );
        };

        it('renders ascending sorting cell', () => {
            renderComponent(ascendingProps);
            expect(screen.getByTestId('test-name')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByRole('cell')).toHaveClass('MuiTableCell-alignLeft');
            expect(screen.getByRole('button')).toHaveClass('MuiTableSortLabel-directionAsc');
        });

        it('renders descending sorting cell', () => {
            renderComponent(descendingProps);
            expect(screen.getByTestId('test-name')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByRole('cell')).toHaveClass('MuiTableCell-alignLeft');
            expect(screen.getByRole('button')).toHaveClass('MuiTableSortLabel-directionDesc');
        });
    });
});
