import { useState, useEffect } from 'react';
import { usageInGBytes } from '../../utils/ConversionUtils';
import useUsageByUser from './UseUsageByUser';

const useUsageByYearGraph = () => {
    const { years, year, setYear, months, month, setMonth, filter, setFilter, data, loading, error } = useUsageByUser();
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (data) {
            setOptions({
                chart: {
                    id: 'usage-by-user',
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: data.usage.map((element) => element.IP),
                },
            });

            setSeries([
                {
                    name: 'Total Usage',
                    data: data.usage.map((element) => Number(usageInGBytes(element.total)).toFixed(1)),
                },
            ]);
        }
    }, [data]);

    return { options, series, years, year, setYear, months, month, setMonth, filter, setFilter, loading, error };
};

export default useUsageByYearGraph;
