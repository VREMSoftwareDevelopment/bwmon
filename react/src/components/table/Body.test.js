/*
 *      Copyright (C) 2010 - 2023 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import Body from './Body';
import CellInfo from './CellInfo';

describe('Body', () => {
    const convert = (value) => value / 1000;

    const cellInfos = [new CellInfo('IP', true, 'left', 'IP', false), new CellInfo('up', false, 'right', 'Down', true, convert)];

    const values = [
        { id: 1, IP: '192.168.1.14', up: 12345202809 },
        { id: 2, IP: '192.168.1.21', up: 123453907 },
        { id: 3, IP: '192.168.1.10', up: 5370488 },
    ];

    it('renders correctly', () => {
        const tree = create(<Body prefix="test" cellInfos={cellInfos} values={values} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
