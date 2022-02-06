/*
 *      Copyright (C) 2010 - 2020 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
});

const Header = ({ name, version }) => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography id="app-title" variant="h6" className={classes.title}>
                    {name}
                </Typography>
                <Typography id="app-version" className={classes.text}>
                    {version}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
