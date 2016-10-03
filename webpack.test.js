const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    debug: true,
    devtool: 'sourcemap',
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PORT: JSON.stringify(process.env.PORT)
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'babel?cacheDirectory!ts?sourceMap!tslint',
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
    }
};
