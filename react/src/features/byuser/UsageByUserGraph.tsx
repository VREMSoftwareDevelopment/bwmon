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

import type { ChangeEvent } from 'react';
import { Paper } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { DropDown, Graph, Loading, Search, Toolbar } from '@components';
import { useUsageByUserGraph } from '.';

const UsageByUserGraph = () => {
    const { options, series, years, year, setYear, months, month, setMonth, setFilter, loading } = useUsageByUserGraph();

    const handleChangeYear = (event: SelectChangeEvent<number>) => setYear(event.target.value);

    const handleChangeMonth = (event: SelectChangeEvent<string>) => setMonth(event.target.value);

    const handleChangeFilter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(event.target.value);

    return (
        <Paper>
            <Loading isLoading={loading} />
            <Toolbar>
                <DropDown
                    data-testid="user-year-graph"
                    id="user-year-graph"
                    onChange={handleChangeYear}
                    items={years}
                    value={year}
                />
                <DropDown
                    data-testid="user-month-graph"
                    id="user-month-graph"
                    onChange={handleChangeMonth}
                    items={months}
                    value={month}
                />
                <Search data-testid="user-filter-graph" id="user-filter-graph" onChange={handleChangeFilter} />
            </Toolbar>
            <Graph options={options} series={series} />
        </Paper>
    );
};

export default UsageByUserGraph;
