import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Message = ({ severity, message }) => {
    const classes = useStyles();

    return message ? (
        <div className={classes.root}>
            <Alert severity={severity}>
                <AlertTitle>{message}</AlertTitle>
            </Alert>
        </div>
    ) : null;
};

export default Message;
