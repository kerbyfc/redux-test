/**
 * External imports
 */
import * as React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {RouterContext} from 'react-router';

/**
 * Local imports
 */
import {REDUCERS} from '../shared/reducers/root';

interface IInitialData {
    view: string;
    state: {};
}

export function bootstrap(renderProps) {
    return new Promise<IInitialData>((resolve) => {
        const store = createStore(REDUCERS);
        const state = store.getState();

        const view = renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        resolve({view, state});
    });
}
