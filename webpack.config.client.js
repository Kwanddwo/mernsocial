const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, './client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: require.resolve('babel-loader'),
                options: {
                    plugins: [ require.resolve('react-refresh/babel') ]
                }
            }]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ReactRefreshWebpackPlugin({ overlay : {
            entry: '@pmmmwh/react-refresh-webpack-plugin/client/ErrorOverlayEntry',
            module: '@pmmmwh/react-refresh-webpack-plugin/overlay',
            sockIntegration: 'whm'
        }})
    ]
}