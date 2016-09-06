import * as React from 'react';
import {Route} from 'react-router';
import {AppComponent} from './components/AppComponent';
import {MainPageComponent} from './components/MainPageComponent';
import {IndexRoute} from 'react-router';
import {ClientFormComponent} from './components/ClientFormComponent';

export const ROUTES = (
    <Route name="app" component={AppComponent}>
        <Route path="/" component={MainPageComponent}>
            <IndexRoute component={ClientFormComponent} />
        </Route>
    </Route>
);

