import { useState, useEffect } from 'react';
import API from '../../services/API';

const useYear = () => {
    const [years, setYears] = useState();
    const [year, setYear] = useState();

    useEffect(() => {
        async function fetch() {
            try {
                const years = await API.getYears();
                setYears(years);
                setYear(years[0]);
            } catch (e) {
                console.log(e.message);
            }
        }
        fetch();
    }, []);

    return { years, year, setYear };
};

export default useYear;
