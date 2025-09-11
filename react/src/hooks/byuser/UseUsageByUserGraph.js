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

import { useState, useEffect } from 'react';
import { toIPv4, usageInGBytes } from '@utils/ConversionUtils';
import useUsageByUser from './UseUsageByUser';

const useUsageByYearGraph = () => {
    const { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading } = useUsageByUser();
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (data) {
            setOptions({
                chart: {
                    id: 'usage-by-user',
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: data.usage.map((element) => toIPv4(element.IP)),
                },
            });

            setSeries([
                {
                    name: 'Total Usage',
                    data: data.usage.map((element) => Number(usageInGBytes(element.total)).toFixed(1)),
                },
            ]);
        }
    }, [data]);

    return { options, series, years, year, setYear, months, month, setMonth, filter, setFilter, loading };
};

export default useUsageByYearGraph;
