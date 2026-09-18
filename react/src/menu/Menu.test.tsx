/*
 *      Copyright (C) 2010 - 2026 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import { Person, CalendarToday, CalendarViewDay, ShowChart, Timeline } from '@mui/icons-material';
import { UsageByUser, UsageByUserGraph } from '@features/byuser';
import { UsageByMonth, UsageByMonthGraph } from '@features/bymonth';
import { UsageByYear, UsageByYearGraph } from '@features/byyear';
import type { MenuItem } from '@components';
import menu from './Menu';

const menuItem = (index: number): MenuItem => {
    const item = menu.at(index);
    if (!item) {
        throw new Error(`no menu item at index ${index}`);
    }
    return item;
};

describe('Menu', () => {
    it('id', () => {
        expect('usage-by-user').toEqual(menuItem(0).id);
        expect('usage-by-user-graph').toEqual(menuItem(1).id);
        expect('usage-by-month').toEqual(menuItem(2).id);
        expect('usage-by-month-graph').toEqual(menuItem(3).id);
        expect('usage-by-year').toEqual(menuItem(4).id);
        expect('usage-by-year-graph').toEqual(menuItem(5).id);
    });

    it('element', () => {
        expect(<UsageByUser />).toEqual(menuItem(0).element);
        expect(<UsageByUserGraph />).toEqual(menuItem(1).element);
        expect(<UsageByMonth />).toEqual(menuItem(2).element);
        expect(<UsageByMonthGraph />).toEqual(menuItem(3).element);
        expect(<UsageByYear />).toEqual(menuItem(4).element);
        expect(<UsageByYearGraph />).toEqual(menuItem(5).element);
    });

    it('pathname', () => {
        expect('/UsageByUser').toEqual(menuItem(0).pathname);
        expect('/UsageByUserGraph').toEqual(menuItem(1).pathname);
        expect('/UsageByMonth').toEqual(menuItem(2).pathname);
        expect('/UsageByMonthGraph').toEqual(menuItem(3).pathname);
        expect('/UsageByYear').toEqual(menuItem(4).pathname);
        expect('/UsageByYearGraph').toEqual(menuItem(5).pathname);
    });

    it('label', () => {
        expect('By User').toEqual(menuItem(0).label);
        expect('By User Graph').toEqual(menuItem(1).label);
        expect('By Month').toEqual(menuItem(2).label);
        expect('By Month Graph').toEqual(menuItem(3).label);
        expect('By Year').toEqual(menuItem(4).label);
        expect('By Year Graph').toEqual(menuItem(5).label);
    });

    it('icon', () => {
        expect(<Person />).toEqual(menuItem(0).icon);
        expect(<ShowChart />).toEqual(menuItem(1).icon);
        expect(<CalendarToday />).toEqual(menuItem(2).icon);
        expect(<Timeline />).toEqual(menuItem(3).icon);
        expect(<CalendarViewDay />).toEqual(menuItem(4).icon);
        expect(<Timeline />).toEqual(menuItem(5).icon);
    });
});
