import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Chart from 'react-apexcharts';
import DropDown from '../../components/inputs/DropDown';
import Search from '../../components/inputs/Search';
import useUsageByUserGraph from '../../hooks/byuser/UseUsageByUserGraph';
import Loading from '../../components/loading/Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
}));

const UsageByUserGraph = () => {
    const classes = useStyles();

    const { options, series, years, year, setYear, months, month, setMonth, setFilter, loading } = useUsageByUserGraph();

    const handleChangeYear = (event) => setYear(event.target.value);

    const handleChangeMonth = (event) => setMonth(event.target.value);

    const handleChangeFilter = (event) => setFilter(event.target.value);

    const filters = () => (
        <div className={classes.root}>
            <Grid container>
                <Grid item sm={2}>
                    <DropDown id="user-year" onChange={handleChangeYear} items={years} value={year} />
                </Grid>
                <Grid item sm={2}>
                    <DropDown id="user-month" onChange={handleChangeMonth} items={months} value={month} />
                </Grid>
                <Grid item sm={4}>
                    <Search id="user-filter" onChange={handleChangeFilter} />
                </Grid>
                <Grid item sm={4}></Grid>
            </Grid>
        </div>
    );

    return (
        <Paper>
            <Loading isLoading={loading} />
            {filters()}
            <Chart options={options} series={series} type="bar" height={500} />
        </Paper>
    );
};

export default UsageByUserGraph;
