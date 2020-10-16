import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from './PageNotFound';

const Routes = ({ menu }) => (
    <Switch>
        <Route key="0-default" exact path="/" component={menu[0].component} />
        {menu.map((route, index) => (
            <Route key={route.pathname} path={route.pathname} component={route.component} />
        ))}
        <Route key="0-error" component={PageNotFound} />
    </Switch>
);

export default Routes;
