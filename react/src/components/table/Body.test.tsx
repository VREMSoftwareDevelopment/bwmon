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
import Body from './Body';
import type { BodyProps } from './Body';
import CellInfo from './CellInfo';

type Person = { id: number; name: string; age: number };
type User = { id: number; username: string; score: number };

describe('Body Component', () => {
    const cellInfos = [
        new CellInfo<Person>('name', false, 'left', 'Name', false),
        new CellInfo<Person>('age', false, 'right', 'Age', false, (age) => `${age} years`),
    ];

    const values: Person[] = [
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 32 },
        { id: 3, name: 'John Smith', age: 30 },
    ];

    const defaultProps: BodyProps<Person> = {
        prefix: 'test',
        cellInfos,
        values,
    };

    const renderComponent = <T extends Record<keyof T, string | number> & { id: string | number }>(props: BodyProps<T>) => {
        return render(
            <table>
                <Body {...props} />
            </table>
        );
    };

    it('renders table rows and cells', () => {
        renderComponent(defaultProps);
        values.forEach((value, index) => {
            const row = screen.getByTestId(`test-data-${index}`);
            expect(row).toBeInTheDocument();
            cellInfos.forEach((cellInfo) => {
                const cell = screen.getByText(cellInfo.convert ? cellInfo.convert(value[cellInfo.id]) : String(value[cellInfo.id]));
                expect(cell).toBeInTheDocument();
            });
        });
    });

    it('applies alternating row colors', () => {
        renderComponent(defaultProps);
        values.forEach((value, index) => {
            const row = screen.getByTestId(`test-data-${index}`);
            const expectedBackgroundColor = index % 2 ? 'ghostwhite' : 'white';
            expect(row).toHaveStyle(`background: ${expectedBackgroundColor}`);
        });
    });

    it('renders with ids', () => {
        renderComponent(defaultProps);
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

    it('renders correctly with a single value and custom cellInfos', () => {
        const customCellInfos = [
            new CellInfo<User>('username', false, 'left', 'Username', false, (u) => String(u).toUpperCase()),
            new CellInfo<User>('score', false, 'right', 'Score', false),
        ];
        const customValues: User[] = [{ id: 10, username: 'alice', score: 99 }];
        const props: BodyProps<User> = { prefix: 'custom', cellInfos: customCellInfos, values: customValues };
        renderComponent(props);
        expect(screen.getByText('ALICE')).toBeInTheDocument();
        expect(screen.getByText('99')).toBeInTheDocument();
    });
});
