/*
 *      Copyright (C) 2010 - 2026 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import Navigation from './Navigation';
import useNavigation from './UseNavigation';
import type { MenuItem } from './MenuItem';

vi.mock('./UseNavigation', { spy: true });

describe('Navigation', () => {
    const menu: Pick<MenuItem, 'id' | 'pathname' | 'label' | 'icon'>[] = [
        { id: 'home', pathname: '/home', label: 'Home', icon: <div>HomeIcon</div> },
        { id: 'about', pathname: '/about', label: 'About', icon: <div>AboutIcon</div> },
    ];

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const renderComponent = () =>
        render(
            <MemoryRouter initialEntries={['/']}>
                <Navigation menu={menu} />
            </MemoryRouter>
        );

    it('renders navigation actions from menu', () => {
        renderComponent();
        menu.forEach((menuItem) => {
            expect(screen.getByTestId(menuItem.id)).toBeInTheDocument();
            expect(screen.getByText(menuItem.label)).toBeInTheDocument();
        });
        expect(screen.getByTestId('home')).toHaveClass('Mui-selected');
        expect(screen.getByTestId('about')).not.toHaveClass('Mui-selected');
    });

    it('changes route on navigation action click', () => {
        renderComponent();
        const aboutNavAction = screen.getByTestId('about');
        fireEvent.click(aboutNavAction);
        expect(screen.getByTestId('home')).not.toHaveClass('Mui-selected');
        expect(screen.getByTestId('about')).toHaveClass('Mui-selected');
    });

    it('renders with correct props for each BottomNavigationAction', () => {
        renderComponent();
        const homeNavAction = screen.getByTestId('home');
        const aboutNavAction = screen.getByTestId('about');

        expect(homeNavAction).toHaveAttribute('id', 'home');
        expect(homeNavAction).toHaveAttribute('data-testid', 'home');
        expect(aboutNavAction).toHaveAttribute('id', 'about');
        expect(aboutNavAction).toHaveAttribute('data-testid', 'about');
    });

    it('calls setIndex with the new route index when handleChange is triggered', () => {
        const setIndex = vi.fn();
        vi.mocked(useNavigation).mockReturnValue({ index: 0, setIndex });
        renderComponent();
        const aboutNavAction = screen.getByTestId('about');
        fireEvent.click(aboutNavAction);
        expect(setIndex).toHaveBeenCalledWith(1);
    });
});
