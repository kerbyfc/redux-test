const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const AssetsPlugin = require('assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    bail: true,
    debug: false,
    devtool: 'cheap-source-map',

    entry: {
        main: './src/index',
        vendor: [
            'babel-polyfill',
            'classnames',
            'lodash',
            'react',
            'react-dom',
            'react-helmet',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'serialize-javascript'
        ]
    },

    output: {
        chunkFilename: '[name].[chunkhash].chunk.js',
        filename: '[name].[chunkhash].js',
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

        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),

        new CopyPlugin([
            {context: 'assets', from: '**/*', to: '.'}
        ]),

        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            }
        }),

        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash].js'),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new AssetsPlugin({path: 'dist'})
    ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'babel?cacheDirectory!ts',
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer&importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'),
                include: path.join(__dirname, 'src')
            },

            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'file'
            }
        ]
    },

    postcss: function () {
        return [autoprefixer];
    },

    sassLoader: {
        outputStyle: 'expanded',
        sourceMap: false,
        sourceMapContents: false
    }
};
