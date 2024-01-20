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
import { act, create } from 'react-test-renderer';
import { Settings } from 'luxon';
import App from './App';
import wait from './__test__/utils/Wait';

jest.mock('./services/Usage');
jest.mock('./components/table/Pagination');

describe('App', () => {
    const originalZone = Settings.defaultZone;
    const originalLocale = Settings.defaultLocale;

    beforeEach(() => {
        Settings.defaultZone = 'America/New_York';
        Settings.defaultLocale = 'en-US';
    });

    afterEach(() => {
        Settings.defaultZone = originalZone;
        Settings.defaultLocale = originalLocale;
    });

    const name = 'Bandwidth Monitor';
    const version = '3.1.1';
    const currentTime = 'October 20, 2020, 11:25:35 AM EDT';

    it('renders correctly', () => {
        const tree = create(<App name={name} version={version} currentTime={currentTime} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly after data load', async () => {
        let tree;
        act(() => {
            tree = create(<App name={name} version={version} currentTime={currentTime} />);
        });
        await wait(1);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
