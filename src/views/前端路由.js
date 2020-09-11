//h5: pushState(), replaceState()
//1.push

//与hash模式类似，只是将window.hash改为history.pushState

//2.replace

//与hash模式类似，只是将window.replace改为history.replaceState

//3.监听地址变化

//在HTML5History的构造函数中监听popState（window.onpopstate）

class Routers {
    constructor() {
        // 储存hash与callback键值对
        this.routes = {};
        // 当前hash
        this.currentUrl = '';
        // 记录出现过的hash
        this.history = [];
        // 作为指针,默认指向this.history的末尾,根据后退前进指向history中不同的hash
        this.currentIndex = this.history.length - 1;
        this.refresh = this.refresh.bind(this);
        this.backOff = this.backOff.bind(this);
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    route(path, callback) {
        this.routes[path] = callback || function() {};
    }

    refresh() {
            this.currentUrl = location.hash.slice(1) || '/';
            // 将当前hash路由推入数组储存
            this.history.push(this.currentUrl);
            // 指针向前移动
            this.currentIndex++;
            this.routes[this.currentUrl]();
        }
        // 后退功能
    backOff() {
        // 如果指针小于0的话就不存在对应hash路由了,因此锁定指针为0即可
        this.currentIndex <= 0 ?
            (this.currentIndex = 0) :
            (this.currentIndex = this.currentIndex - 1);
        // 随着后退,location.hash也应该随之变化
        location.hash = `#${this.history[this.currentIndex]}`;
        // 执行指针目前指向hash路由对应的callback
        this.routes[this.history[this.currentIndex]]();
    }
}