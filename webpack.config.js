module.exports = {

    mode: process.env.NODE_ENV || 'development',

    entry: [
        '@babel/polyfill', // enables async-await
        './client/js/index.jsx',
    ],

    output: {
        path: __dirname,
        filename: './dist/bundle.js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader']},
        ],
    },

};
