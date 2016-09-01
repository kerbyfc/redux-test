import * as React from 'react';
import {Route} from 'react-router';
import {App} from './components/App';

export const ROUTES = (
    <Route name='app' component={App} path='/'></Route>
);
