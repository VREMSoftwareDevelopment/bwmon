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

import { fromIPv4 } from '@utils';

export default class Data {
    readonly id: number;
    readonly IP: number;
    readonly MAC: string;
    readonly user: string;
    readonly download: number;
    readonly upload: number;
    readonly firstSeen: number;
    readonly lastSeen: number;
    readonly year: number;
    readonly month: number;
    readonly total: number;
    readonly days: number;
    readonly average: number;

    constructor(
        id: number,
        date: string,
        ip: string,
        mac: string,
        user: string,
        down: string | number,
        up: string | number,
        first: string | number,
        last: string | number
    ) {
        this.id = id;
        this.IP = fromIPv4(ip);
        this.MAC = mac;
        this.user = user;
        this.download = Math.abs(Number(down));
        this.upload = Math.abs(Number(up));
        this.firstSeen = Number(first);
        this.lastSeen = Number(last);
        this.year = Number(date.split('-')[0]);
        this.month = Number(date.split('-')[1]);
        this.total = this.download + this.upload;
        this.days = Math.floor(Math.abs(this.lastSeen - this.firstSeen) / (60 * 60 * 24) + 1);
        this.average = +(this.total / this.days).toFixed(3);
    }
}
