<template>
</template>
<script>
export default {
/**
 1.行为型：策略模式，迭代器模式，观察者（发布订阅模式），命令模式，状态模式，
 2.结构型：适配器模式，代理模式；
 3.创建型：工厂模式，单例模式，原型模式；

 1.工厂模式：通过一个共同的借口 创建不同的对象 用工厂方法代替new操作
    构造函数和创建者分离：对new操作进行封装；
 class Factory{
     create(name) {
         return new Animal(name);
     }
 }
 class Animal {
     constructor(name) {
         this.name = name;
     }
 }
 let factory = new Creator();
 let duck = factory.create('duck');
 let chicken = factory.create('chicken');
 
 2.单例模式：如果已经创建，则直接返回
 function creatSingle() {
     let obj = null;
     if (!obj) {
         obj = xxx;
     }
     return obj;
 }
 class singleton {
     constructor (name) {
         this.name = name;
         this.instance = null;
     };
     static getInstance(name) {//静态方法 可以直接在构造函数上调用singleton.xxx();
         if (!this.instance) {
             this.instance = new singleton(name);
         }
         return this.instance;
     }
 }

3.原型模式：创建一个共享的原型，通过拷贝这个原型创建新的类
let prototype = {
    name: 'lww',
    getname: function () {
        console.log(this.name);
    }
}
let person = Object.create(prototype, {
    'name': {
        value: 'hhh'
    }
})
person.getname();

4.解决两端不兼容的问题
[{
    "day": '周一'，
    “x”：100，
},{
    "day": '周二'，
    “x”：200
}]
["周一"，“周二”]
function adapter(res) {
    return res.map(item => item.day);
}
5.代理模式：为一个对象提供一个代用品或者占位符，以便控制对他的访问

6.策略模式： 把一系列方法封装起来，使他们方便替换
let strategies = {
    'a': function (data) {return data*4},
    'b': function (data) {return data*3}
}
function calculate (type, data) {
    return strategies[type](data);
}
calculate('a', 200);

7.迭代器模式：提供一种方法 顺序访问一个对象里面的各元素 而不需要暴露对象内部，
迭代器模式可以把迭代的过程和业务分离；
class Creater() {
    constructor(list) {
        this.list = this;
    }
    createIterator() {
        return new Iterator(this)
    }
}

class Tterator {
    constructor(creater) {
        this.list = creater.list;
        this.index = 0
    };
    idDone() {
        if (this.index >= this.list.length) {
            return true;
        }
        return false;
    }
    next () {
        return this.list[this.index++];
    }
}
let arr = [1,2,3,4];
let creater = new Creater(arr);
let iterator = creater.createIterator();
while (!iterator.idDone()) {
    console.log(iterator.next());
}

8.观察者模式（发布订阅模式）是一种一对多的依赖关系，当一个对象的状态发生改变时，通知依赖他的对象
在js开发中，我们一般用事件模型来替代传统的发布-订阅模型；
观察者：
//目标者类
class Subject {
    constructor () {
        this.observers = [];
    }
    add(observer) {
        this.observers.push(observer);
    }
    remove(observer) {
        let index = this.observers.findIndex(item => item === observer);
        index > -1 && this.observers.splice(index, 1);
    }
    notyfy () {
        for (let observer of this.observers) {
            observer.update();
        }
    }
}
//观察者：
class Observer{
    constructor(name) {
        this.name = name;
    }
    update() {
        console.log('更新了，我是'+ this.name);
    }
}
let subject = new Subject();
let obs1 = new Observer('lww');
let obs2 = new Observer('jjj');
subject.add(obs1);
subject.add(obs2);
subject.notify();
//

发布订阅：
//事件中心；
class Event {
    constructor () {}
    handlers = {};
    //添加事件
    add(type, fn) {
        if (!(type in this.handlers)) {
            this.handlers[type] = []
        }
        this.handlers[type].push(fn);
    }
    //触发事件
    fire(type,...params) {
        if (!(type in this.handlers)) {
            return new Error('未注册事件')；
        }
        this.handlers[tupe].forEach（fn => {
            handler(...params);
        }）
    }

    remove(type, fn) {
        if (!(type in this.handlers)) {
            return new Error('无效事件')
        }
        if (!fn) {
            delete this.handlers[type];
        } else {
            const index = this.handlers[type].findIndex(item => item === fn);
            if (index === -1) {
                return new Error('没有该事件');
            }
            this.handlers[type].splice(index, 1);
            if (this.handlers[type].length === 0) {
                delete this.handlers[type];
            }
        }
    }
    let event = new Event();
    function load1 (params) {};
    function load2 (params) {};
    event.add('load', load1);
    event.add('load', load2);
    event.fire('load', params);
    event.remove('load', load1);

}

 */
}
</script>