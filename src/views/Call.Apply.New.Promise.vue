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

6.async
function myAsync(){

}

7.节流防抖

}
8.
 */
}
</script>

