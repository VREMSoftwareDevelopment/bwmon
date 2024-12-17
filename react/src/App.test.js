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
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Settings } from 'luxon';
import App from './App';
import menu from './menu/Menu';

jest.mock('./services/Usage');

describe('App', () => {
    const originalZone = Settings.defaultZone;
    const originalLocale = Settings.defaultLocale;

    beforeEach(() => {
        Settings.defaultZone = 'America/New_York';
        Settings.defaultLocale = 'en-US';
    });

    afterEach(() => {
        Settings.defaultZone = originalZone;
        Settings.defaultLocale = originalLocale;
    });

    const name = 'Bandwidth Monitor Test Name';
    const version = '1.1.1';
    const currentTime = 'October 20, 2020, 11:25:35 AM EDT';

    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <App {...props} />
            </ThemeProvider>
        );

    it('renders the landing page', async () => {
        renderComponent({ name: name, version: version, currentTime: currentTime });
        expect(screen.getByTestId('app-title')).toHaveTextContent(name);
        expect(screen.getByTestId('app-version')).toHaveTextContent(version);
        expect(screen.getByTestId('app-footer2')).toHaveTextContent(`This page was generated on ${currentTime}`);
        menu.forEach((menuItem) => {
            expect(screen.getByTestId(menuItem.id)).toHaveTextContent(menuItem.label);
        });
        await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    });

    it('renders the landing page with default props', async () => {
        renderComponent();
        expect(screen.getByTestId('app-title')).toHaveTextContent('Bandwidth Monitor');
        expect(screen.getByTestId('app-version')).toHaveTextContent('3.1.2');
        menu.forEach((menuItem) => {
            expect(screen.getByTestId(menuItem.id)).toHaveTextContent(menuItem.label);
        });
        await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    });
});
