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