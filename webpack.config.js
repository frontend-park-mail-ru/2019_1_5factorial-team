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
                test: /\.(woff|woff2|eot|ttf|gif|png|jpe?g|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'resolve-url-loader',
                    { loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    },
                    { loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer'), ]
                        }
                    }
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    {
                        loader: 'fest-webpack-loader'
                    }
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