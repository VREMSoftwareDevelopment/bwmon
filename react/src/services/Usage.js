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

import Data from './Data';

const process = (response) =>
    response
        .replaceAll('\r', '')
        .split('\n')
        .map((line, index) => {
            const elements = line.replaceAll('\n', '').split(',');
            if (elements.length < 8) {
                return null;
            }
            return new Data(
                index,
                elements[0],
                elements[1],
                elements[2],
                elements[3],
                elements[4],
                elements[5],
                elements[6],
                elements[7]
            );
        })
        .filter((line) => line !== null);

class Usage {
    request = async (basepath) => {
        const filename = basepath + '/usage.db';
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
        }
        const result = await response.text();
        return process(result);
    };
}

const usage = new Usage();
export default usage;
