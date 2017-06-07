// const path = require('path');
// const webpack = require('webpack');
// const webpackMerge = require('webpack-merge');

const NODE_ENV = process.env.NODE_ENV || 'development';

const serverConfig = {

    entry: './index.js',
    target: 'node',

    output: {
        path: __dirname,
        filename: './dist/bundle.js',
    },

    watch: NODE_ENV === 'development',

    node: {
        net: 'empty',
        fs: 'empty',
    },

};

const clientConfig = {

    entry: './client/js/index.js',
    target: 'web',

    output: {
        path: __dirname,
        filename: './public/js/bundle.js',
    },

    watch: NODE_ENV === 'development',

    devtool: NODE_ENV === 'development' ? 'inline-source-map' : null,

};


module.exports = [serverConfig, clientConfig];
