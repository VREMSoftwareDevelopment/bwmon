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
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Body from './Body';

describe('Body Component', () => {
    const cellInfos = [
        { id: 'name', label: 'Name', align: 'left', convert: null },
        { id: 'age', label: 'Age', align: 'right', convert: (age) => `${age} years` },
    ];

    const values = [
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 32 },
        { id: 3, name: 'John Smith', age: 30 },
    ];

    const defaultProps = {
        prefix: 'test',
        cellInfos,
        values,
    };

    const renderComponent = (props = defaultProps) => {
        return render(
            <table>
                <Body {...props} />
            </table>
        );
    };

    it('renders table rows and cells', () => {
        renderComponent();
        values.forEach((value, index) => {
            const row = screen.getByTestId(`test-data-${index}`);
            expect(row).toBeInTheDocument();
            cellInfos.forEach((cellInfo) => {
                const cell = screen.getByText(cellInfo.convert ? cellInfo.convert(value[cellInfo.id]) : value[cellInfo.id]);
                expect(cell).toBeInTheDocument();
            });
        });
    });

    it('applies alternating row colors', () => {
        renderComponent();
        values.forEach((value, index) => {
            const row = screen.getByTestId(`test-data-${index}`);
            const expectedBackgroundColor = index % 2 ? 'ghostwhite' : 'white';
            expect(row).toHaveStyle(`background: ${expectedBackgroundColor}`);
        });
    });

    it('renders with ids', () => {
        renderComponent();
        expect(screen.getByTestId('test-data-0')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-1')).toBeInTheDocument();
    });

    it('renders no rows when values is empty', () => {
        renderComponent({ ...defaultProps, values: [] });
        expect(screen.queryByTestId('test-data-0')).not.toBeInTheDocument();
    });

    it('renders no cells when cellInfos is empty', () => {
        renderComponent({ ...defaultProps, cellInfos: [] });
        values.forEach((_, index) => {
            const row = screen.getByTestId(`test-data-${index}`);
            expect(row).toBeInTheDocument();
            expect(row.querySelectorAll('td').length).toBe(0);
        });
    });

    it('uses fallback key/id when value.id is undefined or null', () => {
        const testValues = [
            { name: 'No ID', age: 40 },
            { id: null, name: 'Null ID', age: 41 },
        ];
        renderComponent({ ...defaultProps, values: testValues });
        expect(screen.getByTestId('test-data-0')).toBeInTheDocument();
        expect(screen.getByTestId('test-data-1')).toBeInTheDocument();
    });

    it('renders correctly with a single value and custom cellInfos', () => {
        const customCellInfos = [
            { id: 'username', label: 'Username', align: 'left', convert: (u) => u.toUpperCase() },
            { id: 'score', label: 'Score', align: 'right', convert: null },
        ];
        const customValues = [{ id: 10, username: 'alice', score: 99 }];
        const props = { prefix: 'custom', cellInfos: customCellInfos, values: customValues };
        renderComponent(props);
        expect(screen.getByText('ALICE')).toBeInTheDocument();
        expect(screen.getByText('99')).toBeInTheDocument();
    });
});
