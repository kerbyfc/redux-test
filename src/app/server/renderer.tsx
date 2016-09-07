/**
 * External imports
 */
import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {RouterContext} from 'react-router';

/**
 * Local imports
 */
import {bootstrap} from '../common/bootstrap';
import {VARS} from '../constants/vars';

const layout = fs.readFileSync(path.join(__dirname, '../index.html')).toString();
function embedReactApplictionToLayout({view, state}) {
    return _.template(layout)({view, state, applicationId: VARS.APP_COMPONENT_ID});
}

export function render(renderProps) {
    return new Promise<string>((resolve) => {

        const {store, state} = bootstrap();

        let view = renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        resolve(embedReactApplictionToLayout({view, state}));
    });
}
