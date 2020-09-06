<template>    
</template>
<script>
export default {
name: 'Html',
data () {}
/** SGML->HTML->XML->xhtml SVG来自于XML
 * 1.html语义化：根据内容的结构化（内容语义话），合适的标签（代码语义话）
 *  有利于开发者阅读，浏览器的爬虫和及其更好解析
 * 2.p在默认有上下间距，对兼容特殊终端有力
 * 3.b，font，u不使用纯样式标签，用css
 * 4.strong／b， em／i 用strong em
 * 5.表格：caption 标题
 *         thead 表头
 *         tbody 主体
 *         tfoot 尾部
 * 6.表单域 fieldset 包围 legend说明用途
 * 7.article 定义文档内的文章
 *  aside 页面内容之外的内容
 *  detail 定义用户可查看的额外细节
 *  dialog 定义对话框
 *  figure 定义自包含内容 如，图片照片
 *  footer 文档页脚
 *  header 文档页眉
 *  main 文档主题内容
 *  mark 强调的内容
 *  nav 文档导航链接
 *  progress 任务进度
 *  section 文旦中的节
 *  summary 定义details元素的可见标题
 *  time 定义时间日期
 * 8:<head lang=”en”> 标准的 lang 属性写法
    <meta charset=’utf-8′>    声明文档使用的字符编码
    <meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   优先使用 IE 最新版本和 Chrome
    <meta name=”description” content=”不超过150个字符”/>       页面描述
    <meta name=”keywords” content=””/>      页面关键词
    <meta name=”author” content=”name, email@gmail.com”/>    网页作者
    <meta name=”robots” content=”index,follow”/>      搜索引擎抓取
    <meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”>
    无缓存：
    <meta http-equiv=”pragma” content=”no-cache”>
    <meta http-equiv=”cache-control” content=”no-cache”>
    <meta http-equiv=”expires” content=”0″>
    9.canvas：
        var c=document.getelementbyid('canvas')
        var ctx=c.getContext('2d')
        ctx.fillstyle="#000000"
        ctx.fillRect(0,0,150,70)
            strokeRect()
            fillText（‘文字’）
        ctx.beginPath() ctx.moveTo() ctx.close()
        ctx.drawImage(img, 10 , 10, 100, 100)
        ctx.toDataUrl('image/png')／不能跨域
        
    10.ie9之前版本通过createElement创建h5新标签
        引入html5shiv.js

 *
 */
}
</script>