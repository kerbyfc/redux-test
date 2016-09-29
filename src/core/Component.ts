/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import {injectable} from './Injector';
import {stateRefs} from '../state';

@injectable()
export class Component<TProps, TState> extends React.Component<TProps, TState> {
    private static injector: IInjector;

    protected readonly $: IAppStateRef = stateRefs;

    protected get injector(): IInjector {
        return Component.injector;
    }

    protected createAction<TAction>(actionClass): TAction {
        return this.injector.get<TAction>(actionClass);
    }
}
