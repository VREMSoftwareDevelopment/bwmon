import { useState } from 'react';

const useSort = (ascendingDefault, orderByDefault) => {
    const [ascending, setAscending] = useState(ascendingDefault);
    const [orderBy, setOrderBy] = useState(orderByDefault);

    return { ascending, setAscending, orderBy, setOrderBy };
};

export default useSort;
