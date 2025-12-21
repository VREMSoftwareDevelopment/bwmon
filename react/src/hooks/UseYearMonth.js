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
 * Custom React hook for managing year and month selection.
 * @returns {{ years, year, setYear, months, month, setMonth, error }}
 */
import { useState, useEffect } from 'react';
import { API } from '@services';
import { useYear } from './index';

const useYearMonth = () => {
    const { years, year, setYear, error: yearError } = useYear();
    const [months, setMonths] = useState();
    const [month, setMonth] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetch() {
            try {
                setError(null);
                const months = await API.getMonths(year);
                setMonths(months);
                setMonth(months[0]);
            } catch (err) {
                setError(err.message);
            }
        }
        if (year) {
            fetch();
        }
    }, [year]);

    return { years, year, setYear, months, month, setMonth, error: yearError || error };
};

export default useYearMonth;
