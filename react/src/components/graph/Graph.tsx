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

import React, { Suspense } from 'react';
import type { Props as ChartProps } from 'react-apexcharts';

// scan-suspicious-ignore-next-line
const Chart = React.lazy(() => import('react-apexcharts'));

export type GraphProps = Required<Pick<ChartProps, 'options' | 'series'>>;

const Graph = ({ options, series }: GraphProps) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Chart options={options} series={series} type="bar" height={500} />
        </Suspense>
    );
};

export default Graph;
