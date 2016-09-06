/**
 * External imports
 */
import * as Redux from 'redux';
import Store = Redux.Store;

/**
 * Local imports
 */
import {injectable} from './Injector';

@injectable()
export class Dispatcher {

    protected static store;

    attachStore(store) {
        Dispatcher.store = store;
    }

    dispatch(data) {
        Dispatcher.store.dispatch(data);
    }
}
