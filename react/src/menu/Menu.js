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
