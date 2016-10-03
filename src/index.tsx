/**
 * External imports
 */
import * as React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

/**
 * Importing of reflect-metadata should
 * bee done once, so it can't be placed in
 * Injector.ts file 
 */
import 'reflect-metadata';

/**
 * Local imports
 */
import configureStore from './config/store';
import routes from './config/routes';
import './styles/global.scss';

/* tslint:disable:no-string-literal */
const preloadedState = global['window'] && global['window']['__PRELOADED__'];
if (module['hot']) {
  module['hot'].accept();
}

const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
