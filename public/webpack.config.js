module.exports = {
    entry: 'index.html',
    output: {
        path: __dirname,
        filename: 'dist/bundle.js',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
        ],
    },
};
