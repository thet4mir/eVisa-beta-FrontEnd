const path = require('path')
const webpack_config_local = require('./webpack.config.local.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const hp = (v) => ['babel-polyfill', path.resolve(__dirname, v)]
const hhwp = ({ chunks, filename, template }) => new HtmlWebpackPlugin({
    chunks: chunks,
    inject: 'body',
    template: template,
    filename: filename
})

module.exports = {
    mode: "development",
    entry: {
        'admin-app':
            hp('src/admin/index.jsx'),
        'public-app':
            hp('src/public/index.jsx'),
    },
    output: {
        // options related to how webpack emits results

        // where compiled files go
        path: path.resolve(__dirname, "dist/"),

        // http://127.0.0.1/<publicPath>/ - where files are served from
        publicPath: "/",

        filename: 'js/[name].[chunkhash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                // regex test for js and jsx files
                test: /\.(js|jsx)?$/,
                // don't look in the node_modules/ folder
                exclude: /node_modules/,
                // for matching files, use the babel-loader
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env"]
                    }
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(jpg|png)$/,
                type: 'asset/resource',
            },
            {
                test: /bootstrap-icons\.woff(2)?(\?[0-9a-f]+)?$/,
                include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'webfonts',
                        publicPath: '/webfonts',
                    },
                }
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/utils/'),
            '@admin': path.resolve(__dirname, 'src/admin/'),
            '@public': path.resolve(__dirname, 'src/public/'),
        }
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: {
            name: 'manifest',
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "libs",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                },
            },
        },
    },
    plugins: [
        hhwp({
            chunks: ['admin-app'],
            template: './src/admin/index.html',
            filename: 'admin.html',
        }),
        hhwp({
            chunks: ['public-app'],
            template: './src/public/index.html',
            filename: 'index.html',
        }),
        new WebpackBuildNotifierPlugin({
            title: "NPM - React - eVisa",
            showDuration: true,
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        compress: true,
        port: 9000,
        liveReload: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/management-panel/, to: '/admin.html' }
            ]
        },
        https: true,
        proxy: {
            '/api/': {
                target: webpack_config_local.backend_target,
                changeOrigin: true,
                secure: 'backend_secure' in webpack_config_local ? webpack_config_local.backend_secure : true,

            },
        },
        watchOptions: {
            ignored: 'node_modules',
        }
    },

    externals: {
        'axios': 'axios',
        'bootstrap': 'bootstrap',
    },
}
