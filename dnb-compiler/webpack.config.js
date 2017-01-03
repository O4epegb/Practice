var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {
    entry: {
        "app": "./src/index.ts"
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
    plugins: [new HtmlWebpackPlugin({title: 'My App'})],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loaders: ['style', 'css']
            }, {
                test: /\.styl$/,
                loaders: ['style', 'css', 'stylus']
            }
        ]
    },
    ts: {
        compilerOptions: {
            noEmit: false
        }
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
