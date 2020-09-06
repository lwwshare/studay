<template> 
<div>
    <div class="wrap">
        <div class="center">uuus</div>
    </div>    
</div>   
</template>
<script>
export default {
/**
 * 1.盒模型
 *  ie： border padding width：box-sizing：border-box
 *  标准： width：box-sizing:content-box
 * 2.几种获取高宽方式
 *  dom.style.width/height 获取内联样式宽高
 *  dom.currentstyle.width/height 渲染后的宽高
 *  dom.getComputedStyle.width/height 兼容更多浏览器 通用型更好
 *  dom.getBoundingClientReact().width 根据元素在视窗中的绝对位置获取
 *  dom.offsetWidth 最常用 兼容最好
 * 3.屏幕：window.screen.height
 *  屏幕工作区（无状态栏）window.screen.availHeight
 *  全文：document.body.scrollHeight
 *  网页可见区域（不加边线）：doc.body.clientHeight
 *  （加边线）doc.body.offsetHeight
 * 4.边距重叠解决方案（BFC）
 *  条件：浮动元素 除‘none’
 *      定位元素 absolute fixed
 *      display为inline-block table-cell table-caption
 *      overflow：hidden auto scroll
 *   特性：内部的box会在垂直方向上一个一个放置
 *      垂直方向距离由margin决定
 *      bfc区域不会与float元素区域重叠
 *      在计算bfc高度，浮动元素参与计算
 *      bfc就是页面独立容器，容器内的子元素不会影响外面元素
 * 5.css reset 和normalize.css 区别
 *     两者都是通过重置样式，保持浏览器样式的一致性
        前者几乎为所有标签添加了样式，后者保持了许多浏览器样式，保持尽可能的一致
        后者修复了常见的桌面端和移动端浏览器的bug：包含了HTML5元素的显示设置、预格式化文字的font-size问题、在IE9中SVG的溢出、许多出现在各浏览器和操作系统中的与表单相关的bug。
        前者中含有大段的继承链
        后者模块化，文档较前者来说丰富
    6.居中：
        水平：
        1.针对inline inline-block inline-table inline-flex img span button
            text-align: center
        2.不定宽块级元素
            margin： 0 auto//父级要设宽度
        垂直：
        1.单行内联元素垂直举居中
            height：120px;
            line-heigit: 120px;
        2.利用表
            parent：
                display: table
            son:
                display: table-cell
                vertical-align:middle
                text-align: center
        3.flex    ie10+
            parent: {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        4.绝对定位
            1.已知高度：
            parent {
                position: relative;
            }
            son {
                position: absolute;
                top: 50%;
                height: 100px;
                margin-top: -50px;
            }
            2.未知高度
            parent {
                position: relative;
            }
            son {
                position: absolute;
                top: 50%;
                transform: translateY(-50%)
            }
        水平垂直
            1.flex 
            parent {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            2.grid 
            parent: {
                heigth: 100px;
                display: grid;
            }
            son {
                margin: auto;
            }
    7.css优先级
        内联 > #id > class=属性a[href="baidu"]=伪类：hover > 伪元素::after=tag > * 
        ！important 优先级最高 js也无法修改
        最近的祖先样式比其他祖先样式优先级高
        直接样式"比"祖先样式"优先级高
        行内 > 内部 > 外部
        后代选择器 .fa .ch{}
        子选择器 .fa>.ch{}
        相邻选择器 .bro1+ .bro2 {}
    8.清除浮动
        bfc 盒子特性->bfc形成条件->
        1.父盒子：overflow:hidden
        2:添加元素：clear：both
        3:
        clearfix::after {
            visibility: hidden;
            display: block;
            height: 0;
            content: " ";
            clear: both;
            overflow:hidden;
        }
        clearfix {
            zoom:1;兼容ie6以下
        }
    9.自适应布局
        1.定宽——自适应（float——margin）
        2.全局布局 pisition
        3.flex：设为flex布局以后 float clear vertical-align失效
        盒子：parent {
                display: flex;
                flex-direction: row/row-reverse/columu/column-reverse主轴方向
                flex-wrap：nowrap/wrap/wrap-reverse如何换行
                flex-flow：<flex-drection> <flex-wrap>
    主轴对齐方式 justify-content:flex-start/flex-end/center/space-between/space-around
项目在纵轴对齐方式 align-items：flex-start/flex-end/center/baseline/stretch-拉直
多根轴线对齐方式 align-content：flex-start/flex-end/center/stretch/space-between/space-around
        项目：item {
                order：0/1/2
                flex-grow：方大比例
                flex-shrink：缩小比例
                flex-basis:占主轴空间
                flex：flex-grow flex-shrink flex-basis
                align-self:auto/flex-start/flex-end/center/baseline/stretch

            }
            }

 *  */  
}
</script>
<style lang="less" scoped>
    .wrap{
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
            .center{
            background-color: pink;
        }
}

</style>