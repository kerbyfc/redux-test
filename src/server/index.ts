/**
 * External imports
 */
import * as express from 'express';
import proxy = require('http-proxy-middleware');
import webpack = require('webpack');
import webpackDevMiddleware = require('webpack-dev-middleware');
import webpackHotMiddleware = require('webpack-hot-middleware');
import { browserHistory, match } from 'react-router';

/**
 * Local imports
 */
import '../providers';

import handleRoute from './handleRoute';
import routes from '../routes';

const port = process.env.PORT || 3000;
const app = express();

/**
 * Webpack
 */
if (process.env.NODE_ENV === 'development') {
  /* tslint:disable:no-var-requires */
  const config = require('../../webpack.dev.js');
  /* tslint:enable:no-var-requires */

  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
}

/**
 * Serve static
 */
app.use(express.static('dist', {
  extensions: ['css', 'js'],
  index: false
}));

/**
 * Server rendering
 */
app.use((req, res, next) => {
  match(<any> {
    history: browserHistory,
    location: req.url,
    routes,
  }, handleRoute(req, res, next));
});

/**
 * Initialization
 */
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    /* tslint:disable:no-console */
    console.info(`🌎  Listening on http://localhost:${port}/.`);
    /* tslint:enable:no-console */
  }
});
