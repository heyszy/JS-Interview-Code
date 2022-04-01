// 数组扁平化
let arr = [1, 3, [2, 4, [5, 6]], 3, 6, 8];
arr.flat(3);
arr.flat(Infinity);

function flat(arr) {
    let result = [];
    let fn = function(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                fn(arr[i]);
            } else {
                result.push(arr[i]);
            }
        }
    };
    fn(arr);
    return result;
}

function flat2(arr) {
    while(arr.some(item=>Array.isArray(item))){
        // 只要有数组类型 都会通过展开运算符进行降维
        arr = [].concat(...arr);
    }
    return arr;
}

//数组去重
let new_arr =[...new Set(arr)]

const fn1 = (arr) => {
    let new_arr = [];
    arr.forEach((item)=>{
        if(new_arr.indexOf(item) === -1){
            // if(new_arr.find((value)=>item === value) === undefined){ // 使用 find 也可以
            new_arr.push(item);
        }
    })
}

const fn2 = (arr) => {
    let new_arr = arr.reduce((pre, value) => {
        if(!pre.includes(value)){
            pre.push(value);
        }
        return pre;
    }, [])
    return new_arr
}

// reduce
Array.prototype.myReduce = function(cb, initValue) {
    if (!Array.isArray(this)) {
        throw new TypeError("not a array")
    }
    if (this.length === 0 && arguments.length < 2) {
        throw new TypeError('Reduce of empty array with no initial value')
    }
    let arr = this
    let res = null
    // 判断有没有初始值
    if (arguments.length > 1) {
        res = initValue
    } else {
        res = arr.splice(0,1)[0] //没有就取第一个值
    }
    arr.forEach((item, index) => {
        res = cb(res, item, index, arr) // cb 每次执行完都会返回一个新的 res值，覆盖之前的 res
    })
    return res
};

// 测试结果
let arr = [1,2,3,4]
let result = arr.myReduce((res, cur) => {
    return res + cur
})
console.log(result) // 10