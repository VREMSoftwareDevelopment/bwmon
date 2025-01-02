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
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import BWMonRoutes from './BWMonRoutes';

const MockComponent = ({ text }) => <div>{text}</div>;

describe('BWMonRoutes', () => {
    const menu = [
        { pathname: '/page1', element: <MockComponent text="Page 1" /> },
        { pathname: '/page2', element: <MockComponent text="Page 2" /> },
    ];

    const renderComponent = (props) =>
        render(
            <MemoryRouter initialEntries={props}>
                <BWMonRoutes menu={menu} />
            </MemoryRouter>
        );

    it('renders default route', () => {
        renderComponent(['/']);
        expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    it('renders specific route', () => {
        renderComponent(['/page2']);
        expect(screen.getByText('Page 2')).toBeInTheDocument();
    });

    it('renders PageNotFound for unknown route', () => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { container } = renderComponent(['/page3']);
        expect(container.firstChild).toBeNull();
    });
});
