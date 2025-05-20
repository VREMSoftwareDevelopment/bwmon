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
import PropTypes from 'prop-types';
import { HashRouter } from 'react-router';
import { DateTime } from 'luxon';
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorDisplay from './components/main/ErrorDisplay';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Navigation from './components/navigation/Navigation';
import BWMonRoutes from './components/navigation/BWMonRoutes';
import menu from './menu/Menu';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({ basename: import.meta.env.BASE_URL });

const appName = import.meta.env.VITE_DESCRIPTION || 'Bandwidth Monitor';
const appVersion = import.meta.env.VITE_VERSION;
const appTime = DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);

const App = ({ name = appName, version = appVersion, currentTime = appTime }) => {
    return (
        <HashRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header name={name} version={version} />
                <Navigation menu={menu} />
                <ErrorBoundary onError={ErrorDisplay}>
                    <BWMonRoutes menu={menu} />
                    <Footer currentTime={currentTime} />
                </ErrorBoundary>
            </ThemeProvider>
        </HashRouter>
    );
};

App.propTypes = { name: PropTypes.string, version: PropTypes.string, currentTime: PropTypes.string };

export default App;
