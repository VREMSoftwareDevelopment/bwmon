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
import PropTypes from 'prop-types';
import { Alert, AlertTitle, Box } from '@mui/material';

const options = { width: '100%', mb: 2 };

const Message = ({ severity, message }) => {
    return message ? (
        <Box sx={options}>
            <Alert severity={severity}>
                <AlertTitle>{message}</AlertTitle>
            </Alert>
        </Box>
    ) : null;
};

Message.propTypes = { severity: PropTypes.string.isRequired, message: PropTypes.string };

export default Message;
