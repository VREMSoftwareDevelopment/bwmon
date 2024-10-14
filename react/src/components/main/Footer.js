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
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

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
            <Typography data-testid="app-footer1" id="app-footer1" variant="subtitle2">
                All usage information is in gigabytes
            </Typography>
            <Typography data-testid="app-footer2" id="app-footer2" variant="subtitle2">
                This page was generated on {currentTime}
            </Typography>
        </div>
    );
};

Footer.propTypes = {
    currentTime: PropTypes.string.isRequired,
};

export default Footer;
