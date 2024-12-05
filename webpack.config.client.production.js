const path = require('path');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
    mode: 'production',
    entry: [ path.join(CURRENT_WORKING_DIR, 'client/main.js') ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules : [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
}