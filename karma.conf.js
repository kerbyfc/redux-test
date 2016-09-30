var webpackConfig = require('./webpack.dev');

const isDebug = process.env.DEBUG || false;
const runOnce = process.env.BDD || isDebug ? false : true;

module.exports = function (config) {

    const options = {
        basePath: '',
        autoWatch: true,
        singleRun: runOnce,
        browsers: [isDebug ? 'Chrome' : 'PhantomJS'],

        frameworks: ['mocha', 'chai'],

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

        webpack: webpackConfig,

        colors: true,
        logLevel: config.LOG_INFO,

        plugins: [
            require('karma-webpack'),
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-mocha-reporter',
            'karma-clear-screen-reporter',
            'karma-mocha',
            'karma-chai',
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
