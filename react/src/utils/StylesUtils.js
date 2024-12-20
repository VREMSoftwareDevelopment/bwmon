import { makeStyles } from '@mui/styles';

const defaultStyles = makeStyles({});

const footerStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
}));

const graphStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
        marginTop: 6,
    },
}));

const headerStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
});

const messageStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const paginationStyles = makeStyles((_theme) => ({
    root: {
        flexShrink: 0,
    },
}));

export { defaultStyles, footerStyles, graphStyles, headerStyles, messageStyles, paginationStyles };
