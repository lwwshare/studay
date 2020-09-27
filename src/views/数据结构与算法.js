//1。排序
//冒泡排序
function bubleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        //内层两辆比较
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
//选择排序
function selectSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        //外层最小的与内层比较
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}

//3.插入排序
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
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
    if (arr.length <= 1) {
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
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            for (let j = i; j > 0; j -= gap) {
                if (arr[j] < arr[j - gap]) {
                    [arr[j], arr[j - gap]] = [arr[j - gap], arr[j]];
                } else {
                    break;
                }
            }
        }
    }
}

//动态规划
function cStairs(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else {
        return cStairs(n - 1) + cStairs(n - 2);
    }
}

//二分查找
function binaryFind(arr, target) {
    let low = 0,
        high = arr.length - 1;
    while (low <= high) {
        var mid = parseInt((high + low) / 2);
        if (key == arr[mid]) {
            return mid;
        } else if (key > arr[mid]) {
            low = mid + 1;
        } else if (key < arr[mid]) {
            high = mid - 1;
        } else {
            return -1;
        }
    }
}
//递归二分查找
function binaryFind(arr, key, low, high) {
    if (low > higt) {
        return -1;
    };
    let mid = parseInt((low + high) / 2);
    if (arr[mid] === key) {
        return mid;
    } else if (arr[mid] > key) {
        high = mid - 1;
        binaryFind(arr, key, low, high);
    } else if (arr[mid] < key) {
        low = mid + 1;
        binaryFind(arr, key, low, high);
    }
}

// 二叉树最大深度
var maxDepth = function(root) {
    if (!root) return 0
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};

//二分查找
//递归
let binaryFind2 = (arr, key, start, end) => {
        if (start > end) return -1;
        let mid = Math.ceil((start + end) / 2);
        if (arr[mid] == key) return mid;
        arr[mid] > key ? binaryFind2(arr, key, start, --mid) : binaryFind2(arr, key, ++mid, end);
    }
    //非递归
let binaryFind2 = (arr, key) => {
    let start = 0,
        end = arr.length - 1,
        mid = 0;
    while (start <= end) {
        mid = Math.ceil((start + end) / 2);
        if (arr[mid] === key) {
            return mid;
        };
        arr[mid] > key ? end = mid - 1 : start = mid + 1;
    };
    return;
};

//之字形遍历二叉树
public void loop(TreeNode root) {
    if (root == null) return;

    ArrayList < TreeNode > res = new ArrayList < > ();

    Stack < TreeNode > stack1 = new Stack < > ();
    Stack < TreeNode > stack2 = new Stack < > ();
    boolean left2Right = true;

    stack1.push(root);

    while (!stack1.isEmpty() || !stack2.isEmpty()) {
        // 从左向右
        if (left2Right) {

            while (!stack1.isEmpty()) {
                TreeNode node = stack1.pop();
                res.add(node);
                if (node.left != null) {
                    stack2.push(node.left);
                }
                if (node.right != null) {
                    stack2.push(node.right);
                }
            }
            // 从右向左
        } else {

            while (!stack2.isEmpty()) {
                TreeNode node = stack2.pop();
                res.add(node);
                if (node.right != null) {
                    stack1.push(node.right);
                }
                if (node.left != null) {
                    stack1.push(node.left);
                }
            }

        }
        left2Right = !left2Right;
    }

    for (TreeNode node: res) {
        System.out.println("" + node.value);
    }
}