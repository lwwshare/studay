<template>
     <div>
        <input type="text" id="txt">
        <p id="show"></p>
    </div>
</template>
<script>
export default {
/**
 1.vue v-model 双向数据绑定原理
     对象的数据属性 默认值；
    Object.defineProperty(obj, 'key', {
        value: undefined,
        writable: true,
        enumerable: true,
        configurable: true//是否可被delete
        get () {},
        set (a) {}
    })
    
    -----------------------------
    var obj = {};
    Object.defineProperty(obj, 'txt', {
        get: function () {//依赖收集//不能和value,writable一起用
            return obj.txt;
        },
        set: function (newValue) {//触发更新
            obj.txt = newValue;
            document.getElementById('txt').value = newValue;
            document.getElementById('show').innerHTML = newValue;
        }
    })
    document.addEventListener('keyup', function(e) {
        obj.txt = e.target.value;
    })

    ------------------------------
    1.代理数据
    Vue.prototype.proxyData = function () {
        Object.keys(this.$data).forEach(key => {
            Object.defineProperty(this, key, {
                enumberable: true,
                configurable: false,
                get () {
                    return this.$data[key];
                },
                set (val) {
                    if (val === this.$data[key]) return;
                    this.$data[key] = value;
                }
            })
        })
    }
    2.observer.js (数据劫持)
    function Observer(data) {
        this.$data = data;
        Object.keys(data).forEach(key => {
            this.defineReactive(this.$data, key, this.$data[key]);
        })
    }
    Observer.prototype.defineReactive = function (data, key, value) {
        Object.defineProperty(data, key, {
            enumberable: true,
            configurable: false,
            get () {
                return value;
            },
            set (val) {
                if (val === value) return;
                value = val;
                bus.$emit(key);
            }
        })  
    }
    3.eventEmitter.js(发布订阅操作)
    function EventEmitter() {
        this.subs = {};
    }
    EventEmitter.prototype.$on = function (type, fn) {
        this.subs[type] = this.subs[type] || [];
        this.subs[type].push(fn);
    }
    EventEmitter.prototype.$emit = function (type, ...args) {
        if (this.subs[type]) {
            this.subs[type].forEach(fn => {
                fn.call(this, ...args);
            }) 
        }
    }
    
    const bus = new EventEmitter();

 *  */ 
}
</script>