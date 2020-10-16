import React from 'react';
import { Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';
import useUsageByYearGraph from '../../hooks/byyear/UseUsageByYearGraph';
import Loading from '../../components/loading/Loading';
import Error from '../../components/messages/Error';

const UsageByYearGraph = () => {
    const { options, series, loading, error } = useUsageByYearGraph();

    return (
        <Paper>
            <Error message={error} />
            <Loading isLoading={loading} />
            <Chart options={options} series={series} type="bar" height={500} />
        </Paper>
    );
};

export default UsageByYearGraph;
