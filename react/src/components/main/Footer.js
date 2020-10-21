import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
}));

const Footer = ({ currentTime }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="subtitle2">All usage information is in gigabytes</Typography>
            <Typography variant="subtitle2">This page was generated on {currentTime}</Typography>
        </div>
    );
};

export default Footer;
