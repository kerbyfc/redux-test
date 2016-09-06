var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var prodCfg = require('./webpack.prod.js');
var _ = require('lodash');

const BABEL_QUERY = JSON.stringify({
    presets: ['react', 'es2015'],
    plugins: [
        ['transform-object-rest-spread'],
        ['transform-class-properties'],
        ['transform-decorators-legacy'],
        [
            'react-transform',
            {
                transforms: [
                    {
                        transform: 'react-transform-hmr',
                        imports:    ['react'],
                        locals:     ['module']
                    }
                ]
            }
        ]
    ]
})

module.exports = function(app) {
    const config = _.assign(prodCfg, {
        devtool: 'source-maps',
        entry: prodCfg.entry.concat([
            'webpack-hot-middleware/client',
        ]),
        module: {
            loaders: [
                {
                    test:    /\.tsx?$/,
                    exclude: /node_modules/,
                    loaders: ['babel?' + BABEL_QUERY, 'ts-loader']
                }
            ]
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
    });

    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {noInfo: true}));
    app.use(webpackHotMiddleware(compiler));
};