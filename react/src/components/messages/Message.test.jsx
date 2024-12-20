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
import Message from './Message';

describe('Message Component', () => {
    const theme = createTheme();

    const renderComponent = (props) =>
        render(
            <ThemeProvider theme={theme}>
                <Message {...props} />
            </ThemeProvider>
        );

    it('renders the message with the correct severity', () => {
        const props = { severity: 'message', message: 'message text' };
        renderComponent(props);
        expect(screen.getByText('message text')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardMessage');
    });

    it('does not render anything when message is null', () => {
        const props = { severity: 'message' };
        const { container } = renderComponent(props);
        expect(container.firstChild).toBeNull();
    });
});
