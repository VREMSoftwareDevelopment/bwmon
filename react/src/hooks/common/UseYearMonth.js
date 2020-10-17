import { useState, useEffect } from 'react';
import API from '../../services/API';
import useYear from './UseYear';

const useYearMonth = () => {
    const { years, year, setYear } = useYear();
    const [months, setMonths] = useState();
    const [month, setMonth] = useState();

    useEffect(() => {
        async function fetch() {
            const months = await API.getMonths(year);
            setMonths(months);
            setMonth(months[0]);
        }
        if (year) {
            fetch();
        }
    }, [year]);

    return { years, year, setYear, months, month, setMonth };
};

export default useYearMonth;
