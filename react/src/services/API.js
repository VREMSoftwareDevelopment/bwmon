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

import usage from './Usage';
import { DateTime } from 'luxon';
import { toIPv4 } from '../utils/ConversionUtils';

// reload every 10 minutes
const RELOAD_TIME = 10;

class Store {
    constructor() {
        this.last = DateTime.local();
    }

    orderById = (a, b) => b.id - a.id;

    orderByIP = (a, b) => {
        const result = a.IP - b.IP;
        return result === 0 ? this.orderById(a, b) : result;
    };

    orderByMonth = (a, b) => {
        const result = b.month - a.month;
        return result === 0 ? this.orderByIP(a, b) : result;
    };

    orderBy = (a, b) => {
        const result = b.year - a.year;
        return result === 0 ? this.orderByMonth(a, b) : result;
    };

    data = async () => {
        const current = DateTime.local();
        if (!this.cached || current.diff(this.last, ['minutes']).minutes >= RELOAD_TIME) {
            const data = await usage.request(process.env.PUBLIC_URL);
            this.cached = data.sort(this.orderBy);
            this.last = current;
        }
        return this.cached;
    };

    sum = (entries, days, id) => {
        let download = 0,
            upload = 0,
            total = 0;

        entries.forEach((entry) => {
            download += entry.download;
            upload += entry.upload;
            total += entry.total;
        });
        const average = +(total / days).toFixed(3);
        return { id, download, upload, total, average, days };
    };

    getYears = async () => {
        const result = await this.data();
        return [...new Set(result.map((element) => element.year))];
    };

    getMonths = async (year) => {
        const result = await this.data();
        return [...new Set(result.filter((element) => element.year === year).map((element) => element.month))];
    };

    getUsageByYear = async (year) => {
        const result = await this.data();
        const days = DateTime.local(year, 12, 31).daysInYear;
        const usage = result.filter((element) => element.year === year);
        return this.sum(usage, days, year);
    };

    getUsageByUser = async (year, month, filter) => {
        const result = await this.data();
        const days = DateTime.local(year, month).daysInMonth;
        let usage = result.filter((element) => element.year === year && element.month === month);
        if (filter) {
            usage = usage.filter((entry) => {
                let filterLowerCase = filter.toLowerCase();
                return (
                    toIPv4(entry.IP).toLowerCase().indexOf(filterLowerCase) !== -1 ||
                    entry.MAC.toLowerCase().indexOf(filterLowerCase) !== -1 ||
                    entry.user.toLowerCase().indexOf(filterLowerCase) !== -1
                );
            });
        }
        const total = this.sum(usage, days, month);
        usage.forEach((value) => (value.percent = +((value.total * 100) / total.total).toFixed(1)));
        return { usage, total };
    };
}

const store = new Store();

class Service {
    getYears = async () => await store.getYears();

    getMonths = async (year) => {
        const result = await store.getMonths(year);
        return result.map((month) => DateTime.local(year, month).toFormat('MMMM'));
    };

    getUsageByUser = async (year, month, filter) =>
        await store.getUsageByUser(year, DateTime.fromFormat(year + '-' + month, 'yyyy-MMMM').month, filter);

    getUsageByMonth = async (year) => {
        const months = await store.getMonths(year);
        const total = await store.getUsageByYear(year);
        let usage = await Promise.all(
            months.map(async (entry) => {
                const result = await store.getUsageByUser(year, entry);
                return result.total;
            })
        );
        usage.forEach((value) => (value.percent = +((value.total * 100) / total.total).toFixed(1)));
        return { usage, total };
    };

    getUsageByYear = async () => {
        const result = await store.getYears();
        return await Promise.all(
            result.map(async (entry) => {
                const result = await store.getUsageByYear(entry);
                return result;
            })
        );
    };
}

const API = new Service();
export default API;
