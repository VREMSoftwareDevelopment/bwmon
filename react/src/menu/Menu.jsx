/*
 *      Copyright (C) 2010 - 2025 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { UsageByUser, UsageByUserGraph } from '@features/byuser';
import { UsageByMonth, UsageByMonthGraph } from '@features/bymonth';
import { UsageByYear, UsageByYearGraph } from '@features/byyear';

class MenuItem {
    constructor(id, element, pathname, label, icon) {
        this.id = id;
        this.element = element;
        this.pathname = pathname;
        this.label = label;
        this.icon = icon;
    }
}

const menu = [
    new MenuItem('usage-by-user', <UsageByUser />, '/UsageByUser', 'By User', <Person />),
    new MenuItem('usage-by-user-graph', <UsageByUserGraph />, '/UsageByUserGraph', 'By User Graph', <ShowChart />),
    new MenuItem('usage-by-month', <UsageByMonth />, '/UsageByMonth', 'By Month', <CalendarToday />),
    new MenuItem('usage-by-month-graph', <UsageByMonthGraph />, '/UsageByMonthGraph', 'By Month Graph', <Timeline />),
    new MenuItem('usage-by-year', <UsageByYear />, '/UsageByYear', 'By Year', <CalendarViewDay />),
    new MenuItem('usage-by-year-graph', <UsageByYearGraph />, '/UsageByYearGraph', 'By Year Graph', <Timeline />),
];

export default menu;
