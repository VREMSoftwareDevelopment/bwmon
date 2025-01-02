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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
    const theme = createTheme();

    const renderComponent = () =>
        render(
            <ThemeProvider theme={theme}>
                <PageNotFound />
            </ThemeProvider>
        );

    it('renders "Page Not Found" message', () => {
        renderComponent();
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });
});
