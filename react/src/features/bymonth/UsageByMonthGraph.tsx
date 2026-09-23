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

import { Paper } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { DropDown, Graph, Loading, Toolbar } from '@components';
import { useUsageByMonthGraph } from '.';

const UsageByMonthGraph = () => {
    const { options, series, years, year, setYear, loading } = useUsageByMonthGraph();

    const handleChangeYear = (event: SelectChangeEvent<number>) => setYear(event.target.value);

    return (
        <Paper>
            <Loading isLoading={loading} />
            <Toolbar>
                <DropDown
                    data-testid="month-year-graph"
                    id="month-year-graph"
                    onChange={handleChangeYear}
                    items={years}
                    value={year}
                />
            </Toolbar>
            <Graph options={options} series={series} />
        </Paper>
    );
};

export default UsageByMonthGraph;
