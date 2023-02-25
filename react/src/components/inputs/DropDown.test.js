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
import DropDown from './DropDown';

describe('DropDown', () => {
    const handleChange = (event) => {
        // handle change
    };

    it('renders correctly with items', () => {
        const tree = create(
            <DropDown id="12345" value="ZYXUW" onChange={handleChange} items={['ABC', 'ZYXUW', 'WGKF']} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with no items', () => {
        const tree = create(<DropDown />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with no value', () => {
        const tree = create(<DropDown items={['ABC', 'ZYXUW', 'WGKF']} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
