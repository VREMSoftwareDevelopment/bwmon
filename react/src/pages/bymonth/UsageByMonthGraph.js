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
import useUsageByMonthGraph from '../../hooks/bymonth/UseUsageByMonthGraph';
import Loading from '../../components/loading/Loading';
import Graph from '../../components/graph/Graph';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
}));

const UsageByMonthGraph = () => {
    const classes = useStyles();

    const { options, series, years, year, setYear, loading } = useUsageByMonthGraph();

    const handleChangeYear = (event) => setYear(event.target.value);

    const filters = () => (
        <div className={classes.root} style={{ marginTop: '0px' }}>
            <Grid2 container>
                <Grid2 item sm={2} style={{ padding: '6px 16px 6px 0px' }}>
                    <DropDown
                        data-testid="month-year-graph"
                        id="month-year-graph"
                        onChange={handleChangeYear}
                        items={years}
                        value={year}
                    />
                </Grid2>
            </Grid2>
        </div>
    );

    return (
        <Paper>
            <Loading isLoading={loading} />
            {filters()}
            <Graph options={options} series={series} />
        </Paper>
    );
};

export default UsageByMonthGraph;
