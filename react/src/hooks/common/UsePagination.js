import { useState } from 'react';

const usePagination = (rowsPerPageDefault) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDefault);

    return { page, setPage, rowsPerPage, setRowsPerPage };
};

export default usePagination;
