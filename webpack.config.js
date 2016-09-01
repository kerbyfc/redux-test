var path    = require('path');
var webpack = require('webpack');

var host = 'localhost';

function origin() {
    return 'http://' + host + ':' + (process.env.PORT || 3001);
}

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
module.exports = {
    entry:  [
        'webpack-dev-server/client?' + origin(),
        'webpack/hot/only-dev-server',
        './src/app/client/bootstrap.ts'
    ],
    output: {
        path:     path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src/app/shared'],
        extensions:         ['', '.js', '.ts', '.tsx']
    },
    module: {
        loaders: [
            {
                test:    /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'ts-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        proxy: {
            '*': origin()
        },
        host: 'localhost'
    }
};