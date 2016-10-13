/**
 * External imports
 */
import {browserHistory} from 'react-router';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {routerMiddleware} from 'react-router-redux';

/**
 * Local imports
 */
import {injector} from './providers';
import {AppReducer} from '../reducers/App';
import {Dispatcher} from '../core/Dispatcher';
import {routerReducer} from 'react-router-redux';
import {initialState} from './initialState';
import {IStore} from '~react-redux~redux';

/* tslint:disable:no-string-literal */
const devTools = global['devToolsExtension'] || (() => noop => noop);
/* tslint:enable:no-string-literal */

function getReducers() {
	return injector.get(AppReducer).release();
}

export default function configureStore(state: Object = initialState): IStore<IAppState> {
	const reducers = getReducers();
	const dispatcher: Dispatcher = injector.get(Dispatcher);

	const middlewares = [
		routerMiddleware(browserHistory)
	];

	const store = createStore(
		combineReducers(Object.assign(reducers, {
			routing: routerReducer
		})),
		state,
		compose(
			applyMiddleware(...middlewares),
			devTools()
		)
	) as any;

	dispatcher.attachStore(store);

	/* tslint:disable:no-string-literal */
	if (process.env.NODE_ENV === 'development' && module['hot']) {
		module['hot'].accept('./reducers', () => {
			const AppReducer = require('./../reducers/App').AppReducer;
			injector.bind(AppReducer);

			const newReducers = getReducers();

			store.replaceReducer(combineReducers(Object.assign(newReducers, {
				routing: routerReducer
			})));
		});
	}
	/* tslint:enable:no-string-literal */

	return store;
}
