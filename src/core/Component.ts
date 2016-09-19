/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import {injector} from './Injector';
import {getStateRefs} from '../state';

export class Component<TProps, TState> extends React.Component<TProps, TState> {

    // global state
    get $(): IAppStateRef {
        return getStateRefs();
    }

    set $(value) {}

    /**
     * TODO: use metadata reflection api
     */
    createAction<ActionType>(actionClass): ActionType {
        return injector.get<ActionType>(actionClass);
    }
}
