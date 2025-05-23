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
import { Route, Routes } from 'react-router';
import PageNotFound from './PageNotFound';

const BWMonRoutes = ({ menu }) => {
    return (
        <Routes>
            <Route key="0-default" path="/" element={menu[0].element} />
            {menu.map((route, _index) => (
                <Route key={route.pathname} path={route.pathname} element={route.element} />
            ))}
            <Route key="0-error" Component={<PageNotFound />} />
        </Routes>
    );
};

BWMonRoutes.propTypes = {
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            pathname: PropTypes.string.isRequired,
            element: PropTypes.element.isRequired,
        })
    ).isRequired,
};

export default BWMonRoutes;
