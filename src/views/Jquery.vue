<template>
</template>
<script>
export default {
/**
 * 1.手写jq插件
 * （function($){
 *  $.fn.myPlugin = function (options) {
 *  options = $.extend(defaults, options);//对象合并
 *  this.each(function () {
 *      //执行代码逻辑
      })
     }
     })(jQuery)

     $(selector).myPlugin（参数）;

     2.jq入口
        $(document).ready(function(){
            //一旦dom结构渲染完毕就可执行
        })
        
        $(function() {
            
        })
        和window.onload区别：
        1.jq入口函数可以书写多次 window.onload只能书写一次
        2.jq一旦dom渲染完毕即可执行 window.onload等页面文档，外部js文件图片加载完才执行
    3.

 */
}
</script>