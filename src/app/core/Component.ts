/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import {injector} from './Injector';
import {refs} from '../common/bootstrap';
import {IRef, $, IAppState} from '../common/state';

export class Component<TProps, TState> extends React.Component<TProps, TState> {

    // global state
    get $(): IAppState {
        return refs;
    }

    ref<T>(input: $<T>): IRef<T> {
        return <IRef<T>>input;
    }

    createAction<ActionType>(actionClass): ActionType {
        return injector.get<ActionType>(actionClass);
    }
}