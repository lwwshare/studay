<template>
</template>
<script>
export default {
/**
1.new
function myNew() {
    let obj = new Object(),
    construction = [].shift.call(arguments);
    obj._proto_ = construction.prototype;    
    let res = construction.call(obj,arguments);
    return typeof res === 'object' ? res : obj
}

2.call
function myCall(context, ...args) {
    let context = context || window;
    //改变this
    context.fn = this;
    //调用
    let res = context.fn(...args);
    delete context.fn;
    return res;
}

3.apply
function myApply(context, args) {
    let context = context || window;
    context.fn = this;
    let res;
    if (args) {
        res = context.fn(...args);
    } else {
        res = context.fn();
    }
    delete context.fn;
    return res;
} 

4.bind
function myBind(context) {
    if (typeof this !== 'function') {
        throw new TypeError('type error!')
    };
    let _this = this,
    args = [].shift.call(arguments);
    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, args.concat(arguments));
        }
    }
5.promise
(   
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function myPromise() {
    let self = this;//缓存当前的promise实例
    self.value = null;//成功的值
    self.error = null;//失败的值
    self.status = PENDING;
    self.onFulfilled = null;//成功的回调
    self.onRejected = null;//失败回调
    
    function resolve(value) {
        if (self.status === PENDING) {
             setTimeout(() => {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilled(self.value); resolve时执行回调函数
            })
        }
       
    }
    
    function reject(error) {
        if (self.status === PENDING) {
            setTimeout(() => { 
                self.status = REJECTED;       
                self.eror = error;
                self.onRejected(self.error);//reject时执行的失败回调
            })
        }
    }
    fn(resolve, reject);
}
    myPromise.prototype.then = function(onFulfilled, onRejected) {
        if (this.status === PENDING) {
            this.onFulfilled = onFulfilled;
            this.onRejected = onRejected;
        } else if (this.status === FULFILLED) {
            onFulfilled(this.value);
        } else {
            onRejected(this.error);
        }
        return this;
    }
    module.exports = myPromise;
)

更全面的：-------------------------------------------
(   
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function myPromise() {
    let self = this;//缓存当前的promise实例
    self.value = null;//成功的值
    self.error = null;//失败的值
    self.status = PENDING;
    self.onFulfilledCbs = [];//成功的回调
    self.onRejectedCbs = [];//失败回调
    
    function resolve(value) {
        if (self.status === PENDING) {
             setTimeout(() => {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilledCbs.forEach((callback) =>{
                    callback(self.value);
                });// resolve时执行回调函数
            })
        }
       
    }
    
    function reject(error) {
        if (self.status === PENDING) {
            setTimeout(() => { 
                self.status = REJECTED;       
                self.eror = error;
                self.onRejectedCbs.forEach((callback) => {
                    callback(this.error);
                });//reject时执行的失败回调
            })
        }
    }
    fn(resolve, reject);
}
    myPromise.prototype.then = function(onFulfilled, onRejected) {
        const self = this;
        let bridgePromise;
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => valuel;
        onRejected = typeof onRejected === 'function' ? onRejected : error => {throw new Error(error)};

        if (this.status === PENDING) {
            return bridgePromise = new myPromise((resolve, reject) => {
                self.onFulfilledCbs.push((value) => {
                    try {
                        let x = onFulfilled(value);
                        resolvePromise(bridgePromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                self.onRejectedCbs.push((value) => {
                    try {
                        let x = onRejected(value);
                        resolvePromise(bridgePromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            })
           // this.onFulfilledCbs.push(onFulfilled);
            //this.onRejectedCbs.push(onRejected);
        } else if (this.status === FULFILLED) {
            //onFulfilled(this.value);
            return bridgePromise = new myPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(bridgePromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            })
        } else if (this.status === REJECTED) {
            return bridgePromise = new myPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.error);
                        resolvePromise(bridgePromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            })
        }
    }

    //用来解析回调函数的返回值
    function resolvePromise(bridgePromise, x,resolve, reject) {
        if (x instanceof myPromise) {
            if (x.status === PENDING) {
                x.then(y => {
                    resolvePromise(bridgePromise, y, resolve, reject);
                }, error => {
                    reject(error);
                })
            } else {
                x.then(resolve, reject);
            }
            //如果是普通值，就把值传下去；
        } else {
            resolve(x);
        }
    }

    //catch 其实是一个语法糖 只传onRejected的then方法;
    myPromise.prototype.catch = function(onRejected) {
        return this.then(null, onRejected);
    }
    module.exports = myPromise;
)

    1.all
    myPromise.all = function(promises) {
        return new myPrimise(function (resolve, reject) {
            let result = [];
            let count = 0;
            for (let i = 0; i<promises.length; i++) {
                promise[i].then(function (data) {
                    result[i] = data;
                    if (++count === promises.length) {
                        resolve(result);
                    }
                }, function(error) {
                    reject(error);
                })
            }
        })
    }

    2.race
    myPromise.race = function (promises) {
        return new myPromise(function (resolve, reject) {
            for (let i = 0; i<promises.length; i++) {
                promises[i].then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                })
            }
        })
    }

    3.resolve
    myPromise.resolve = function(value) {
        return new myPromise((resolve) => {
            resolve(value);
        })
    }

    4.reject
    myPromise.reject = function(error) {
        return new myPromise((resolve, reject) => {
            reject(error);
        })
    }

    5.promisify
    myPromise.promisify = function (fn) {
        return function () {
            let args = Array.from(arguments);
            return new myPromise((resolve, reject) => {
                fn.apply(null, args.concat(function(err) {
                    srr ? reject(err) : resolve(arguments[i])
                }));
            })
        }
    }

6.async -> es7
function *Generator () {
    yield '1';
    yield '2';
    return '3';
}
let aaa = Generator();
let a = aaa.next();//{value: '1', done: false};

async函数返回一个promise对象
面对复杂的异步流程，promise提供的all和race会更加好用
promise本身是一个对象，所以可以在代码中任意传递
async支持率还比较低 即使有babel 编译后也还要增加1000行左右代码

co执行器：
function run(gen) {
    const iterator = gen();
    function autoRun(iterator) {
        if (iterator.done) {
            return iterator.value;
        }
        const anotherPromise = iterator.value;
        anotherPromise.then(x => {
            return autoRun(iterator.next(x));
        })
    }
    return autoRun(iterator.next());
}


7.节流防抖
防抖：事件被触发n秒后再执行回调 如果n秒内被触发，则重新计时
function debounce(fn, delay) {
    let timeout;
    return function (args) {
        let context = this;
        let _args = args;
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            fn.appy(context, _args);
            //clearTimeout(timeout);            
        },delay);
    }
}

节流：在单位时间内只触发一次函数，如果多次触发 只有一次生效
function throttle(fn, delay) {
    let previous = 0,
        context,
        args;

    return function () {
        let now = +new Date();
        context = this;
        args = arguments;
        if (now-previous>delay) {
            fn.apply(context, args);
            previous = now;
        }
    }
}
2:
function throttle(fn, delay) {
    let timeout,
    return function () {
        let context = this,
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function() {
<<<<<<< HEAD
=======
                timeout = null;
                fn.apply(context, args);
            }, delay);
        }
    }
}

二者结合:
function debounce_throttle(fn, delay) {
    let timeout,
    context,
    previous = 0;
    return function () {
        context = this;
        args = arguments;
        let now = +new Date();
        if (now-previous > delay) {//时间到了执行
            fn.apply(context, args);
            previous = now;
        } else {//时间不到等待
             timeout = setTimeout(function() {
>>>>>>> aa2f8d670a7835ee4901ca8191200543104aba8b
                timeout = null;
                fn.apply(context, args);
            }, delay);
        }
    }
}

 */
}
</script>

