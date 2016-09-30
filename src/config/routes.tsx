import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App/App';
import {ClientForm} from '../containers/ClientForm/ClientForm';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={ClientForm}/>
  </Route>
);
