
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VENDOR_LIBS = [
    'react',
    "react-dom",
    "react-redux",
    "react-router-dom",
    "redux",
    "redux-saga",
    "axios",
    "react-hook-form",
    "antd"
]

module.exports = (env, options) => {

    const isDevelopment = options.mode !== "production";

    return {
        mode: isDevelopment ? "development" : "production",
        entry: {
            app: path.join(__dirname, 'src', 'index.tsx'),
            vendor: VENDOR_LIBS
        },
        output: {
            filename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
            path: path.join(__dirname, "/dist")
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.less$/,
                    use: [{
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                    }]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]',
                    }
                },

            ],
        },
        devtool: isDevelopment
            ? "eval-cheap-module-source-map"
            : "nosources-source-map",
        optimization: {
            runtimeChunk: {
                name: "runtime",
            },
            splitChunks: {
                chunks: 'all',
                name: false
              }
        },
        performance: {
            hints: false,
        },
        plugins: [
            new HtmlWebpackPlugin({
                minify: isDevelopment
                    ? false
                    : {
                        collapseWhitespace: true,
                        keepClosingSlash: true,
                        minifyCSS: true,
                        minifyJS: true,
                        minifyURLs: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        useShortDoctype: true,
                    },
                template: "./src/index.html",
            }),
            new MiniCssExtractPlugin(),
            ...(isDevelopment
                ? []
                : [
                    new CompressionPlugin({
                        filename: '[name].br[query]',
                        algorithm: 'brotliCompress',
                        test: /\.(js|css|html|svg)$/,
                        compressionOptions: { level: 11 },
                    }),
                ]),
            ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []),
        ],
        stats: {
            assetsSort: "!size",
            builtAt: false,
            children: false,
            entrypoints: false,
            errors: true,
            errorDetails: true,
            hash: false,
            modules: false,
            timings: false,
        },
        devServer: {
            contentBase: "dist",
            historyApiFallback: true,
            hot: true,
            port: 3000,
        },
    };

}
