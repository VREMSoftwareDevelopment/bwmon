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
 * Custom React hook for managing year and month selection.
 */
import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { API } from '@services';
import { useYear } from '@hooks';
import { toErrorMessage } from '@utils';

type YearMonthState = {
    years: number[] | undefined;
    year: number | undefined;
    setYear: Dispatch<SetStateAction<number | undefined>>;
    months: string[] | undefined;
    month: string | undefined;
    setMonth: Dispatch<SetStateAction<string | undefined>>;
    loading: boolean;
    error: string | null;
};

const useYearMonth = (): YearMonthState => {
    const { years, year, setYear, loading: yearLoading, error: yearError } = useYear();
    const [months, setMonths] = useState<string[]>();
    const [month, setMonth] = useState<string>();
    const [monthsLoading, setMonthsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch(selectedYear: number) {
            try {
                setMonthsLoading(true);
                setError(null);
                const months = await API.getMonths(selectedYear);
                setMonths(months);
                setMonth(months[0]);
            } catch (err) {
                setError(toErrorMessage(err));
            } finally {
                setMonthsLoading(false);
            }
        }
        if (year) {
            fetch(year);
        }
    }, [year]);

    return { years, year, setYear, months, month, setMonth, loading: yearLoading || monthsLoading, error: yearError || error };
};

export default useYearMonth;
