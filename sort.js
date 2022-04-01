// 快速排序 O(nlogn)
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return arr;
    let i = left, j = right - 1;
    while (i <= j) {
        if (arr[i] > arr[right]) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            j--;
        } else {
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    quickSort(arr, left, j);
    quickSort(arr, i + 1, right);
    return arr;
}

// 归并排序 O(nlogn)
function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    if (left.length) {
        result.push(...left);
    }
    if (right.length) {
        result.push(...right);
    }
    return result;
}

function mergeSort(arr) {
    let len = arr.length;
    if (len < 2) {
        return arr;
    }
    let middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

// 堆排序
function heapSort(arr) {
    let len = arr.length - 1;
    buildMaxHeap(arr, len);
    while (len >= 1) {
        [arr[0], arr[len]] = [arr[len], arr[0]];
        len--;
        maxHeapify(arr, 0, len);
    }
}

function buildMaxHeap(arr, len) {
    for (let i = Math.floor(len / 2); i >= 0; --i) {
        maxHeapify(arr, i, len);
    }
}

function maxHeapify(arr, i, len) {
    for (; (i << 1) + 1 <= len;) {
        let lson = (i << 1) + 1;
        let rson = (i << 1) + 2;
        let large;
        if (lson <= len && arr[lson] > arr[i]) {
            large = lson;
        } else {
            large = i;
        }
        if (rson <= len && arr[rson] > arr[large]) {
            large = rson;
        }
        if (large !== i) {
            [arr[i], arr[large]] = [arr[large], arr[i]];
            i = large;
        } else {
            break;
        }
    }
}

// 希尔排序
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 3) {          //动态定义间隔序列
        gap = gap * 3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}

// 插入排序
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i], left = 0, right = i - 1;
        while (left <= right) {
            let middle = (left + right) / 2;
            if (key < middle) {
                right = middle - 1;
            } else {
                left = middle;
            }
        }
        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = key;
    }
    return arr;
}

// 冒泡排序
function bubbleSort(arr) {
    let i = arr.length - 1;
    while (i > 0) {
        let pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                pos = j;
            }
        }
        i = pos;
    }
    return arr;
}

// 选择排序
function selectionSort(arr) {
    let minIndex;
    for (let i = 0; i < arr.length; i++) {
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}