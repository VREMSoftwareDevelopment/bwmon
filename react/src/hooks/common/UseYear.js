import { useState, useEffect } from 'react';
import API from '../../services/API';

const useYear = () => {
    const [years, setYears] = useState();
    const [year, setYear] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            try {
                const years = await API.getYears();
                setYears(years);
                setYear(years[0]);
                setLoading(false);
                setError(null);
            } catch (e) {
                setLoading(false);
                setError(e.message);
            }
        }
        fetch();
    }, []);

    return { years, year, setYear, loading, error };
};

export default useYear;
