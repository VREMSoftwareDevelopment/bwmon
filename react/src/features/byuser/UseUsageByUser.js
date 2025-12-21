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

/**
 * Custom React hook for fetching usage data by user, with filter.
 * @returns {{ years, year, setYear, months, month, setMonth, filter, setFilter, data, loading, error }}
 */
import { useState, useEffect } from 'react';
import { API } from '@services';
import { useYearMonth } from '@hooks';

const useUsageByUser = () => {
    const { years, year, setYear, months, month, setMonth, error: yearMonthError } = useYearMonth();
    const [filter, setFilter] = useState('');
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetch() {
            try {
                setLoading(true);
                setError(null);
                const usageByUser = await API.getUsageByUser(year, month, filter);
                setData(usageByUser);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (year && month) {
            fetch();
        }
    }, [year, month, filter]);

    return { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading, error: yearMonthError || error };
};

export default useUsageByUser;
