const path = require('path');
const src = path.resolve(__dirname, 'static/');
const build = path.resolve(__dirname, 'dist/');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(src, 'js/app.js'),
    output: {
        path: build,
        filename: 'bundle.js'
    },
    resolve: {
        alias : {
            Styles: path.resolve(__dirname, 'static/css/'),
        },
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'file-loader?name=./assets/fonts/webfonts/[name].[ext]'
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.xml$/,
                loader: 'fest-webpack-loader',
                // options:{
                //     pretty: true
                // }
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
    ]
};
