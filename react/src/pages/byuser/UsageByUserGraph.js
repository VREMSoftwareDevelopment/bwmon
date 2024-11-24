/*
 *      Copyright (C) 2010 - 2024 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { makeStyles } from '@mui/styles';
import { Paper, Grid2 } from '@mui/material';
import DropDown from '../../components/inputs/DropDown';
import Search from '../../components/inputs/Search';
import useUsageByUserGraph from '../../hooks/byuser/UseUsageByUserGraph';
import Loading from '../../components/loading/Loading';
import Graph from '../../components/graph/Graph';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
        marginTop: 6,
    },
}));

const UsageByUserGraph = () => {
    const classes = useStyles();

    const { options, series, years, year, setYear, months, month, setMonth, setFilter, loading } = useUsageByUserGraph();

    const handleChangeYear = (event) => setYear(event.target.value);

    const handleChangeMonth = (event) => setMonth(event.target.value);

    const handleChangeFilter = (event) => setFilter(event.target.value);

    const itemYear = () => (
        <Grid2 item sm={2}>
            <DropDown data-testid="user-year-graph" id="user-year-graph" onChange={handleChangeYear} items={years} value={year} />
        </Grid2>
    );

    const itemMonth = () => (
        <Grid2 item sm={2}>
            <DropDown
                data-testid="user-month-graph"
                id="user-month-graph"
                onChange={handleChangeMonth}
                items={months}
                value={month}
            />
        </Grid2>
    );

    const itemUser = () => (
        <Grid2 item sm={4}>
            <Search data-testid="user-filter-graph" id="user-filter-graph" onChange={handleChangeFilter} />
        </Grid2>
    );

    const items = () => (
        <div className={classes.root}>
            <Grid2 container spacing={4}>
                {itemYear()}
                {itemMonth()}
                {itemUser()}
            </Grid2>
        </div>
    );

    return (
        <Paper>
            <Loading isLoading={loading} />
            {items()}
            <Graph options={options} series={series} />
        </Paper>
    );
};

export default UsageByUserGraph;
