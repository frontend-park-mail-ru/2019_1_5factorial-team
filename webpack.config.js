const path = require('path');
const build = path.resolve(__dirname, 'static/dist');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './static/js/app.js',
    output: {
        path: build,
        filename: 'bundle.js'
    },
    resolve: {
        alias : {
            Styles: path.resolve(__dirname, 'static/css'),
        },
    },
    module: {
        rules: [
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
            },
        ]
    },
    plugins: [
        new ServiceWorkerWebpackPlugin({
            entry: './static/js/sw.js',
        }),
    ]
};
