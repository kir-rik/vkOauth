const BabiliPlugin = require('babili-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

    plugins: [
        new BabiliPlugin(),
    ],
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

    plugins: [
        new BabiliPlugin(),
    ],
};

if (NODE_ENV === 'development') {
    serverConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8888 }));
    clientConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8887 }));
}

module.exports = [serverConfig, clientConfig];
