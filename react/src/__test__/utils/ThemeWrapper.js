import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { create } from 'react-test-renderer';
import theme from './../../theme';

export const themeWrapper = (component) =>
    create(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>{component}</ThemeProvider>
        </StyledEngineProvider>
    );
