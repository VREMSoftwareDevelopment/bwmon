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
import DropDown from './DropDown';

describe('DropDown Component', () => {
    const handleChange = (_event) => {
        // handle change
    };

    it('renders dropdown with provided items', () => {
        const value = 'ZYXUW';
        render(<DropDown onChange={handleChange} items={['ABC', 'ZYXUW', 'WGKF']} value={value} />);
        expect(screen.getByRole('combobox')).toHaveTextContent(value);
        expect(screen.getByRole('combobox')).toHaveClass('MuiSelect-select');
    });

    it('does not render anything when items are null', () => {
        const { container } = render(<DropDown onChange={handleChange} value="Item 1" />);
        expect(container.firstChild).toBeNull();
    });

    it('does not render anything when value is not provided', () => {
        const { container } = render(<DropDown onChange={handleChange} items={['ABC', 'ZYXUW', 'WGKF']} />);
        expect(container.firstChild).toBeNull();
    });
});
