import { useState, useEffect } from 'react';
import API from '../../services/API';
import useYearMonth from '../common/UseYearMonth';

const useUsageByUser = () => {
    const { years, year, setYear, months, month, setMonth } = useYearMonth();
    const [filter, setFilter] = useState('');
    const [data, setData] = useState({ usage: [], total: [] });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            try {
                const usageByUser = await API.getUsageByUser(year, month, filter);
                setData(usageByUser);
                setLoading(false);
                setError(null);
            } catch (e) {
                setLoading(false);
                setError(e.message);
            }
        }
        if (year && month) {
            fetch();
        }
        setLoading(true);
        setError(null);
    }, [year, month, filter]);

    return { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading, error };
};

export default useUsageByUser;
