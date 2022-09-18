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
import { Person, CalendarToday, CalendarViewDay, ShowChart, Timeline } from '@mui/icons-material';
import UsageByUser from '../pages/byuser/UsageByUser';
import UsageByUserGraph from '../pages/byuser/UsageByUserGraph';
import UsageByMonth from '../pages/bymonth/UsageByMonth';
import UsageByMonthGraph from '../pages/bymonth/UsageByMonthGraph';
import UsageByYear from '../pages/byyear/UsageByYear';
import UsageByYearGraph from '../pages/byyear/UsageByYearGraph';
import menu from './Menu';

describe('Menu', () => {
    test('id', () => {
        expect('usage-by-user').toEqual(menu[0].id);
        expect('usage-by-user-graph').toEqual(menu[1].id);
        expect('usage-by-month').toEqual(menu[2].id);
        expect('usage-by-month-graph').toEqual(menu[3].id);
        expect('usage-by-year').toEqual(menu[4].id);
        expect('usage-by-year-graph').toEqual(menu[5].id);
    });

    test('element', () => {
        expect(<UsageByUser />).toEqual(menu[0].element);
        expect(<UsageByUserGraph />).toEqual(menu[1].element);
        expect(<UsageByMonth />).toEqual(menu[2].element);
        expect(<UsageByMonthGraph />).toEqual(menu[3].element);
        expect(<UsageByYear />).toEqual(menu[4].element);
        expect(<UsageByYearGraph />).toEqual(menu[5].element);
    });

    test('pathname', () => {
        expect('/UsageByUser').toEqual(menu[0].pathname);
        expect('/UsageByUserGraph').toEqual(menu[1].pathname);
        expect('/UsageByMonth').toEqual(menu[2].pathname);
        expect('/UsageByMonthGraph').toEqual(menu[3].pathname);
        expect('/UsageByYear').toEqual(menu[4].pathname);
        expect('/UsageByYearGraph').toEqual(menu[5].pathname);
    });

    test('label', () => {
        expect('By User').toEqual(menu[0].label);
        expect('By User Graph').toEqual(menu[1].label);
        expect('By Month').toEqual(menu[2].label);
        expect('By Month Graph').toEqual(menu[3].label);
        expect('By Year').toEqual(menu[4].label);
        expect('By Year Graph').toEqual(menu[5].label);
    });

    test('icon', () => {
        expect(<Person />).toEqual(menu[0].icon);
        expect(<ShowChart />).toEqual(menu[1].icon);
        expect(<CalendarToday />).toEqual(menu[2].icon);
        expect(<Timeline />).toEqual(menu[3].icon);
        expect(<CalendarViewDay />).toEqual(menu[4].icon);
        expect(<Timeline />).toEqual(menu[5].icon);
    });
});
