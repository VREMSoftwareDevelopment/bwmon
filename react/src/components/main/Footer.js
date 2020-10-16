import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    footer: {
        margin: theme.spacing(1),
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Typography variant="subtitle2" className={classes.footer}>
            All usage information is in gigabytes
        </Typography>
    );
};

export default Footer;
