<template></template>
<script>
export default {
/**
 * 1.类型检测
 *  检测数组 Array.isArray()
 *  constructor：null undefined 没有constructor判断不了
 *   XX instance of Object: object.prototype是否在要检测的对象原型上
 *  typeof 检测基本类型。 null 也返回 object
 *  Object.prototype.toString.call()
 * 2.sort() 比较的是字符串 传递排序函数才能排数字
 *  sort(function (a.b) {
 *      return a-b/正序
 *  })
 *  slice(1, 3) 原数组不变 从索引1到索引2的项 不包含结束位置
 *  splice(1, 3, 4) 原数组变化 删除 插入 替换 不包含结束位置
 *  foreach()没有返回值
 *  map()返回新数组
 *  filter()返回满足条件组成的新数组
 *  every() 判断每条都符合条件才返回true
 *  some()只有一项符合就返回true
 *  reduce(function (initialval, next), initval)
  
 * 3.深拷贝
    //所谓深度克隆，就是当对象的某个属性值为object或array的时候，要获得一份copy，而不是直接拿到引用值
        function deepClone(origin,target) {  //origin是被克隆对象，target是我们获得copy
            var target = target || {}; //定义target
            for(var key in origin) {  //遍历原对象
                if(origin.hasOwnProperty(key)) {
                    if(Array.isArray(origin[key])) { //如果是数组
                        target[key] = [];
                        target[key] = deepClone(origin[key],target[key]) //递归
                    } else if (typeof origin[key] === 'object' && origin[key] !== null) {
                        target[key] = {};
                        target[key] = deepClone(origin[key],target[key]) //递归
                    } else {
                        target[key] = origin[key];
                    }
                }
            }
            return target;
        }

    *  function deepclone(obj) {
    *  var target = {}
    *  for (var key in obj) {
    *  if (object.prototypr.hasownproperty.call(obj, key)) {
          if (typeof obj[key] == 'object') {
               target[key] = deepclone(obj[key])
          } else {
              target[key] = obj[key];
          }
      }
      }
     return target;
     }
 *      json:
 *          let tmp = JSON.stringfy(obj);
 *          let result = JSON.parse(tmp)
 *   4.正则实现trim（）
 *      str.replace(/^\s+|\s+$/g, '');
 *   5.原型 
 *      每个对象都有_proto_属性，但是只有函数才有 prototype属性
 *   6.es6
*      1.let const 
*         let没有变量声明提升 ‘暂时性死区’
*         有块级作用域 {}
*         不能重复声明
*         const生命的时候必须赋值，且之后不能改变
*       2.模版字符串
*       3.箭头函数
*          不需要function关键字
*          省略了return
*          继承定义时当前上下文中的this关键字
*          不能使用call，apply等改变this指向
*       4.解构赋值
*       5.对象属性简写
*       6.promise 异步编程串行化 避免回调地狱
*       7.class类
*         class parent {
*              constructor(name) {
*                  this.name=name;
*              }
*          }
*        8.模块化
*          nodejs: module.exports = {}-> require();
*          es6: export let port=3000->import * form 'xx';
*        9.set 存储无重复值的有序列表 foreach()
*          set set = new Set()
*          set.add(1);set.size//1
*          set.has(1);
*          set.delete(1);
*          let [...arr] = set 转换数组
*          WeakSet  不接受基本类型数据，只接受对象
*        10.map foreach()
*          let map = new map()
*          map.set('title','title')
*          map.size//1
*          map.get('title')
*          has() delete() clear()
*     7.数组去重
*       1.es6: Array.from(new Set(arr)), [...new Set(arr)];无法去掉{}
*       2.双循环 边际判断 flag 是件复杂度高
*         3.indexof
*       function unique(qrr) {
*         if (!Array.isArray(arr)) {
*           console.log('error')
*              return;   
*          }
*          let res = [];
*          for(let i=0; i<arr.length;i++) {
*              if (res.indexof(arr[i]) === -1) {
*                  res.push(arr[i]);
*              } 
*             }
*          return res;
*          } 
*          4.ondexof2
*          return Array.prototype.filter.call(arr, function(item, index) {
*              return arr.indexof(item) === index;
*          })
 * 8.事件流 捕获阶段-目标阶段-冒泡阶段
 *  1.事件委托：可以节省内存空间，减少事件注册
 *              当新增子对象时，无需再绑定事件
    * var ul = document.getelementbyid(ul); 
    * myaddevent(ul,'click', function(e){
    * var e = e || window.event;
    * var target = e.target || e.srcelement;
    * if (target.nodename === ‘li’) {
    * //处理事件程序
    * }
    * })
    * ui事件： load unload scroll error resize
    * 鼠标与滚轮：click dblclick mousedown 
    *       mouseup mouseover mouseout mousemove mouseenter mouseleave(无冒泡)
    * 键盘与文本：keydown （键盘吗 eventkeycode）keypress keyup textinput
 *  9.  childNodes
 *      firstChild
 *      parentNode
 *      nextSibling
 *      previousSibling
 *      hasChildNode()
 *      appendChild()
 *      insertChild()
 *      replaceChild()
 *      removeChild()
 *      cloneChild()
 *      var html = document.documentelement;
 *      var body = document.body    
 *      var doctype = document.doctype;
 *      document.getelementbyid()
 *      document.getelementbytagname()
 *    静态节点：
 *      document.querySelector()
 *      document.querySelevtorAll()
 *    h5:
 *      document.getelementbyclassname()
 *      classList属性：add remove toggle
 *      focus()
 *      document.readyState = loading/complete 文档是否已经加载完毕
  
 */
}

function creat() {
    let ul = document.getElementById('ul'),
    html;
    for (let i = 0; i<10; i++) {
        html+=`<li>${i}</li>`;
    }
    ul.innerHTML = html;
}

//list to tree
function listToTree(oldArr){
    oldArr.forEach(element => {
        let parentId = element.parentId;
        if(parentId !== 0){
            oldArr.forEach(ele => {
                if(ele.id == parentId){ //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
                    if(!ele.children){
                        ele.children = [];
                    }
                    ele.children.push(element);
                }
            });
        }
    });
    console.log(oldArr)  //此时的数组是在原基础上补充了children;
    oldArr = oldArr.filter(ele => ele.parentId === 0); //这一步是过滤，按树展开，将多余的数组剔除；
    console.log(oldArr)
    return oldArr;
}
//reverse
  function reverse(myArr){
        var left=0;//存储左边第一个位置
        var right=arr.length-1;//存储右边最后一个位置
        while(left<right){//停止进行的条件
        var temp=myArr[left];//利用一个中间变量来交换位置
        myArr[left]=myArr[right];
        myArr[right]=temp;
        left++;
        right--;
}
</script>