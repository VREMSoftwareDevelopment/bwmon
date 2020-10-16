import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useNavigation = (menu) => {
    const [index, setIndex] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const current = menu.findIndex((routeInfo) => routeInfo.pathname === location.pathname);
        setIndex(current === -1 ? 0 : current);
    }, [location, menu]);

    return { index, setIndex };
};

export default useNavigation;
