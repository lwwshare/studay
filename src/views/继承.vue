<template>
</template>
<script>
export default {
/**
 1. 原型链继承
  function Person() {
      this.name = 'person';
  }
  person.prototype.getName = function () {
      console.log(this.name);
  }
  function Child() {};
  Child.prototype = new Person();
  缺点：引用类型的属性会被所有实例共享
        在创建child的实例时，不能像person传递参数
2.借用构造函数继承（经典继承）
    function person(name) {
        this.name = name;
        this.color=[1,2,3];
    }
    person.prototype.getname = function () {
        console.log(this.name);
    }
    function child (name) {
        person.call(this, name);
    };
    优点：避免引用类型的属性被所有实例共享
            可以从child像person传递参数
    缺点：只是子类的实例 不是父类的实例
        每次创建实例都会创建一边方法
3.组合继承
    function person(name) {
        this.name =name;
        this.color=[1,2,3];
    }
    person.prototype.getname = function () {
        console.log(this.name);
    }
    function child(name,age) {
        person.call(this,name);第一次调用父类
        this.age = age;
    }
    child.prototype = new person();第二次
    优点：融合了上面
    缺点：调用了两次父构造函数
4.原型式继承
    function createObj(o){
        function F(){};
        F.prototype = o;
        return new F();
    }
    var person = {
        name: 'person',
        friends: [1, 2],
    }
    var person1 = createObj(person);
    var person2 = createObj(person);
    缺点：创建引用类型的属性值始终被共享
5.寄生式继承
    var obj = {
        name: 'person',
        friends: [1, 2],
    };
    function createobj (obj) {
        function f(){};
        f.prototype = obj;
        return new f();
    }
    var obj1 = createobj(obj);
    //ecmascript5写法：
    var obj2 = Oobject.create(obj);

    function createO(obj) {
        var newObj = createObj(obj)/var newObj = object.create(obj);
        newObj.sayname = function () {
            console.log(this.name);
        }
        return newObj；
    }
    var person1 = createO(obj);
    缺点：每次创建都创建一边方法
6.寄生组合式继承（最理想的继承方式）
    function parent(name) {
        this.name = name;
        this.color = [1,2,3];
    }
    person.protorype.sayname = function() {
        console.log(this.name);
    }
    function child(name, age) {
        parent.call(this, name);
        this.age = age;
    }
    function createobj(o) {
        function f(){};
        f.prototype = o;
        return new f();
    }
    function prototype(child, parent) {
        var prototype = createobj(parent.prototype);
        prototype.constructor = child;
        child.prototype = prototype;
    }
    prototype(child,parent);
    var child1 = new child('child', 19);
    优点：只调用一次父构造函数，避免在父构造函数原型上创建不必要的多余的属性
 */
}
</script>