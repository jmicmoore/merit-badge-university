const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    plugins: [
        new Dotenv({
            path: './.env' // Path to .env file (this is the default)
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    }
};