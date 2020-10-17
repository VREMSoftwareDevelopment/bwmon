import React from 'react';
import { Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';
import useUsageByYearGraph from '../../hooks/byyear/UseUsageByYearGraph';
import Loading from '../../components/loading/Loading';

const UsageByYearGraph = () => {
    const { options, series, loading } = useUsageByYearGraph();

    return (
        <Paper>
            <Loading isLoading={loading} />
            <Chart options={options} series={series} type="bar" height={500} />
        </Paper>
    );
};

export default UsageByYearGraph;
