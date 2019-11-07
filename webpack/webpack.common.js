const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';

module.exports = {
    entry: {
        popup: path.join(__dirname, srcDir + 'popup.tsx'),
        cxchecker: path.join(__dirname, srcDir + 'cxchecker.ts')
    },
    output: {
        path: path.join(__dirname,'../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    plugins: [
        new CopyPlugin([
                {from: '.', to: '../'}
            ],
            {context: 'public'}
        ),
    ]
};