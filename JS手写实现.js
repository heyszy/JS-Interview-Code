// 手写instanceOf
function myInstanceof(left, right) {
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left)
    // 获取构造函数的 prototype 对象
    let prototype = right.prototype;
    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
        proto = Object.getPrototypeOf(proto);
    }
}

// 浅拷贝
function shadowClone(target) {
    const result = {};
    for (let key in target) {
        result[key] = target[key];
    }
    return result;
}

// 深拷贝
function deepClone(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        const result = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, result);
        for (const key in target) {
            result[key] = deepClone(target[key], map);
        }
        return result;
    } else {
        return target;
    }
}

// call函数实现
Function.prototype.myCall = function (context, ...args) {
    // 判断调用对象
    if (typeof this !== "function") {
        console.error("type error");
    }
    // 判断 context 是否传入，如果未传入则设置为 window
    context = (context === 'null' || context === 'undefined') ? window : Object(context);
    // 将调用函数设为对象的方法
    const tmp = Symbol('临时函数');
    context[tmp] = this;
    // 调用函数
    let result = context[tmp](...args);
    // 将属性删除
    delete context[tmp];
    return result;
};

// apply函数实现
Function.prototype.myApply = function (context, args) {
    if (typeof this !== 'function') {
        throw new TypeError;
    }
    context = (context === 'null' || context === 'undefined') ? window : Object(context);
    const tmp = Symbol('临时函数');
    context[tmp] = this;
    let result;
    if (args) {
        result = context[tmp](...args);
    } else {
        result = context[tmp]();
    }
    delete context[tmp];
    return result;
}

// bind函数实现
Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError;
    }
    context = (context === 'null' || context === 'undefined') ? window : Object(context);
    let fn = this;
    let res = function (...rest) {
        return fn.apply(this instanceof res ? this : context, [...args, ...rest]);
    }
    res.prototype = Object.create(fn.prototype);
    return res;
}

// 防抖
function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay)
    }
}

// 节流 计时器版
function throttle(fn, delay) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(()=>{
                fn.apply(this, args);
                timer = null;
            }, delay)
        }
    }
}

// 节流 Date版
const throttleByDate = function (fn, delay) {
    let startTime = Date.now()
    return function (...args) {
        let lastTime = Date.now()

        if (lastTime - startTime > delay) {
            fn.apply(this, args)
            startTime = Date.now()
        }
    }
}

// Promise.all
Promise.myAll = (arr) => {
    //返回一个promise
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            throw new TypeError(`argument must be a array`)
        }
        const length = arr.length  //传入的promise的个数
        let count = 0  //进入fullfilled的promise个数
        const result = []  //创建一个等长的数组,放置结果
        // 当传递是一个空数组，返回一个为fulfilled状态的promise
        if (arr.length === 0) {
            return Promise.resolve(arr)
        }
        for (let i = 0; i < length; i++) {
            Promise.resolve(arr[i]).then(res => {
                result[i] = res;//将每次结果保存在result数组中
                count++;  //个数加1
                if (count === length) {
                    resolve(result)  //返回结果
                }
            }).catch(e => {
                reject(e)  //如果有错误则直接结束循环，并返回错误
            })
        }
    })
}

// Promise.race
Promise.myRace = (arr) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            throw new TypeError("argument must be an array");
        }
        const length = arr.length;
        for (let i = 0; i < length; i++) {
            Promise.resolve(arr[i]).then((res) => {
                resolve(res);
            }).catch(e => reject(e))
        }
    })
}

// Promise.finally
Promise.prototype.myFinally = (callback) => {
    let P = this.costructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {throw reason})
    );
}

// 柯里化
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };
}

// Object.create()
const create = function (proto) {
    if (typeof proto !== "object" && typeof proto !== "function") {
        // 类型校验
        throw new TypeError("proto必须为对象或者函数");
    } else if (proto === null) {
        // null 特殊处理
        throw new Error("在浏览器中暂不支持传递null");
    }

    // 创建一个构造函数
    function F() {}
    // 更改其 prototype
    F.prototype = proto;

    // 返回构造的实例， 这个时候返回的实例和传入的 proto中间多了一层 F
    return new F();
};

// new
function myNew(fn, ...args){
    if(typeof fn !== 'function') {
        throw 'fn must be a function';
    }
    let obj = {};//新建一个对象
    obj.__proto__ = fn.prototype;//把实例对象的原型指向构造函数的原型对象
    // 这两步可以简化为 Object.create(fn.prototype);
    let result = fn.call(obj, args);//绑定this  传入参数
    return result instanceof Object ? result : obj;
}

// setTimeout实现setInterval
function interval(func, delay){
    let timer = null;
    let interFunc = function(){
        func.call(null);
        timer = setTimeout(interFunc, delay) // 递归调用
    }
    timer = setTimeout(interFunc, delay) // 触发递归
    function clearInterval(){
        clearTimeout(timer);
    }
    return clearInterval;
}