/**
 * External imports
 */
import * as React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

/**
 * Local imports
 */
import './providers';
import configureStore from './store';
import routes from './routes';

/* tslint:disable:no-var-requires */
require('./styles/global.scss');
/* tslint:enable:no-var-requires */

/* tslint:disable:no-string-literal */
const preloadedState = global['window'] && global['window']['__PRELOADED__'];
/* tslint:enable:no-string-literal */

/* tslint:disable:no-string-literal */
if (module['hot']) {
  module['hot'].accept();
}
/* tslint:enable:no-string-literal */

const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
