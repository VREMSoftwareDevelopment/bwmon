export const comparator = (isAscending, orderBy) => {
    const ascending = (a, b, orderBy) => (a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0);
    const descending = (a, b, orderBy) => (a[orderBy] > b[orderBy] ? -1 : a[orderBy] < b[orderBy] ? 1 : 0);
    return isAscending ? (a, b) => ascending(a, b, orderBy) : (a, b) => descending(a, b, orderBy);
};

export const sort = (values, comparator) => [...values].sort(comparator);
