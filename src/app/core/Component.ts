/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import {injector} from './Injector';
import {refs} from '../common/bootstrap';

export class Component<TProps, TState> extends React.Component<TProps, TState> {

    getRefs(): IState {
        return refs;
    }

    createAction<ActionType>(actionClass): ActionType {
        return injector.get<ActionType>(actionClass);
    }
}