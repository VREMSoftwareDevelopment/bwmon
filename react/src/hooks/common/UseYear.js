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
 * Custom React hook for fetching and managing year selection.
 * @returns {{ years, year, setYear }}
 */
import { useState, useEffect } from 'react';
import API from '@services/API';

const useYear = () => {
    const [years, setYears] = useState();
    const [year, setYear] = useState();

    useEffect(() => {
        async function fetch() {
            const years = await API.getYears();
            setYears(years);
            setYear(years[0]);
        }
        fetch();
    }, []);

    return { years, year, setYear };
};

export default useYear;
