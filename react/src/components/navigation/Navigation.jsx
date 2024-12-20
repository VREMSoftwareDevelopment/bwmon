/*
 *      Copyright (C) 2010 - 2024 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *           http: //www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 * Bandwidth Monitor
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import useNavigation from './UseNavigation';
import { defaultStyles } from '../../utils/StylesUtils';

const Navigation = ({ menu }) => {
    const classes = defaultStyles();
    const { index, setIndex } = useNavigation(menu);

    const handleChange = (event, newRouteIndex) => setIndex(newRouteIndex);

    return (
        <BottomNavigation value={index} onChange={handleChange} showLabels className={classes.root}>
            {menu.map((route, index) => (
                <BottomNavigationAction
                    data-testid={route.id}
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

Navigation.propTypes = {
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            pathname: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.element.isRequired,
        })
    ).isRequired,
};

export default Navigation;
