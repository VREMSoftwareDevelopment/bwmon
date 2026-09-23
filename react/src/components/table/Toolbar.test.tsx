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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Toolbar from './Toolbar';

describe('Toolbar', () => {
    it('renders the shared layout contract', () => {
        render(
            <ThemeProvider theme={createTheme()}>
                <Toolbar data-testid="toolbar">Controls</Toolbar>
            </ThemeProvider>
        );
        const toolbar = screen.getByTestId('toolbar');
        expect(toolbar).toHaveTextContent('Controls');
        expect(toolbar).toHaveStyle({
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            minHeight: '72px',
            padding: '16px',
        });
    });

    it('allows the last control to align independently', () => {
        render(
            <ThemeProvider theme={createTheme()}>
                <Toolbar data-testid="toolbar">
                    <span>Filters</span>
                    <span data-testid="right-control">Pagination</span>
                </Toolbar>
            </ThemeProvider>
        );
        expect(screen.getByTestId('right-control')).toBeInTheDocument();
    });
});
