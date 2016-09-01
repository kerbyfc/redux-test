var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/app/client/bootstrap.tsx'
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'src/app'],
        extensions:         ['', '.js', '.ts', '.tsx']
    },
    output: {
        path:       path.join(__dirname, 'build'),
        filename:   'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test:    /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['ts-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};