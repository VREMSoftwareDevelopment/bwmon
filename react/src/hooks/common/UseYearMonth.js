import { useState, useEffect } from 'react';
import API from '../../services/API';
import useYear from './UseYear';

const useYearMonth = () => {
    const { years, year, setYear } = useYear();
    const [months, setMonths] = useState();
    const [month, setMonth] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            try {
                const months = await API.getMonths(year);
                setMonths(months);
                setMonth(months[0]);
                setLoading(false);
                setError(null);
            } catch (e) {
                setLoading(false);
                setError(e.message);
            }
        }
        if (year) {
            setLoading(true);
            setError(null);
            fetch();
        }
    }, [year]);

    return { years, year, setYear, months, month, setMonth, loading, error };
};

export default useYearMonth;
