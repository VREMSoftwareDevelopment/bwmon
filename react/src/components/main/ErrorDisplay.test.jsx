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
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorDisplay from './ErrorDisplay';

describe('ErrorDisplay', () => {
    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <ErrorDisplay {...props} />
            </ThemeProvider>
        );

    it('renders error message and component stack', () => {
        const error = new Error('--- Error ---');
        const info = { componentStack: '--- Error Component Stack ---' };
        const props = { error: error, info: info };
        renderComponent(props);
        expect(screen.getByText(error.toString())).toBeInTheDocument();
        expect(screen.getByText(info.componentStack)).toBeInTheDocument();
    });
});
