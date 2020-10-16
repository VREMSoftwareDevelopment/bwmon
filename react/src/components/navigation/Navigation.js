import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import useNavigation from './UseNavigation';

const useStyles = makeStyles({});

const Navigation = ({ menu }) => {
    const classes = useStyles();
    const { index, setIndex } = useNavigation(menu);

    const handleChange = (event, newRouteIndex) => setIndex(newRouteIndex);

    return (
        <BottomNavigation value={index} onChange={handleChange} showLabels className={classes.root}>
            {menu.map((route, index) => (
                <BottomNavigationAction
                    id={route.id}
                    key={route.pathname}
                    value={index}
                    label={route.label}
                    icon={route.icon}
                    component={Link}
                    to={route.pathname}
                />
            ))}
        </BottomNavigation>
    );
};

export default Navigation;
