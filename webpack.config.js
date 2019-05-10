const path = require('path');
const build = path.resolve(__dirname, 'static/dist');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './static/js/app.ts',
    output: {
        path: build,
        filename: 'bundle.js'
    },
    resolve: {
        alias : {
            Styles: path.resolve(__dirname, 'static/css'),
        },
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(j|t)s$/,
                exclude: /node_modules/,
                loader: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|gif|png|jpe?g|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader'}
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    { loader: 'fest-webpack-loader' }
                ]
            },
        ]
    },
    plugins: [
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'static/js/sw.js'),
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ]
};