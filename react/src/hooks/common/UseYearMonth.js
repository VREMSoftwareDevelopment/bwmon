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
 * @returns {{ years, year, setYear, months, month, setMonth }}
 */
import { useState, useEffect } from 'react';
import API from '../../services/API';
import useYear from './UseYear';

const useYearMonth = () => {
    const { years, year, setYear } = useYear();
    const [months, setMonths] = useState();
    const [month, setMonth] = useState();

    useEffect(() => {
        async function fetch() {
            const months = await API.getMonths(year);
            setMonths(months);
            setMonth(months[0]);
        }
        if (year) {
            fetch();
        }
    }, [year]);

    return { years, year, setYear, months, month, setMonth };
};

export default useYearMonth;
