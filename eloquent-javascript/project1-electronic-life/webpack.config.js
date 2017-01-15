var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');


var config = {
    entry: {
        "app": "./src/index.tsx"
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
        new HtmlWebpackPlugin({title: 'Electronic life'})
    ],
    module: {
        loaders: [{
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader?minimize!postcss-loader'
            }, {
                test: /\.styl$/,
                loader: 'style-loader!css-loader?minimize!postcss-loader!stylus-loader'
            }
        ]
    },
    ts: {
        compilerOptions: {
            noEmit: false
        }
    },
    postcss: function() {
        return [precss, autoprefixer];
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
