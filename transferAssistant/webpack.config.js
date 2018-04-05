const path = require('path');
const webpack = require('webpack');
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const useElectronConnect = process.env.ELECTRON_CONNECT === 'true';

const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
    path: path.join(__dirname, './build/backend.js'),
    logLevel: 0
});

const frontendConfig = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        frontend: './src/frontend/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.styl']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: false
        }),
        new ForkTsCheckerWebpackPlugin(),
        useElectronConnect && ElectronReloadWebpackPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.node$/,
                use: [{ loader: 'node-loader' }]
            }
        ]
    },
    target: 'electron-renderer',
    node: {
        __dirname: false
    }
};

const backendConfig = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        backend: './src/backend/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [new ForkTsCheckerWebpackPlugin(), useElectronConnect && ElectronReloadWebpackPlugin()].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.node$/,
                use: [{ loader: 'node-loader' }]
            }
        ]
    },
    target: 'electron-main',
    node: {
        __dirname: false
    }
};

module.exports = [frontendConfig, backendConfig];
