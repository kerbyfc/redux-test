import * as React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import {APP_COMPONENT_ID} from '../shared/constants';
import {ROUTES} from '../shared/router';

// TODO: check if there is no need in history package
render(<Router children={ROUTES} history={browserHistory} />,
    document.getElementById(APP_COMPONENT_ID)
);
