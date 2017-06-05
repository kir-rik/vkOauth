const NODE_ENV = process.env.NODE_ENV || 'development';
// const webpack = require('webpack'); 

module.exports = {

    entry: './index.js',
    target: 'node',

    output: {
        path: __dirname,
        filename: 'dist/bundle.js',
    },

    watch: NODE_ENV === 'development',

    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    node: {
        net: 'empty',
        fs: 'empty',
    },
    plugins: [
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
        ],
    },
};

