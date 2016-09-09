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
import {InputChangeAction} from './actions/InputChangeAction';
import {DateValidator} from './validators/DateValidator';
import {PatternValidator} from './validators/PatternValidator';
import {PassportValidator} from './validators/PassportValidator';

/**
 * Singletons
 */
injector.bindSingleton<AppReducer>(AppReducer);
injector.bindSingleton<Dispatcher>(Dispatcher);

injector.registerProviders([
    /**
     * Core
     */
    Validator,

    /**
     * Reducers
     */
    ClientFormReducer,

    /**
     * Actions
     */
    InputChangeAction,

    /**
     * Actors // TODO
     */

    /**
     * Validators
     */
    TextLengthValidator,
    OnlyRussianCharsValidator,
    PatternValidator,
    PassportValidator,
    DateValidator
]);

// TODO: refactor, there should not be imports from coommon bootstrap in code
// search '../common/bootstrap'
const {reduceFunction, refs: references} = injector.get(AppReducer).release();
export const reducers = reduceFunction;
export const refs = references;

export function bootstrap(state?) {
    const dispatcher: Dispatcher = injector.get(Dispatcher);
    const store = createStore(reduceFunction, state);
    dispatcher.attachStore(store);
    return {store, state: store.getState()};
}