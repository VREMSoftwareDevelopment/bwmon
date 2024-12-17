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
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navigation from './Navigation';

const menu = [
    { id: 'home', pathname: '/home', label: 'Home', icon: <div>HomeIcon</div> },
    { id: 'about', pathname: '/about', label: 'About', icon: <div>AboutIcon</div> },
];

describe('Navigation', () => {
    it('renders navigation actions from menu', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Navigation menu={menu} />
            </MemoryRouter>
        );
        menu.forEach((menuItem) => {
            expect(screen.getByTestId(menuItem.id)).toBeInTheDocument();
            expect(screen.getByText(menuItem.label)).toBeInTheDocument();
        });
        expect(screen.getByTestId('home')).toHaveClass('Mui-selected');
        expect(screen.getByTestId('about')).not.toHaveClass('Mui-selected');
    });

    it('changes route on navigation action click', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Navigation menu={menu} />
            </MemoryRouter>
        );
        const aboutNavAction = screen.getByTestId('about');
        fireEvent.click(aboutNavAction);
        expect(screen.getByTestId('home')).not.toHaveClass('Mui-selected');
        expect(screen.getByTestId('about')).toHaveClass('Mui-selected');
    });
});
