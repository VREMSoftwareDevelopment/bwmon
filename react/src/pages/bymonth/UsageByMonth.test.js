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
import UsageByMonth from './UsageByMonth';
import { act } from 'react-test-renderer';
import { themeWrapper } from '../../__test__/utils/ThemeWrapper';
import wait from '../../__test__/utils/Wait';

jest.mock('../../services/Usage');

describe('UsageByMonth', () => {
    it('renders correctly', () => {
        const tree = themeWrapper(<UsageByMonth />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly after data load', async () => {
        let tree;
        act(() => {
            tree = themeWrapper(<UsageByMonth />);
        });
        await wait(1);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
