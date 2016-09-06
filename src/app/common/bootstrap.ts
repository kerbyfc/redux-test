/**
 * External imports
 */
import {createStore} from 'redux';

/**
 * Import injector before providers
 */
import {injector} from '../core/Injector';

/**
 * Import providers
 */
import {AppReducer} from './reducers/AppReducer';
import {ClientFormReducer} from './reducers/ClientFormReducer';
import {Dispatcher} from '../core/Dispatcher';
import {OnlyRussianCharsValidator} from './validators/OnlyRussianCharsValidator';
import {TextLengthValidator} from './validators/TextLengthValidator';
import {Validator} from '../core/Validator';

injector.registerProviders([
    /**
     * Core
     */
    Dispatcher,
    Validator,

    /**
     * Reducers
     */
    AppReducer,
    ClientFormReducer,

    /**
     * Validators
     */
    TextLengthValidator,
    OnlyRussianCharsValidator
]);

export const reducers = injector.get(AppReducer).release();

export function startApplication(state?) {
    const dispatcher: Dispatcher = injector.get(Dispatcher);
    const store = createStore(reducers, state);
    dispatcher.attachStore(store);
    return {store, state: store.getState()};
}