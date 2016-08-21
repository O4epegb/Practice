var path = require("path");
var webpack = require('webpack');

var config = {
    entry: {
      "app": "./src/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx", ".css", ".styl"]
    },
    plugins: [],
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
