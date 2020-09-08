<script>
/**
 * 内核:
 * firefox:gecko
 * chrome,safari:webkit
 * ie：trident
 * 
 * 缓存：
 memory cache:

 '内存缓存'主要包含的是当前文档页面中已经抓取到的资源，例如已经下载的样式
 脚本，图片，如果再发请求这些资源，这些资源被存在内存中，关掉网页，会被释放掉
 reploader指令
 '内存缓存' 不会关心http缓存头信息，可能会对content-type，cors做校验

 1.浏览器通常会将常用资源缓存到电脑的磁盘和内存中
 2.静态资源服务器---我司的上传头像与文件
    在一般的网站中，惊天资源使用频率高。流量占用大，对访问量少打的网站，都会把静态资源放到cdn服务器，不占用业务服务器的网络宽带，达到更好的用户体验
    CDN网络资源分发
3.浏览器缓存分类：针对get请求
    200 from cache
    304 not modified
4.cache-control 和 expires
    cache-control 是http1.1新增的响应头，使用相对时间
    expires是http1.0的响应头，置顶具体过期日期而不是秒数，所以最好用cache-contral
    同时使用control会覆盖expires
5.cache-contral设置
    max-age：再这段时间内，浏览器不会再向服务器发送请求了
    public：可以再代理缓存中被缓存，于是可以被多用户共享， 默认public
    private：响应只在私有缓存中被缓存，对用户的敏感资源通常要设置privite
    no-cache:必须咸鱼服务器确定资源是否被更改过（依靠if-none-match和etag）然后再决定是否使用本地缓存
    no-store: 绝对禁止缓存任何资源，通常用于机密性资源

回流与重绘：
1.浏览器使用流式布局模型
2.浏览器把html解析成dom，把css解析成cssom，二者合并成render tree
3.有了tree我们就知道所有浏览器的节点样式，然后计算大小和位置，最后绘制到页面上
4.由于流式布局，对render tree通常遍历一次就可以，但是table除外，要计算多次，3倍同等元素的时间，多以避免使用table
回流：
当render tree 中部分或全部的元素尺寸结构发生变化，浏览器重新渲染部分或者全部文档
scrollto(), clientwidth...
重绘：
当页面元素样式改变并不影响他在文档流位置，浏览器会重新将样式赋予元素重新绘制
回流会重绘，重绘不一定会回流
回流比重绘代价高

浏览器会把所有引起回流和重绘的操作放到队列里，如果队列任务数量或者时间间隔到达阈值，浏览器就进行一次批量处理
当访问：clientwidth clientheight offsetleft width 会立即清空队列
因为队列里面可能会有影响到这些属性和方法返回值的操作

避免回流与重绘
css:
1.避免使用table布局
2.尽可能再dom树的末端改变class
3.避免设置多层内敛样式
4.将动画效果用到position属性为absolute或者fixed元素上
5.避免使用css表达式calc（）
js:
1.避免重复操作样式，最好一次性重写style属性
2.避免频繁操作dom，创建一个documentFragment,在他上面应用所有dom操作，最后放进dom文档中
3.可以先将元素设为display：none，操作结束再显示，因为不显示的元素不会引起回流和重绘
4.避免频繁读取会引发回流重绘的属性，用变量存储起来
5.对复杂动画元素用绝对定位，脱离文档流

浏览器渲染原理：
浏览器内核是浏览器核心程序：渲染引擎，js引擎
1.浏览器会解析三个东西：
    HTML/SVG/XHTML,事实上webkit有三个c++类对应的这三类文档，解析三种文件会产生dom tree
    css解析css会产生cssom 规则树
    js脚，主要是通过dom api和cssom api来操作domtree和css规则树
2.解析完成后，浏览器会通过dom tree和css规则树来构造rendering tree
    rendering tree 渲染树并不等同于dom树，因为一些header或者display：none没必要在渲染书中
3.最后通过调用操作系统 native gui的api绘制
    构建dom：
        字节数据-字符串-token-node-dom 一边创建token一边创建node节点
    构建cssom
        配html是非常复杂的。所以dom树尽量小，css尽量用id和class
    构建渲染树：只包含需要显示的节点和样式
    布局和绘制：用渲染树布局（也叫回流）输出盒模型
    遇到js：
        js加载，解析与执行会阻塞dom树的构建，如果js里面访问css，不完整的cssom无法使用，所以会等到cssom构建完，才去执行，
        所以，这种情况下浏览器会先下载和构建cssom 然后再执行js，最后再构建dom
    defer：并行加载js，延迟执行js，html解析后完成后再执行
    async：异步加载js,如果已经加载完了，就立即执行，这种方式加载的 JavaScript 依然会阻塞 load 事件。换句话说，async-script 可能在 DOMContentLoaded 触发之前或之后执行，但一定在 load 触发之前执行。
5.web安全： XXS,CSRF,点击劫持
    xxs:代码注入攻击，被攻击者登录网站时就会执行恶意代码，获取cookie。tokens之类的信息
        反射型xss，存储型xss ，dom型xss
        反射型：搜索结果，错误信息，未过滤直接返回到浏览器
            漏洞：url传递参数；chrome，safari等检测到；firefox不行
            防范：请求时参数转义 cookie设置httpOnly
        dom型xss：把不可信的内容插入到页面
            进行编码，转义
        存储型：永久存储到服务器，每次请求来执行
            做好过滤
        服务端：Content-Security-Policy: default-src 'self'
        前端：<meta http-equiv="Content-Security-Policy" content="form-action 'self';">
        禁止加载外域代码，防止复杂的逻辑攻击
        禁止外域提交，网站被攻击后，用户的数据不会泄漏到外域；
    CSRF:跨站请求伪装
    防范：1.添加验证码，用户体验差，可以在转账，交易操作时增添验证码
        2.判断请求来源，检查referer（不安全referer可以被改）
        3.使用token：用户提交请求时 携带这个token（主流）
        4.samesite cookie属性：表明cookie是同站cookie 只能作为第一坊的cookie，不能作为第三方cookie，但存在兼容问题
        samesite = strict/lax
    点击劫持：透明iframe，诱导用户点击
        防御： 
        1.if ( top.location != window.location ){
            top.location = window.location
        }
        2.X-FRAME-OPTIONS；
        
 */
</script>