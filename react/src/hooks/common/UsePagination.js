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

/**
 * Custom React hook for managing pagination state.
 * @param {number} rowsPerPageDefault - The default number of rows per page.
 * @returns {{
 *   page: number,
 *   setPage: function,
 *   rowsPerPage: number,
 *   setRowsPerPage: function
 * }} Pagination state and setters.
 */
import { useState } from 'react';

const usePagination = (rowsPerPageDefault) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDefault);

    return { page, setPage, rowsPerPage, setRowsPerPage };
};

export default usePagination;
