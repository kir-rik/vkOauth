'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {

    // entry: {
    //     home: './frontend'
    // }, 
    entry: './index.js',

    output: {
        path: __dirname,
        filename: 'dist/bundle.js',
    },

    //watch: NODE_ENV == 'development',

    // watchOptions: {
    //     aggregateTimeouit: 100
    // },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    node: {
        net: 'empty',
        fs: 'empty',
    },
    plugins: [
        //new webpack.DefinePlugin({NODE_ENV: JSON.stringify(NODE_ENV)})
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
        ],
    },
};


// module.exports.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false,
//             drop_console: false,
//             unsafe: false
//         }
//     })
// );