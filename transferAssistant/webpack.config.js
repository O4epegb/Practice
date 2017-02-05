const path = require('path');
const webpack = require('webpack');
const ElectronConnectWebpackPlugin = require('electron-connect-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {
    entry: {
        "frontend": "./src/frontend/index.tsx",
        "backend": "./src/backend/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [
            "",
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".css",
            ".styl"
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'src/index.html',
          inject: false
        })],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }, {
                test: /\.node$/,
                loader: "node-loader"
            }
        ]
    },
    target: 'electron',
    node: {
        __dirname: false
    }
};

if (process.env.ELECTRON_CONNECT === 'yes') {
    config.plugins = config.plugins.concat(
        new ElectronConnectWebpackPlugin({
                path: path.join(__dirname, "./build/backend.js"),
                logLevel: 0
            })
    );
}

if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]);
}

module.exports = config;
