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
function selectSort() {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        //外层最小的与内层比较
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
}
//插入排序
//快速排序
//希尔排序