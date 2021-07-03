/*
 *      Copyright (C) 2010 - 2020 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { create } from 'react-test-renderer';
import ErrorBoundary from './ErrorBoundary';

import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

const Something = () => null;

describe('<ErrorBoundary> window', () => {
    test('renders correctly', () => {
        const tree = create(
            <ErrorBoundary>
                <Something />
            </ErrorBoundary>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders error', () => {
        const error = new Error('Error!!!');
        const wrapper = mount(
            <ErrorBoundary>
                <Something />
            </ErrorBoundary>
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.find(Something).simulateError(error);
        expect(wrapper).toMatchSnapshot();
    });
});
