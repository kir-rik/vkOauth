const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    entry: './index.js',
    target: 'node',

    output: {
        path: __dirname,
        filename: 'dist/bundle.js',
    },

    watch: NODE_ENV === 'development',

    node: {
        net: 'empty',
        fs: 'empty',
    },
};

