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

import React from 'react';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DropDown, Graph, Loading, Search } from '@components';
import { useUsageByUserGraph } from '@hooks';

const options = { flexGrow: 1, m: 2, mt: 6 };

const UsageByUserGraph = () => {
    const { options, series, years, year, setYear, months, month, setMonth, setFilter, loading } = useUsageByUserGraph();

    const handleChangeYear = (event) => setYear(event.target.value);

    const handleChangeMonth = (event) => setMonth(event.target.value);

    const handleChangeFilter = (event) => setFilter(event.target.value);

    return (
        <Paper>
            <Loading isLoading={loading} />
            <Box sx={options}>
                <Grid container spacing={4}>
                    <Grid size={2}>
                        <DropDown
                            data-testid="user-year-graph"
                            id="user-year-graph"
                            onChange={handleChangeYear}
                            items={years}
                            value={year}
                        />
                    </Grid>
                    <Grid size={2}>
                        <DropDown
                            data-testid="user-month-graph"
                            id="user-month-graph"
                            onChange={handleChangeMonth}
                            items={months}
                            value={month}
                        />
                    </Grid>
                    <Grid size={4}>
                        <Search data-testid="user-filter-graph" id="user-filter-graph" onChange={handleChangeFilter} />
                    </Grid>
                </Grid>
            </Box>
            <Graph options={options} series={series} />
        </Paper>
    );
};

export default UsageByUserGraph;
