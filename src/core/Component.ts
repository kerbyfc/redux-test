/**
 * External imports
 */
import * as React from 'react';
import * as _ from 'lodash';
import * as classname from 'classnames';

/**
 * Local imports
 */
import {injector} from './Injector';
import {IStateRef, getStateRefs} from '../state';

export class Component<TProps, TState> extends React.Component<TProps, TState> {

    // global state
    get $(): IStateRef {
        return getStateRefs();
    }

    set $(value) {}

    class = (...args: any[]) => {
        return classname(...args);
    };

    /**
     * TODO: use metadata reflection api
     */
    createAction<ActionType>(actionClass): ActionType {
        return injector.get<ActionType>(actionClass);
    }
}

export default Component;
