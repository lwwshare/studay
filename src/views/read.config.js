const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        reading: path.resolve(APP_PATH, 'reading.js')
    },

    output: {
        path: BUILD_PATH,
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'Read',
        libraryExport: 'default'
    },

    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: APP_PATH,
                options: {
                    presets: [
                        ['env', {
                            loose: true,
                            modules: false
                        }],
                        'stage-2'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['css-loader', 'postcss-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 加载图片并置于images文件夹下
            {
                test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
                loader: 'url-loader?limit=1048576'
            },
            // 加载字体并置于fonts文件夹下
            {
                test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                loader: 'url-loader?limit=1048576'
            },
            {
                test: /\.(mp4)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'css/images/[name].[ext]',
                    limit: 10
                }
            },
        ]
    },

    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
        }
    },

    plugins: [
        // 压缩代码
        new UglifyJSPlugin()
    ]
}