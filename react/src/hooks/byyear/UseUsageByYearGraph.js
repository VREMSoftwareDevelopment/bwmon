import { useState, useEffect } from 'react';
import { usageInGBytes } from '../../utils/ConversionUtils';
import useUsageByYear from './UseUsageByYear';

const useUsageByYearGraph = () => {
    const { data, loading, error } = useUsageByYear();
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (data) {
            setOptions({
                chart: {
                    id: 'usage-by-year',
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: data.map((element) => element.id).reverse(),
                },
            });

            setSeries([
                {
                    name: 'Total Usage',
                    data: data.map((element) => Math.round(usageInGBytes(element.total))).reverse(),
                },
            ]);
        }
    }, [data]);

    return { options, series, loading, error };
};

export default useUsageByYearGraph;
