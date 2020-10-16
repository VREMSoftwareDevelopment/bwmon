import { useState, useEffect } from 'react';
import API from '../../services/API';
import useYear from '../common/UseYear';

const useUsageByMonth = () => {
    const { years, year, setYear } = useYear();
    const [data, setData] = useState({ usage: [], total: [] });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            try {
                const usageByMonth = await API.getUsageByMonth(year);
                setData(usageByMonth);
                setLoading(false);
                setError(null);
            } catch (e) {
                setLoading(false);
                setError(e.message);
            }
        }
        if (year) {
            fetch();
        }
        setLoading(true);
        setError(null);
    }, [year]);

    return { years, year, setYear, data, loading, error };
};

export default useUsageByMonth;
