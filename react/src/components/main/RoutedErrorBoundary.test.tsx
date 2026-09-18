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

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link, MemoryRouter, Route, Routes } from 'react-router';
import RoutedErrorBoundary from './RoutedErrorBoundary';

const Boom = () => {
    throw new Error('boom');
};

describe('RoutedErrorBoundary', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const renderComponent = () =>
        render(
            <MemoryRouter initialEntries={['/boom']}>
                <Link to="/safe">Go Safe</Link>
                <RoutedErrorBoundary>
                    <Routes>
                        <Route path="/boom" element={<Boom />} />
                        <Route path="/safe" element={<div>Safe Page</div>} />
                    </Routes>
                </RoutedErrorBoundary>
            </MemoryRouter>
        );

    it('renders the error message when a route throws', () => {
        renderComponent();
        expect(screen.getByText(/boom/)).toBeInTheDocument();
    });

    it('logs the error and the component stack', () => {
        renderComponent();
        expect(vi.mocked(console.error)).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'boom' }),
            expect.stringContaining('Boom')
        );
    });

    it('resets the boundary when the route changes', () => {
        renderComponent();
        expect(screen.queryByText('Safe Page')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Go Safe'));

        expect(screen.getByText('Safe Page')).toBeInTheDocument();
        expect(screen.queryByText(/boom/)).not.toBeInTheDocument();
    });
});
