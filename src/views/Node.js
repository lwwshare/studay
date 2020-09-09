/**
 1.全局变量
 require()
 内建模块直接从内存加载
 文件模块通过文件查找定位到文件
 包通过package.json里面的main字段查找入口文件

 module.exports
 (function (exports, require, module, _filename, _dirname) {

 })

 exports 是module的属性，默认情况是空对象
 require 一个模块实际得到的是该模块的exports属性
 exports.xxx导出具体有多个属性的对象
module.exports = xxx 导出一个对象


process
查看path
process.env.PATH
设置path
process.env.PATH += ':/a_new_path_to_executables'
 获取平台信息
process.arch // x64
process.platform // darwin
获取内存使用情况
process.memoryUsage();
获取命令行参数
process.argv

events
const EventEmitter = require('events').EventEmitter;

util
const util = require('util');
const fs = require('fs');
const readAsync = util.promisify(fs.readFile);

流

使用内建流api
静态web服务器
不用流：
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end(String(err));
      return;
    }

    res.end(data);
  });
}).listen(8000);

使用流:
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.createReadStream(`${__dirname}/index.html`).pipe(res);
}).listen(8000);


fs文件系统

tcp客户端
NodeJS 使用 net 模块创建 TCP 连接和服务。
const assert = require('assert');
const net = require('net');

http客户端
const assert = require('assert');
const http = require('http');

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' }); // 写入基于文本的响应头
  res.write('Hello, world.'); // 发送消息回客户端
  res.end();
});

server.listen(8000, function() {
  console.log('Listening on port 8000');
});


2. 框架 express
是一个Node.js的基础框架，主要基于 Connect 中间件，
并且自身封装了路由(需要配合bodyParser)、视图处理等功能，
使用人数众多，弊端是callback回调方式。

koa
中间件使用洋葱模型，让中间件代码根据 next 方法分隔有两次执行时机
几乎不再内置任何中间件，把控制权和复杂度交给了开发者
Koa 1 通过 generator、koa 2 通过 async/await 语法，
让 web 中高频出现的异步调用书写简单

egg
egg.js 是一个生成 web 框架的框架，目标用户是团队的架构师，
egg.js 提供了一套约定优先配置的实现，让架构师通过配置轻松定
制符合团队约定的 web 框架（egg.js 的取名正是孕育 web 框架的意思）
egg.js 底层基于 koa2，中间件机制和 koa 一致，只不过为了实现通过
 config 文件配置，需要简单包装egg.js 本身已经很强大，
 个人用户可以直接把 egg.js 当做 web 框架使用，
 配合 egg.js plugin、中间件生态，大部分 web 开发任务可以
 轻松支持





 */