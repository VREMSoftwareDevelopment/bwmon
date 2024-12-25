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
import { AppBar, Toolbar, Typography } from '@mui/material';
import { headerStyles } from '../../utils/StylesUtils';

const Header = ({ name, version }) => {
    const classes = headerStyles();

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography data-testid="app-title" id="app-title" variant="h6" className={classes.title}>
                    {name}
                </Typography>
                <Typography data-testid="app-version" id="app-version" className={classes.text}>
                    {version}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    name: PropTypes.string.isRequired,
    version: PropTypes.string,
};

export default Header;
