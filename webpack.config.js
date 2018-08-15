const path = require('path');

module.exports = {

    mode: process.env.NODE_ENV || 'development',

    entry: [
        '@babel/polyfill', // enables async-await
        './client/js/index.jsx',
    ],

    output: {
        publicPath: '/',
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [
            {test: /\.(js|jsx)?$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.png$/, use: 'file-loader'},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
            {test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
        ],
    },

};
