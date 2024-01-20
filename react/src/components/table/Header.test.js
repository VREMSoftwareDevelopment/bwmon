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
import Header from './Header';
import CellInfo from './CellInfo';

describe('Header', () => {
    const cellInfos = [
        new CellInfo('IP', true, 'left', 'IP'),
        new CellInfo('MAC', false, 'left', 'MAC'),
        new CellInfo('download', true, 'right', 'Down'),
        new CellInfo('upload', false, 'right', 'Up'),
    ];

    const handleRequestSort = (event, property) => {};

    it('renders correctly', () => {
        const tree = create(
            <Header
                prefix="test"
                cellInfos={cellInfos}
                onRequestSort={handleRequestSort}
                ascending={true}
                orderBy={cellInfos[0].id}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
