var webpackConfig = require('./../webpack/webpack.test.js');

const isDebug = process.env.DEBUG || false;
const runOnce = process.env.BDD || isDebug ? false : true;

module.exports = function (config) {

    const options = {
        basePath: '../../)),
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
            '../node_modules/es6-shim/es6-shim.js',
            '../../src/config/tests.ts',
            './src/**/*.spec.ts'
        ],

        exclude: [],

        preprocessors: {
            './src/config/tests.ts': ['webpack'],
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
