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
import Footer from './Footer';
import type { FooterProps } from './Footer';
import CellInfo from './CellInfo';

type Totals = { name: string; value: string; novalue: string; total: number };

describe('Footer', () => {
    const cellInfos = [
        new CellInfo<Totals>('name', false, 'left', 'Name', true),
        new CellInfo<Totals>('value', false, 'left', 'Value', true),
        new CellInfo<Totals>('novalue', false, 'left', 'NoValue', false),
        new CellInfo<Totals>('total', false, 'right', 'Total', true),
    ];

    const values: Totals = {
        name: '',
        value: 'text',
        novalue: 'no-text',
        total: 100,
    };

    const defaultProps: FooterProps<Totals> = {
        prefix: 'test',
        cellInfos,
        values,
    };

    const renderComponent = (props: FooterProps<Totals> = defaultProps) => {
        return render(
            <table>
                <Footer {...props} />
            </table>
        );
    };

    it('renders footer row with totals', () => {
        renderComponent();
        const footerRow = screen.getByTestId('test-footer');
        expect(footerRow).toBeInTheDocument();
        const footerCells = screen.getAllByRole('columnheader');
        expect(footerCells[0]).toHaveTextContent('Totals');
        expect(footerCells[1]).toHaveTextContent('text');
        expect(footerCells[2]).toHaveTextContent('');
        expect(footerCells[3]).toHaveTextContent('100');
    });

    it('renders an empty cell when a footer value is missing', () => {
        renderComponent({ ...defaultProps, values: { name: '', novalue: 'no-text', total: 100 } });
        const footerCells = screen.getAllByRole('columnheader');
        expect(footerCells[1]).toHaveTextContent('');
        expect(footerCells[3]).toHaveTextContent('100');
    });

    it('renders footer with ids', () => {
        renderComponent();
        expect(screen.getByTestId('test-footer')).toBeInTheDocument();
    });
});
