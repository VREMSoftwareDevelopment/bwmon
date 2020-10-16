import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography id="app-title" variant="h6" className={classes.title}>
                    {process.env.REACT_APP_DESCRIPTION}
                </Typography>
                <Typography id="app-version" className={classes.text}>
                    {process.env.REACT_APP_VERSION}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
