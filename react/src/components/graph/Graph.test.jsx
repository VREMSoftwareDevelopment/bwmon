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
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Graph from './Graph';

jest.mock('react-apexcharts', () => ({ __esModule: true, default: () => <div data-testid="apex-chart">ApexGraph</div> }));

describe('Graph', () => {
    const options = {
        xaxis: {
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
    };
    const series = [
        {
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
        },
    ];

    it('renders chart with provided options and series', async () => {
        render(<Graph options={options} series={series} />);
        expect(await screen.findByTestId('apex-chart')).toBeInTheDocument();
    });
});
