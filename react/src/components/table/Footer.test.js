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
import { create } from 'react-test-renderer';
import Footer from './Footer';
import CellInfo from './CellInfo';

describe('Footer', () => {
    const convert = (value) => value + 'xyz';

    const cellInfos = [
        new CellInfo('IP', true, 'left', 'IP', true),
        new CellInfo('MAC', false, 'left', 'MAC', false),
        new CellInfo('download', true, 'right', 'Down', true),
        new CellInfo('upload', false, 'right', 'Up', true, convert),
        new CellInfo('total', false, 'right', 'Total', false),
    ];

    const values = {
        IP: 'IP ADDRESS',
        MAC: 'MAC ADDRESS',
        download: 12345,
        upload: 67890,
        total: 2468,
    };

    it('renders correctly', () => {
        const tree = create(<Footer prefix="test" cellInfos={cellInfos} values={values} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
