/*
 *      Copyright (C) 2010 - 2026 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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

import type { SyntheticEvent } from 'react';
import { Link } from 'react-router';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import useNavigation from './UseNavigation';
import type { MenuItem } from './MenuItem';

const options = { width: '100%' };

interface NavigationProps {
    menu: readonly Pick<MenuItem, 'id' | 'pathname' | 'label' | 'icon'>[];
}

const Navigation = ({ menu }: NavigationProps) => {
    const { index, setIndex } = useNavigation(menu);

    const handleChange = (event: SyntheticEvent, newRouteIndex: number) => setIndex(newRouteIndex);

    return (
        <BottomNavigation value={index} onChange={handleChange} showLabels sx={options}>
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

export default Navigation;
