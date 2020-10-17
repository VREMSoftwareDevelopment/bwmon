import { useState, useEffect } from 'react';
import API from '../../services/API';
import useYearMonth from '../common/UseYearMonth';

const useUsageByUser = () => {
    const { years, year, setYear, months, month, setMonth } = useYearMonth();
    const [filter, setFilter] = useState('');
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const usageByUser = await API.getUsageByUser(year, month, filter);
            setData(usageByUser);
            setLoading(false);
        }
        if (year && month) {
            fetch();
        }
    }, [year, month, filter]);

    return { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading };
};

export default useUsageByUser;
