const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    entry: './client/js/index.js',
    target: 'web',

    output: {
        path: __dirname,
        filename: './public/js/bundle.js',
    },

    watch: NODE_ENV === 'development',

    devtool: NODE_ENV === 'development' ? 'inline-source-map' : null,

};

