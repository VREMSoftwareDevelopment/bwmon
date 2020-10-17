import React from 'react';
import { FormControl, Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';
import DropDown from '../../components/inputs/DropDown';
import useUsageByMonthGraph from '../../hooks/bymonth/UseUsageByMonthGraph';
import Loading from '../../components/loading/Loading';

const UsageByMonthGraph = () => {
    const { options, series, years, year, setYear, loading } = useUsageByMonthGraph();

    const handleChangeYear = (event) => setYear(event.target.value);

    return (
        <Paper>
            <Loading isLoading={loading} />
            <FormControl>
                <DropDown id="month-year-graph" onChange={handleChangeYear} items={years} value={year} />
            </FormControl>
            <Chart options={options} series={series} type="bar" height={500} />
        </Paper>
    );
};

export default UsageByMonthGraph;
