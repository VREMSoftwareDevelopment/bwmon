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
import { create } from 'react-test-renderer';
import { Pagination, rowsPerPageOptions } from './Pagination';

describe('Pagination', () => {
    const handlePageChange = (event, newPage) => {};

    const handleRowsPerPageChange = (event) => {};

    test('renders correctly', () => {
        const tree = create(
            <Pagination
                colSpan={7}
                count={20}
                minumum={5}
                rowsPerPage={10}
                page={0}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('rowsPerPageOptions when rows per page is the same as count', () => {
        const rowsPerPage = 10;
        const count = 10;
        const expected = [rowsPerPage];
        const actual = rowsPerPageOptions(rowsPerPage, count);
        expect(actual).toEqual(expected);
    });

    test('rowsPerPageOptions when rows per page is the larger than count', () => {
        const rowsPerPage = 10;
        const count = 9;
        const expected = [rowsPerPage];
        const actual = rowsPerPageOptions(rowsPerPage, count);
        expect(actual).toEqual(expected);
    });

    test('rowsPerPageOptions when rows per page is the less than count', () => {
        const rowsPerPage = 1;
        const count = 20;
        const expected = [1, 2, 4, 8, 16, 20];
        const actual = rowsPerPageOptions(rowsPerPage, count);
        expect(actual).toEqual(expected);
    });
});
