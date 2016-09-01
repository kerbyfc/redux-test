var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var prodCfg = require('./webpack.prod.config.js');
var _ = require('lodash');

module.exports = function(app) {
    const config = _.assign(prodCfg, {
        devtool: 'eval',
        entry: prodCfg.entry.concat([
            'webpack-hot-middleware/client',
        ]),
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
    });

    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
};