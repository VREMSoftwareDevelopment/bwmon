/*
 *      Copyright (C) 2010 - 2025 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
import { Box, LinearProgress } from '@mui/material';
import InfoMessage from '../messages/InfoMessage';
import PropTypes from 'prop-types';

const Loading = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }
    return (
        <Box sx={{ width: '100%', '& > * + *': { mt: 2 } }}>
            <LinearProgress />
            <InfoMessage message="Loading..." />
        </Box>
    );
};

// Stryker disable next-line all
Loading.propTypes = { isLoading: PropTypes.bool.isRequired };

export default Loading;
