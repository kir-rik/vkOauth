module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'dist/bundle.js',
    },
    node: {
        net: 'empty',
        fs: 'empty',
    },
    // module: {
    //     loaders: [
    //         { test: /\.css$/, loader: 'style!css' },
    //     ],
    // },
};
