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

import { fromIPv4 } from '@utils';

export default class Data {
    constructor(id, date, ip, mac, user, down, up, first, last) {
        this.id = id;
        this.IP = fromIPv4(ip);
        this.MAC = mac;
        this.user = user;
        this.download = Math.abs(Number(down));
        this.upload = Math.abs(Number(up));
        this.firstSeen = Number(first);
        this.lastSeen = Number(last);
        this.year = +date.split('-')[0];
        this.month = +date.split('-')[1];
        this.total = this.download + this.upload;
        this.days = Math.floor(Math.abs(this.lastSeen - this.firstSeen) / (60 * 60 * 24) + 1);
        this.average = +(this.total / this.days).toFixed(3);
    }
}
