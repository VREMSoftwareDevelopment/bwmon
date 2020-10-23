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
 * Bandwidth Usage Monitor
 */

import React from 'react';
import { Person, CalendarToday, CalendarViewDay, ShowChart, Timeline } from '@material-ui/icons';
import UsageByUser from '../pages/byuser/UsageByUser';
import UsageByUserGraph from '../pages/byuser/UsageByUserGraph';
import UsageByMonth from '../pages/bymonth/UsageByMonth';
import UsageByMonthGraph from '../pages/bymonth/UsageByMonthGraph';
import UsageByYear from '../pages/byyear/UsageByYear';
import UsageByYearGraph from '../pages/byyear/UsageByYearGraph';

class MenuItem {
    constructor(id, component, pathname, label, icon) {
        this.id = id;
        this.component = component;
        this.pathname = pathname;
        this.label = label;
        this.icon = icon;
    }
}

const menu = [
    new MenuItem('usage-by-user', UsageByUser, '/UsageByUser', 'By User', <Person />),
    new MenuItem('usage-by-user-graph', UsageByUserGraph, '/UsageByUserGraph', 'By User Graph', <ShowChart />),
    new MenuItem('usage-by-month', UsageByMonth, '/UsageByMonth', 'By Month', <CalendarToday />),
    new MenuItem('usage-by-month-graph', UsageByMonthGraph, '/UsageByMonthGraph', 'By Month Graph', <Timeline />),
    new MenuItem('usage-by-year', UsageByYear, '/UsageByYear', 'By Year', <CalendarViewDay />),
    new MenuItem('usage-by-year-graph', UsageByYearGraph, '/UsageByYearGraph', 'By Year Graph', <Timeline />),
];

export default menu;
