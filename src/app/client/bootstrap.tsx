import * as React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import {ROUTES} from '../shared/router';
import {VARS} from '../shared/constants/vars';

// TODO: check if there is no need in history package
render(<Router children={ROUTES} history={browserHistory} />,
    document.getElementById(VARS.APP_COMPONENT_ID)
);
