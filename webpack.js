const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('static/[name].css');

module.exports = {
    debug: true,
    devtool: 'eval',
    entry: {
        main: [
            'babel-polyfill',
            'webpack-hot-middleware/client?reload=true&overlay=true',
            './src/index'
        ]
    },
    output: {
        chunkFilename: '[name].[chunkhash].chunk.js',
        filename: 'main.js',
        path: path.join(__dirname, 'dist/static'),
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PORT: JSON.stringify(process.env.PORT)
            }
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new CopyWebpackPlugin([
            {context: 'assets', from: '**/*', to: '.'}
        ]),

        new ExtractTextPlugin('./static/main.css'),
        new ExtractTextPlugin('main.css')
    ],

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'react-hot!babel?cacheDirectory!ts?sourceMap!tslint',
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    [
                        'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
                        'postcss',
                        'sass'
                    ]
                )
            },

            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'file'
            }
        ]
    },

    postcss: function () {
        return [autoprefixer];
    }
};
