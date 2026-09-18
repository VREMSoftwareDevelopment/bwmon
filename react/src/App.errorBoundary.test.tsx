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

import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

vi.mock('./menu/Menu', () => {
    const Boom = () => {
        throw new Error('boom');
    };
    return {
        default: [
            {
                id: 'boom',
                element: createElement(Boom),
                pathname: '/Boom',
                label: 'Boom',
                icon: createElement('span'),
            },
        ],
    };
});

describe('App error boundary', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the error message when a route throws', () => {
        render(<App />);
        expect(screen.getByText(/boom/)).toBeInTheDocument();
    });
});
