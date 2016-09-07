/**
 * External imports
 */
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';
import {Router} from 'react-router';

/**
 * Local imports
 */
import {ROUTES} from '../common/routes';
import {VARS} from '../constants/vars';
import {bootstrap} from '../common/bootstrap';

const state = JSON.parse(window['__INITIAL_STATE__']);
const {store} = bootstrap(state);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={ROUTES} />
    </Provider>,
    document.getElementById(VARS.APP_COMPONENT_ID)
);
