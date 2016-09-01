import * as React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import {APP_COMPONENT_SELECTOR} from '../shared/constants';
import {ROUTES} from '../shared/router';

// TODO: check if there is no need in history package
render(<Router children={ROUTES} history={browserHistory} />,
    document.querySelector(APP_COMPONENT_SELECTOR)
);
