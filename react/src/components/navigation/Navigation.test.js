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
import { BrowserRouter } from 'react-router-dom';
import { themeWrapper } from '../../__test__/utils/ThemeWrapper';
import Navigation from './Navigation';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: '/pathname2',
    }),
}));

describe('Navigation', () => {
    const menu = [
        { id: 'id1', pathname: '/pathname1', label: 'label1', icon: 'icon1' },
        { id: 'id2', pathname: '/pathname2', label: 'label2', icon: 'icon2' },
        { id: 'id3', pathname: '/pathname3', label: 'label3', icon: 'icon3' },
    ];

    it('renders correctly', () => {
        const tree = themeWrapper(
            <BrowserRouter>
                <Navigation menu={menu} />
            </BrowserRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
