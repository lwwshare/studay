<script>
/**
 1.loader
    从本质上说loader是一个node模块，把源模块转换成通用模块,
    使用
        1.config.module.rules 匹配js文件：
        loader：path.resolve(_dirname,'loader/a-loader.js')
        2.use: [{
            loader:'a-loader',
            options: {}
        },{
            loader:'b-loader',
            options: {}
        }]
        resolveLoader: {
            //告诉webpack   去哪个目录下找loader模块
            modules: ['node_modules',path.resolve(_dirname, 'loaders')]
        }
    1.loader
    从本质上说loader是一个node模块，把源模块转换成通用模块,
    使用
        1.config.module.rules 匹配js文件：
        loader：path.resolve(_dirname,'loader/a-loader.js')
        2.use: [{
            loader:'a-loader',
            options: {}
        },{
            loader:'b-loader',
            options: {}
        }]
        resolveLoader: {
            //告诉webpack   去哪个目录下找loader模块
            modules: ['node_modules',path.resolve(_dirname, 'loaders')]
        }
    例子：
    import { getOptions } from 'loader-utils';
    import { validateOptions } from 'schema-utils';

    export default function(source) {
        var callback = this.async();
        var headerPath = path.resolve('header.js');

        this.addDependency(headerPath);

        fs.readFile(headerPath, 'utf-8', function(err, header) {
            if(err) return callback(err);
            //这里的 callback 相当于异步版的 return
            callback(null, header + "\n" + source);
        });
    };


    2.plugin:
    一个具名js函数
    再插件的prototype上定义一个apply方法
    置顶一个绑定多webpack自身的事件钩子
    处理webpack内部实力的特定数据
    功能完成后调用webpack提供的回调

    compilation:代表了一次资源版本构建,编译资源
    compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。
    // chunks = compilation.getStats().toJson().chunks;
    //  assets = compilation.getStats().toJson().assets;
    //  assets = compilation.getStats().toJson().modules;

    function HellWorldPlugin () {},
    HellWorldPlugin.prototype.apply = function (compiler) {
        compiler.hooks.emit.tapAsync(
            'HellWorldPlugin',
            (compilation, callback) => {
                console.log('hello word');

                 // 在生成文件中，创建一个头部字符串：
                    var filelist = 'In this build:\n\n';

                    // 遍历所有编译过的资源文件，
                    // 对于每个文件名称，都添加一行内容。
                    for (var filename in compilation.assets) {
                        filelist += '- ' + filename + '\n';
                    }

                // 将这个列表作为一个新的文件资源，插入到 webpack 构建中
                compilation.assets['filelist.md'] = {
                    source: function () {
                        return filelist;// 'hello word'
                    },
                    size: function () {
                        return filelist.length;
                    }
                }
                callback();
            }
        )
    }
    module.exports = HellWorldPlugin例子：
    import { getOptions } from 'loader-utils';
    import { validateOptions } from 'schema-utils';

    export default function(source) {
        var callback = this.async();
        var headerPath = path.resolve('header.js');

        this.addDependency(headerPath);

        fs.readFile(headerPath, 'utf-8', function(err, header) {
            if(err) return callback(err);
            //这里的 callback 相当于异步版的 return
            callback(null, header + "\n" + source);
        });
    };


    2.plugin:
    一个具名js函数
    再插件的prototype上定义一个apply方法
    置顶一个绑定多webpack自身的事件钩子
    处理webpack内部实力的特定数据
    功能完成后调用webpack提供的回调

    compilation:代表了一次资源版本构建,编译资源
    compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。
    // chunks = compilation.getStats().toJson().chunks;
    //  assets = compilation.getStats().toJson().assets;
    //  assets = compilation.getStats().toJson().modules;

    function HellWorldPlugin () {},
    HellWorldPlugin.prototype.apply = function (compiler) {
        compiler.hooks.emit.tapAsync(
            'HellWorldPlugin',
            (compilation, callback) => {
                console.log('hello word');

                 // 在生成文件中，创建一个头部字符串：
                    var filelist = 'In this build:\n\n';

                    // 遍历所有编译过的资源文件，
                    // 对于每个文件名称，都添加一行内容。
                    for (var filename in compilation.assets) {
                        filelist += '- ' + filename + '\n';
                    }

                // 将这个列表作为一个新的文件资源，插入到 webpack 构建中
                compilation.assets['filelist.md'] = {
                    source: function () {
                        return filelist;// 'hello word'
                    },
                    size: function () {
                        return filelist.length;
                    }
                }
                callback();
            }
        )
    }
    module.exports = HellWorldPlugin
 */
</script>
