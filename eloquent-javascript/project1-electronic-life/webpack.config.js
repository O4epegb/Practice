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
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".css",
            ".styl"
        ]
    },
    plugins: [new HtmlWebpackPlugin({title: 'Electronic life'})],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    compilerOptions: {
                        noEmit: false
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [precss, autoprefixer]
                        }
                    }
                ]
            }, {
                test: /\.styl$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [precss, autoprefixer]
                        }
                    }, {
                        loader: 'stylus-loader'
                    }
                ]
            }
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins = [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({minimize: true, context: __dirname})
    ]
}

module.exports = config;
