
/**
1.安装
    npm i webppack webpack-cli -D
2.0配置：webpack默认会将src下的index.js文件进行打包
//node v8.2版本以后会有一个npx npx会执行bin里面的文件
    当执行 npx webpack时，webpack会自动查找项目中的src目录下的indexjs文件然后纪念性打包
    生成一个dist目录 并存在一个打包好的mainjs文件
3.webpack是基于node的
    在项目下创建一个webpack.config.js(默认，可修改)文件来配置webpack

    module.exports = {
        entry: '',//入口文件
        output: {}, //出口文件
        module: {}, //处理对应模块
        plugins: [],//对应的插件
        devServer: {},//开发服务器配置
        mode: 'development', //模式配置
    }
    配置执行文件
    "scripts": {
        "build": "webpack",
        "dev": "webpack-dev-server"
    }
    
    1.启用devServer需要安装webpack-dev-server
    npm i webpack-dev-server -D
    2.配置html模版
    npm i html-webpack-plugin -D
    3.引入css文件
    npm i style-loader css-loader -D
    npm i less less-loader -D
    4.拆分css @next表示可以支持webpack4版本的插件
    npm i extract-text-webpack-plugin@next -D
    npm i mini-css-extract-plugin -D
    5.css引入图片
    npm i file-loader url-loader -D
    6.html页面引入的图片
    npm i html-withing-loader -D
    7.引入字体图片和svg图片 file-loader
    8.添加css前缀
    npm i postcss-loader autoprefixer -D
    9.转移ES6
    npm i @babel/core babel-loader @babel/preset-env -D
    10.清空打包文件
    npm clean-webpack-plugin -D
    11.热更新
    12.resolve//别名
    13.提取公共代码：通过CommonsChunkPlugin插件
    webpack4内置了一个一摸一样的功能，叫‘优化’
    14.指定webpack配置文件：针对不同的需求进行特定的打包
    15.treeshaking package.json:sideEffects
    16.uglifyJsPlugin 删除未使用的代码
    需要使用export import
    
*/
   // 配置：
    const path = require('path');
    let webpack = require('webpack');
    let HtmlWebpackPlugin = require('html-webpack-plugin');
    let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
    //let MiniCssExtractPlugin = require('mini-css-extract-plugin');
    let CleanWebpackPlugin = require('clean-webpack-plugin');

    
    let styleLess = new ExtractTextWebpackPlugin('css/style.css');
    let resetLess = new ExtractTextWebpackPlugin('css/reset.css');
    module.exports = {
        entry: './src/index.js', //入口文件
        entry:['./src/index.js', './src/login.js'],
        entry: {
            index: './src/index.js',
            login: './src/login.js'
        },//多入口配置

        output: {
            filename: 'bundle.js', //打包后的文件名称
            filename: '[name].js',//多入口文件命一一对应
            path:path.resolve('dist') //打包后的目录，必须是绝对路径
        },

        resolve: {
            alias: {
                $: './src/jquery.js',
                '@': './src/'
            },
            extensions: ['.js', '.json', '.css']
        },

        module: {
            rules: [
                {
                    test: /\.css$/, //解析css
                    use: resetLess.extract({
                        use: 'css-loader'
                    })
                    //use: ['style-loader', 'css-loader', 'postcss-loader']//从右向左解析
                   // use: [MiniCssExtractPlugin.loader, 'css-loader']
                    /* use:[
                        {loader: 'style-loader'},
                        {loader: 'css-loader'},
                    ]
                    */
                },
                {
                   test: /\.less$/,
                    use: styleLess.extract({
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192, //小于8k的图片自动转为base64格式
                                outputPath: 'images/' //图片打包后存放的目录
                            }
                        }
                    ]
                },
                {
                    test: /\.(htm|html)$/,
                    use: 'html-withing-loader'
                },
                {
                    test: /\.(eot|ttf|woff|svg)$/,
                    use: 'file-loader'
                },
                {
                    test: /\.js/,
                    use: {
                        loader: 'babel-loader',
                        //配置选项里的presets
                        //包含ES6还有之后的版本和那些仅仅是草案的内容
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    include: /src/,//之转化src目录下的js
                    exclude: /node_modules/ //排除掉node_modules,优化打包速度
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin('dist'),
            new webpack.HotModuleReplacementPlugin(),//热更新
            //热更新同事在index.js文件写下：
            /*if (module.hot) {
                module.hot.accept();
            }
            */
            
            //多页面
            //通过new一下这个类来使用插件
            new HtmlWebpackPlugin({
                template: './src/index.html',//用哪个模版
                filename: 'index.html',
                chunks: ['vendor', 'index'],//对应关系，index.js对应的是index.html
                hash: true, //会在打包好的bundle.js后面加上hash串
            }),
            new HtmlWebpackPlugin({
                template: './src/login.html',//用哪个模版
                filename: 'login.html',
                chunks: ['vendor','login'],
                hash: true, //会在打包好的bundle.js后面加上hash串
            }),
            //拆分后会把css文件放到dist目录下的css／style.css
            new ExtractTextWebpackPlugin('css/style.css'),
            //  mini-css-ectract-plugin 也可以
            /**
             * new MiniCssExtractPlugin({
             *      filename: 'css/a.css'//制定打包后的csss
             * })
             */
            styleLess,
            resetLess,
            require('autoprefixer')//引入插件即可
        ],

        devServer = {
            contentBase: './dist',
            host: 'localhost',//默认就是localhost
            port: 8000,
            open: true,
            hot: true
        },
        //公共代码提取
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {//抽离第三方插件
                        test:/node_modules/, //指定是node_modules下的第三方包
                        chunks: 'initial',
                        name: 'vendor',//打包后的文件名，任意命名
                        priority: 10//设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    },
                    utils: {//抽离自己写的公共代码，utils名字随意
                        chunks: 'initial',
                        name: 'utils',
                        minSize: 0//只要超出0字节就生成一个新包

                    }
                }
            }
        }

    }

 