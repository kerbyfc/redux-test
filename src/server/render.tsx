/**
 * External imports
 */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

/**
 * Local imports
 */
import configureStore from '../config/store';
import compileAssets from './compileAssets';
import Document from '../containers/Document/Document';

function render(req, res, renderProps) {
	const store = configureStore();

	/*
	 const { components, params } = renderProps;
	 // TODO
	 const preloaders = components
        .filter(component => component && component.preload)
        .map(component => component.preload(params))
        .reduce((result, preloader) => result.concat(preloader), []);
	*/

	const app = (
		<Provider store={store}>
			<RouterContext {...renderProps} />
		</Provider>
	);

	res.send('<!DOCTYPE HTML>\n' + renderToString(
		<Document app={app} assets={compileAssets()} server store={store} />
	));
}

export default render;
