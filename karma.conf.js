var webpackConfig = require('./webpack.prod');

const isDebug = process.env.DEBUG || false;
const runOnce = process.env.BDD || isDebug ? false : true;

module.exports = function (config) {

    const options = {
        basePath: '',
        autoWatch: true,
        singleRun: runOnce,
        browsers: [isDebug ? 'Chrome' : 'PhantomJS'],

        frameworks: ['mocha', 'sinon-chai'],

        client: {
            chai: {
                includeStack: true
            }
        },

        files: [
            './src/**/*.spec.ts'
        ],

        exclude: [],

        preprocessors: {
            './src/**/*.spec.ts': ['webpack']
        },

        webpack: {
            entry: {
                main: [
                    'babel-polyfill',
                    './src/index'
                ]
            },
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,

        plugins: [
            require('karma-webpack'),
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-mocha-reporter',
            'karma-clear-screen-reporter',
            'karma-mocha',
            'sinon-chai'
        ],

        webpackMiddleware: {
            noInfo: true
        },

        reporters: [
            'mocha',
            'clear-screen'
        ],

        concurrency: Infinity
    };

    config.set(options);
};
