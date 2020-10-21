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

const App = ({ currentTime }) => (
    <BrowserRouter basename={basepath}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Navigation menu={menu} />
            <ErrorBoundary>
                <Routes menu={menu} />
                <Footer currentTime={currentTime} />
            </ErrorBoundary>
        </ThemeProvider>
    </BrowserRouter>
);

App.defaultProps = {
    currentTime: DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS),
};

export default App;
