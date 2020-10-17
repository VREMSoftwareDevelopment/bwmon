import { useState, useEffect } from 'react';
import API from '../../services/API';
import useYear from '../common/UseYear';

const useUsageByMonth = () => {
    const { years, year, setYear } = useYear();
    const [data, setData] = useState({ usage: [], total: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const usageByMonth = await API.getUsageByMonth(year);
            setData(usageByMonth);
            setLoading(false);
        }
        if (year) {
            fetch();
        }
    }, [year]);

    return { years, year, setYear, data, loading };
};

export default useUsageByMonth;
