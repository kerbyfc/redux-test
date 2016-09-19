var hook = require('css-modules-require-hook');

hook({
    extensions: ['.css', '.sass', '.scss'],
    generateScopedName: '[name]__[local]___[hash:base64:5]'
});

require('ts-node/register');
require('./../src/providers');
require('./../src/server/index');
