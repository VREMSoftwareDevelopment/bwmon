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

import usage from '@services/Usage';
import { DateTime } from 'luxon';
import { toIPv4, toPercentage } from '@utils';
import type Data from '@services/Data';
import type { UsageResult, UsageSummary } from '@services/types';

// reload every 10 minutes
const RELOAD_TIME = 10;

class Store {
    private last: DateTime;
    private cached: Data[] | undefined;

    constructor() {
        this.last = DateTime.local();
    }

    orderById = (a: Data, b: Data): number => b.id - a.id;

    orderByIP = (a: Data, b: Data): number => {
        const result = a.IP - b.IP;
        return result === 0 ? this.orderById(a, b) : result;
    };

    orderByMonth = (a: Data, b: Data): number => {
        const result = b.month - a.month;
        return result === 0 ? this.orderByIP(a, b) : result;
    };

    orderBy = (a: Data, b: Data): number => {
        const result = b.year - a.year;
        return result === 0 ? this.orderByMonth(a, b) : result;
    };

    data = async (): Promise<Data[]> => {
        const current = DateTime.local();
        if (!this.cached || current.diff(this.last, ['minutes']).minutes >= RELOAD_TIME) {
            const data = await usage.request(import.meta.env.BASE_URL);
            this.cached = data.sort(this.orderBy);
            this.last = current;
        }
        return this.cached;
    };

    sum = (entries: readonly Pick<Data, 'download' | 'upload' | 'total'>[], days: number, id: number): UsageSummary => {
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

    getYears = async (): Promise<number[]> => {
        const result = await this.data();
        return [...new Set(result.map((element) => element.year))];
    };

    getMonths = async (year: number): Promise<number[]> => {
        const result = await this.data();
        return [...new Set(result.filter((element) => element.year === year).map((element) => element.month))];
    };

    getUsageByYear = async (year: number): Promise<UsageSummary> => {
        const result = await this.data();
        const days = DateTime.local(year, 12, 31).daysInYear;
        const usage = result.filter((element) => element.year === year);
        return this.sum(usage, days, year);
    };

    getUsageByUser = async (year: number, month: number, filter?: string): Promise<UsageResult<Data>> => {
        const result = await this.data();
        const days = Number(DateTime.local(year, month).daysInMonth);
        let usage = result.filter((element) => element.year === year && element.month === month);
        if (filter) {
            usage = usage.filter((entry) => {
                const filterLowerCase = filter.toLowerCase();
                return (
                    toIPv4(entry.IP).toLowerCase().indexOf(filterLowerCase) !== -1 ||
                    entry.MAC.toLowerCase().indexOf(filterLowerCase) !== -1 ||
                    entry.user.toLowerCase().indexOf(filterLowerCase) !== -1
                );
            });
        }
        const total = this.sum(usage, days, month);
        const usageWithPercent = usage.map((value) => ({
            ...value,
            percent: toPercentage(value.total, total.total),
        }));
        return { usage: usageWithPercent, total };
    };
}

const store = new Store();

class Service {
    getYears = async (): Promise<number[]> => await store.getYears();

    getMonths = async (year: number): Promise<string[]> => {
        const months = await store.getMonths(year);
        return months.map((month) => DateTime.local(year, month).toFormat('MMMM'));
    };

    getUsageByUser = async (year: number, month: string, filter?: string): Promise<UsageResult<Data>> =>
        await store.getUsageByUser(year, DateTime.fromFormat(year + '-' + month, 'yyyy-MMMM').month, filter);

    getUsageByMonth = async (year: number): Promise<UsageResult<UsageSummary>> => {
        const months = await store.getMonths(year);
        const total = await store.getUsageByYear(year);
        const usage = await Promise.all(
            months.map(async (entry) => {
                const result = await store.getUsageByUser(year, entry);
                return result.total;
            })
        );
        const usageWithPercent = usage.map((value) => ({
            ...value,
            percent: toPercentage(value.total, total.total),
        }));
        return { usage: usageWithPercent, total };
    };

    getUsageByYear = async (): Promise<UsageSummary[]> => {
        const years = await store.getYears();
        return await Promise.all(
            years.map(async (entry) => {
                const result = await store.getUsageByYear(entry);
                return result;
            })
        );
    };
}

const API = new Service();
export default API;
