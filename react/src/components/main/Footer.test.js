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
import Footer from './Footer';

describe('Footer', () => {
    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <Footer {...props} />
            </ThemeProvider>
        );

    it('renders static text and current time', () => {
        const currentTime = 'Sunday, 15 December 2024, 13:15';
        renderComponent({ currentTime: currentTime });
        expect(screen.getByTestId('app-footer1')).toHaveTextContent('All usage information is in gigabytes');
        expect(screen.getByTestId('app-footer2')).toHaveTextContent(`This page was generated on ${currentTime}`);
    });
});
