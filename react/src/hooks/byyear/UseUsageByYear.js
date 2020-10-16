import { useState, useEffect } from 'react';
import API from '../../services/API';

const useUsageByYear = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            try {
                const usageByYear = await API.getUsageByYear();
                setData(usageByYear);
                setLoading(false);
                setError(null);
            } catch (e) {
                setLoading(false);
                setError(e.message);
            }
        }
        fetch();
    }, []);

    return { data, loading, error };
};

export default useUsageByYear;
