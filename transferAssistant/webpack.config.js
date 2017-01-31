const path = require('path');
const webpack = require('webpack');
const ElectronConnectWebpackPlugin = require('electron-connect-webpack-plugin');


const config = {
    entry: {
        "app": "./src/app.ts",
        "index": "./src/index.ts"
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
    plugins: [new ElectronConnectWebpackPlugin({
            path: path.join(__dirname, "./build/index.js"),
            logLevel: 0
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

if (process.env.NODE_ENV === 'production') {
    config.plugins = [
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
    ]
}

module.exports = config;
