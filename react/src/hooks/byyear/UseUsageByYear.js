import { useState, useEffect } from 'react';
import API from '../../services/API';

const useUsageByYear = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const usageByYear = await API.getUsageByYear();
            setData(usageByYear);
            setLoading(false);
        }
        fetch();
    }, []);

    return { data, loading };
};

export default useUsageByYear;
