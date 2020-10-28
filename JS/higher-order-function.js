// 高阶函数

// 1.函数可以作为参数被传递 (典型：ajax 请求成功后回调)
let $ajax = function (url, callback) { }
$ajax("/getUserInfo", (result) => {
  console.log(result)
})

// 抽离可变部分，由外部传入函数操作可变部分
let appendDiv = function (callback) {
  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div")
    div.innerHTML = i;
    document.body.appendChild(div)
    if (typeof callback === 'function') {
      callback(div)
    }
  }
}
// 由外部决定div的隐藏 
// appendDiv(function (div) {
//   div.style.display = "none"
// })

// Array.prototype.sort 
let sortNum = [1, 6, 3, 4, 5].sort((a, b) => {
  return a - b;
})
console.log(sortNum)

// 函数作为返回值
const Type = {};
const TypeArr = ['String', 'Array', 'Number', 'Function', 'Null', 'Undefined', 'Object']
for (let i = 0, type; type = TypeArr[i++];) {
  Type[`is${type}`] = (obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}
console.log(Type.isArray([]))
console.log(Type.isUndefined())
console.log(Type.isNumber("23"));

let getSingle = function () {
  return document.createElement("script")
}


// 高阶函数实现AOP(面向切面的编程)
// 面向切面的编程：把核心逻辑模块无关的功能模块抽离出来，再通过动态织入掺入逻辑模块中（保证核心逻辑的整洁，方便复用功能模块
Function.prototype.before = function (beforeFn) {
  let _self = this;
  // 此处只是返回一个函数，并没有执行
  return function () {
    beforeFn.apply(this, arguments); // 执行beforeFn函数
    _self.apply(this, arguments) // 执行原函数
  }
}

Function.prototype.after = function (afterFn) {
  let _self = this;
  // 此处只是返回一个函数，并没有执行
  return function () {
    _self.apply(this, arguments) // 执行prototype.before返回的函数
    afterFn.apply(this, arguments) // 执行afterFn函数
  }
}

var func = function () {
  console.log(2)
}
let newfunc = func.before(function () {
  console.log(1)
}).after(function () {
  console.log(3)
})
newfunc();

// 柯里化 （currying）

let currying = function (fn) {
  let args = [];
  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      [].push.apply(args, arguments)
      return arguments.callee
    }
  }
}

let costFn = (function () {
  let totalMoney = 0;
  return function () {
    for (let i = 0, l = arguments.length; i < l; i++) {
      totalMoney += arguments[i];
    }
    return totalMoney
  }
})()

let cost = currying(costFn)
console.log(cost(100))
console.log(cost(200))
console.log(cost(400))
console.log(cost())

// 反柯里化 (借用函数)
Function.prototype.uncurrying = function () {
  let self = this; // this是指Array.prototype.push
  return function () {
    let obj = Array.prototype.shift.call(arguments) // 截取被应用的对象
    return self.apply(obj, arguments); // 相当于 Array.prototype.push.apply(obj,arguments)
  }
}
// 其他Array方法用在对象上
for (let i = 0, arry = ['push', 'shift', 'forEach']; fn = arry[i++];) {
  Array[fn] = Array.prototype[fn].uncurrying();
}
let obj = {
  length: 4,
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
}
// 下面三个是一样的
Array.push(obj, 4);
Array.prototype.push.call(obj, 4)
Array.prototype.push.apply(obj, [5])
console.log(obj);
Array.shift(obj)
console.log(obj.length);
Array.forEach(obj, item => {
  // console.log(item)
})

Function.prototype.uncurrying2 = function () {
  let self = this;
  return function () {
    return Function.prototype.call.apply(self, arguments) // 相当于 Array.prototype.push.apply(obj,arguments)
  }
}
let push = Array.prototype.push.uncurrying2();
push(obj, 4)
console.log(obj)



// 函数节流

const throttle = function (fn, interval) {
  let _self = fn;
  let timer;
  let firstTime = true;
  return function () {
    let _this = this;
    if (firstTime) {
      _self.apply(_this, arguments)
      return firstTime = false
    }
    if (timer) {
      return false
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null;
      _self.apply(_this, arguments)
    }, interval || 500);
  }
}

// window.onresize = throttle(function () {
//   console.log(1)
// }, 400)


let timeChunk = function (ary, fn, count) {
  let timer;
  let start = function () {
    for (let i = 0; i < Math.min(count || 1, ary.length); i++) {
      let obj = ary.shift();
      fn(obj);
    }
  }
  return function () {
    timer = setInterval(function () {
      if (ary.length === 0) {
        return clearInterval(timer)
      }
      start();
    }, 200)
  }
}

let arry = []
for (let i = 0; i < 1000; i++) {
  arry.push(i)
}
let renderFiendList = timeChunk(arry, function (n) {
  console.log(n)
  // let div = document.createElement('div')
  // div.innerHTML = n;
  // document.body.appendChild(div)
}, 8)
// renderFiendList();

let timeChunk1 = function (arry, count, fn) {
  let timer;
  return function () {
    timer = setInterval(() => {
      if (arry.length === 0) {
        return clearInterval(timer)
      } else {
        for (let i = 0; i < Math.min(count || 1, arry.length); i++) {
          fn(arry.shift())
        }
      }
    }, 200);
  }
}
let timchu = timeChunk1([1, 3, 4, 5, 56, 6, 7, 7], 2, item => {
  console.log(item)
})
timchu();

// 惰性加载函数
// 第一次会判断，然后整个函数会被重写，再次调用之后就不走判断了
let addEvent = function () {
  if (window.addEventListener) {
    // 将函数重写
    addEvent = function (element, type, handler) {
      element.addEventListener(type, handler, false)
    }
  } else if (window.attachEvent) {
    addEvent = function (element, type, handler) {
      element.attachEvent(type, handler, false)
    }
  }
}