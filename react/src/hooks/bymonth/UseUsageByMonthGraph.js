import { useState, useEffect } from 'react';
import { toMonth, usageInGBytes } from '../../utils/ConversionUtils';
import useUsageByMonth from './UseUsageByMonth';

const useUsageByMonthGraph = () => {
    const { years, year, setYear, data, loading } = useUsageByMonth();
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (data) {
            setOptions({
                chart: {
                    id: 'usage-by-month',
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: data.usage.map((element) => toMonth(element.id)).reverse(),
                },
            });

            setSeries([
                {
                    name: 'Total Usage',
                    data: data.usage.map((element) => Math.round(usageInGBytes(element.total))).reverse(),
                },
            ]);
        }
    }, [data]);

    return { options, series, years, year, setYear, loading };
};

export default useUsageByMonthGraph;
