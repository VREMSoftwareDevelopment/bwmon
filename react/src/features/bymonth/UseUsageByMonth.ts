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
 * Custom React hook for fetching usage data by month.
 */
import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { API } from '@services';
import type { UsageResult, UsageSummary } from '@services';
import { useYear } from '@hooks';
import { toErrorMessage } from '@utils';

interface UsageByMonthState {
    years: number[] | undefined;
    year: number | undefined;
    setYear: Dispatch<SetStateAction<number | undefined>>;
    data: UsageResult<UsageSummary> | undefined;
    loading: boolean;
    error: string | null;
}

const useUsageByMonth = (): UsageByMonthState => {
    const { years, year, setYear, error: yearError } = useYear();
    const [data, setData] = useState<UsageResult<UsageSummary>>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch(selectedYear: number) {
            try {
                setLoading(true);
                setError(null);
                const usageByMonth = await API.getUsageByMonth(selectedYear);
                setData(usageByMonth);
            } catch (err) {
                setError(toErrorMessage(err));
            } finally {
                setLoading(false);
            }
        }
        if (year) {
            fetch(year);
        } else if (yearError) {
            setLoading(false);
        }
    }, [year, yearError]);

    return { years, year, setYear, data, loading, error: yearError || error };
};

export default useUsageByMonth;
