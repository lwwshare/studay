<script>
/**
 1.缓存：max-age最大值是一年
    强制缓存：cache-contral, experies
    协商缓存：if-none-match/etag, if-modified-since/last-modified
2.get/post:
    1.报文：get、post的方法没有实质区别，只是报文格式不同
        get和post只是http协议的两种请求方式，而http协议是机遇tcp/ip的应用层协议
        无论get还是post，用的都是传输层的协议，所以再传输上，没有区别
        报文格式上：
        请求报文第一行：POST /URL HTTP/1.1
        请求报文第一行：GET /URL HTTP/1.1
        get参数用query方式 ?xx=xx&aa=aa
        post参数放在body里面
        两种方法本质上是tcp连接，没有差别，
    2.参数：get参数写法不固定，只要前后端约定好，后端能解释出来就行
    3.安全：想要传输安全只有加密，使用https
    4.长度：（大多浏览器限制2k个字节）http没有对url和body长度做限制，是浏览器和服务器的原因
        服务器处理长url要消耗比较多的资源，为了性能和安全考虑，给url长度做限制
    5.post的tcp数据包；
        header和body分开发送应该是浏览器或者框架的请求方法，不属于post的行为
    7.
2.cookie，session
    cookie是基于http协议是无状态的，为了记录状态信息
        1.会话状态管理（用户登录状态，购物车，游戏分数）
        2.个性化设置（用户自定义设置，主题）
        3.浏览器行为跟踪（用户行为分析）
    session代表着服务器和客户端一次会话的过程。session对象存储特定用户所欲要的属性和配置信息
        整个用户会话中，存储对session对象的变量将不会丢，关闭会话，session超时时会话失效
    不同点：
        cookie保存在客户端，session保存在服务器端
        cookie可保存ASCII，session可以存任意数据对象，session保存一些常用信息，比如userid
        有效期：cookie可设置为长时间保存，session失效时间较短，客户端关闭或者session超时就会失效
        隐私策略不同：cookie在客户端比较容易获取，session再服务端相对安全
        大小:cookie大小不超过4k，session远高于cookie
    为什么需要cookie，session
        第一次请求：服务器创建session-》返回给客户端sessionid 
        第二次请求：浏览器携带cookie带着sessionid-》服务器根据sessionid判断哪个用户
    如果浏览器禁止了cookie
        1.每次请求都携带sessionid参数
        2.token，每次请求需要带上登录成功后服务器返回的token
    分布式session
        共享session：
        session复制：

3.跨域：
    1：通过代理，比如使用nginx再后盾转发请求，避免前段出现跨域的问题
    2：jsonp跨域：<script><img><iframe>不收同源策略限制
        和服务器端约定一个回调函数名，服务器接收到请求后，返回一段js，调用回调函数，并将数据作为参数传递
        当网页收到这段js代码，就会执行这个回调，数据就会传到客户端
        缺点：只支持get请求
    3:Access-Control-Allow-Origin：

4.https：通过ssl/TLS进行加密 端口号443 需要申请ca证书
    可进行加密传输，身份认证的网络协议，比http安全
    为什么要用：
        建立一个信息安全通道，来保证数据传输的安全
        确认网站的真实性，防止钓鱼网站
    用非对称加密传递对称秘钥，然后用对称加密进行通信
    对称加密比非对称加密效率高


6.三次握手
    1、客户端给服务器发送一个SYN报文
    2.服务端收到SYN报文后，给客户端应答一个SYN+ACK报文
    3.客户端收到SYN+ACK报文后，回应一个ACK报文
    //刚开始客户端处于closed状态，服务端处于listen状态
    第一次后： 服务端处于SYN_Send
    第二次后：服务端处于syn_revd
    第三次：客户端处于establised
    完事儿：服务端处于establised
四次挥手
    1.客户端发送一个FIN报文，客户端处于FIN_WAIT1状态
    2.服务端收到FIN，发送ACK报文，吧客户端的序列号+1作为ack的值，服务端处于CLOSE_WAIT
    3.如果服务端也可以断开连接了，发给客户端FIN报文，服务端处于LAST_ACK状态
    4.客户端手收到FIN，一样发送一个ACK报文作为应答，吧服务端的序列好+1作为ack报文序列号值，客户端处于TIME_WAIT
    过一会儿确保服务端收到自己的ack报文才会进入closed状态
    5.服务端收到ACK报文后直接关闭处于CLOSED状态
    

 */
</script>