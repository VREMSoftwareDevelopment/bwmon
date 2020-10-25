/*
 *      Copyright (C) 2010 - 2020 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { BrowserRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Navigation from './components/navigation/Navigation';
import Routes from './components/navigation/Routes';
import ErrorBoundary from './components/error/ErrorBoundary';
import menu from './menu/Menu';

import { createBrowserHistory } from 'history';

const basepath = process.env.PUBLIC_URL;

export const history = createBrowserHistory({
    basename: basepath,
});

const App = ({ description, version, currentTime }) => (
    <BrowserRouter basename={basepath}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header description={description} version={version} />
            <Navigation menu={menu} />
            <ErrorBoundary>
                <Routes menu={menu} />
                <Footer currentTime={currentTime} />
            </ErrorBoundary>
        </ThemeProvider>
    </BrowserRouter>
);

App.defaultProps = {
    description: process.env.REACT_APP_DESCRIPTION,
    version: process.env.REACT_APP_VERSION,
    currentTime: DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS),
};

export default App;
