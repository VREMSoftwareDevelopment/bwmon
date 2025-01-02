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
import InfoMessage from './InfoMessage';

describe('InfoMessage', () => {
    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <InfoMessage {...props} />
            </ThemeProvider>
        );

    it('renders the message with the correct severity', () => {
        const props = { message: 'info message text' };
        renderComponent(props);
        expect(screen.getByText('info message text')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardInfo');
    });

    it('does not render anything when message is null', () => {
        const { container } = renderComponent();
        expect(container.firstChild).toBeNull();
    });
});
