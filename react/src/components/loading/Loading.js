import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Info from '../messages/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Loading = ({ isLoading }) => {
    const classes = useStyles();

    return isLoading ? (
        <div className={classes.root}>
            <LinearProgress />
            <Info message="Loading..." />
        </div>
    ) : null;
};

export default Loading;
