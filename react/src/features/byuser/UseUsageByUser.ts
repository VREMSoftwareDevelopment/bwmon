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

/**
 * Custom React hook for fetching usage data by user, with filter.
 */
import { useState, useEffect, useDeferredValue } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { API } from '@services';
import type { Data, UsageResult } from '@services';
import { useYearMonth } from '@hooks';

interface UsageByUserState {
    years: number[] | undefined;
    year: number | undefined;
    setYear: Dispatch<SetStateAction<number | undefined>>;
    months: string[] | undefined;
    month: string | undefined;
    setMonth: Dispatch<SetStateAction<string | undefined>>;
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
    data: UsageResult<Data> | undefined;
    loading: boolean;
    error: string | null;
}

const useUsageByUser = (): UsageByUserState => {
    const { years, year, setYear, months, month, setMonth, error: yearMonthError } = useYearMonth();
    const [filter, setFilter] = useState('');
    const deferredFilter = useDeferredValue(filter);
    const [data, setData] = useState<UsageResult<Data>>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch(selectedYear: number, selectedMonth: string) {
            try {
                setLoading(true);
                setError(null);
                const usageByUser = await API.getUsageByUser(selectedYear, selectedMonth, deferredFilter);
                setData(usageByUser);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        }
        if (year && month) {
            fetch(year, month);
        }
    }, [year, month, deferredFilter]);

    return { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading, error: yearMonthError || error };
};

export default useUsageByUser;
