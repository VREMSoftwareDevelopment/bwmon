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
 * Custom React hook for fetching and managing year selection.
 */
import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { API } from '@services';

type YearState = {
    years: number[] | undefined;
    year: number | undefined;
    setYear: Dispatch<SetStateAction<number | undefined>>;
    error: string | null;
};

const useYear = (): YearState => {
    const [years, setYears] = useState<number[]>();
    const [year, setYear] = useState<number>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch() {
            try {
                setError(null);
                const years = await API.getYears();
                setYears(years);
                setYear(years[0]);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            }
        }
        fetch();
    }, []);

    return { years, year, setYear, error };
};

export default useYear;
