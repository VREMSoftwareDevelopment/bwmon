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
import UsageByUser from './UsageByUser';
import { act, create } from 'react-test-renderer';
import wait from '../../__test__/utils/Wait';

jest.mock('../../services/Usage');
jest.mock('../../components/table/Pagination');

describe('UsageByUser', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByUser />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly after data load', async () => {
        let tree;
        act(() => {
            tree = create(<UsageByUser />);
        });
        await wait(1);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
