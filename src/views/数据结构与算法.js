const { construct } = require("core-js/fn/reflect");

//3.插入排序
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j-1]) {
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
            } else {
                break
            }

        }
    }
    return arr;
}

//冒泡排序 选择排序 直接插入排序 时间复杂度On2  最坏时间复杂度N2， 空间复杂度1

//快速排序 时间复杂度 nlogn  空间logn
function quickSort(arr) {
    if(arr.length <=1) {
        return arr;
    }
    let current = arr.splice(0, 1),
    left = [],
    right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < current) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(current, quickSort(right));
}

//希尔排序 nlogn  空间复杂度1
//希尔排序是插入排序的改良算法，但是核心理念与插入算法不同，
//他会先比较距离较远的元素，而非相邻的元素，
//在插入排序的基础上。步长按照3.2，1来进行比较，相当于是三层循环和嵌套
//核心思想就是取为排序区间中的元素，在一排序区间中找到合适的插入位置将其插入，
//并保证已经排序区间数据一直有序，重复这个过程 知道未排序区间中元素为空

function shellSort(arr) {
    let n = arr.length;
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n; i++) {
            for (let j = i; j > 0; j-=gap) {
                if (arr[j] < arr[j-gap]) {
                    [arr[j], arr[j-gap]] = [arr[j-gap], arr[j]];
                } else {
                    break;
                }
            }          
        }
    }
}

//动态规划
function cStairs (n) {
    if (n === 1 || n === 2) {
        return 1;
    } else {
        return cStairs(n-1) + cStairs(n-2);
    }
}

//二分查找
function binaryFind(arr, target) {
    let low = 0,
    high = arr.length -1;
    while (low <= high) {
        var mid = parseInt((high+low)/2);
        if (key == arr[mid]) {
            return mid;
        } else if (key>arr[mid]){
            low = mid +1;
        } else if (key < arr[mid]) {
            high = mid - 1;
        } else {
            return -1;
        }
    }
} 
//递归二分查找
function binaryFind (arr, key, low, high) {
    if (low > higt) {
        return -1;
    };
    let mid = parseInt((low+high)/2);
    if (arr[mid] === key) {
        return mid;
    } else if (arr[mid] > key) {
        high = mid - 1;
        binaryFind(arr, key, low, high);
    } else if (arr[mid] < key) {
        low = mid+1;
        binaryFind(arr, key, low, high);
    }
 }
 //1.栈：先进后出
 class Stack {
     constructor() {
         this.items = [];
     }
     push(item) {
         this.items.push();
     };
     pop() {
         this.items.pop();
     };
     get peek() {
        return this.items[this.items.length - 1]; 
     };
     get isEmpty () {
         return !this.items.length;
     };
     get size () {
         return this.items.length;
     }
     clear () {
         this.items = [];
     }
 }
 const stack = new Stack();

 //2队列：先进先出
 class  Queue {
     constructor(items) {
        this.items = items || [];
     };
     enqueue(item) {
         this.items.push(item);
     };
     dequeue(item) {
         this.items.shift(item);
     };
     front() {
        return this.items[0];
     };
     clear() {
         this.items = [];
     };
     get size() {
         this.items.length;
     };
     get isEmpty() {
         return !this.items.length;
     };
     print() {
         console.log(this.items.toString());
     }
 }
 //3链表
 //存储有序元素的集合
// 但是不同于数组，每个元素都是一个存储元素本身的节点和指向下一个元素的引用组成；
// 想要访问链表中间的元素，需要 从起点开始遍历找到所需元素
class Node{
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}
class LinkList{
    constructor() {
        this.head = null;
        this.length = 0;
    };
    append(element) {
        const node = new Node(element);
        let current = null;
        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = node;
        };
        this.length++;
    }
}

//字典：类似对象， 以key，value存储着
class Dictionary {
    constructor() {
        this.items = [];
    };
    set(key, value) {
        this.items[key] = value;
    };
    get (key) {
        return this.items[key];
    };
    remove(key) {
        delete this.items[key];
    };
    get keys () {
        return Object.keys(this.items);
    };
    get values () {
        return Object.values(this.items);
    }
};
// 二叉树
//节点
function Node(data, left, right) {
    this.left = left;
    this.right = right;
    this.data = data;
    this.show = () => {
        return this.data;
    }
}
//二叉树
function BST () {
    this.root = null;
    this.insert = insert;
}

function insert() {
    var node = new Node(data, null, null);
    if (this.root === null) {
        this.root = node;
    } else {
        var current = this.root;
        var parent;
        while(true) {
            parent = current;
            if (data < current.data) {
                current = current.left;
                if (current === null) {
                    parent.left = node;
                    break;
                }
            } else {
                current = current.right;
                if (current === null) {
                    current.right = node;
                    break;
                }
            }
        }
    }
}