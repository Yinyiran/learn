// 闭包内存泄露，手动将变量设置为null

// 变量的有效范围（变量作用域）函数

const func = function () {
  let a = 1;  //被外界调用 不会被销毁 形成闭包
  return function () {
    a++;
    console.log(a)
  }
}
let f = func()
f()
f()


// 缓存参数的乘积
let cache0 = {} // 暴漏了多余的全局参数
let mult0 = function () {
  let args = Array.prototype.join.call(arguments, ",")
  if (cache0[args]) {
    return cache0[args]
  }
  let a = 1;
  for (let i = 0; i < arguments.length; i++) {
    a = a * arguments[1]
  }
  return cache0[args] = a;
}
// 闭包缓存私有变量
let mult = (function () {
  let cache = {};
  // 只有本函数用的话，用闭包编程私有
  let calculate = function () {
    var a = 1;
    for (let i = 0; i < arguments.length; i++) {
      a = a * arguments[i]
    }
    return a;
  }
  return function () {
    let args = Array.prototype.join.call(arguments, ",")
    if (cache[args]) {
      return cache[args]
    }
    return cache[args] = calculate.apply(null, arguments);
  }
})()

console.log(mult(1, 2, 3, 4))
console.log(mult(1, 2, 3, 4))

// 变量的生存周期 (函数调用结束局部变量会被销毁)

// 如果不利用闭包，函数执行完成img被销毁，此时还有发起图片的http请求，有30%的图片丢失
let report = (function (src) {
  let imgs = [];
  return function (src) {
    let img = new Image();
    imgs.push(img) // 利用闭包缓存imgs
    img.src = src;
  }
})()
// report("http://xxx.com/getUserInfo");

// 面向对象的系统

let extend = {
  value: 0,
  call() {
    this.value++;
    console.log(this.value);
  }
}
// or
let extend2 = function () {
  this.value = 0;
}
extend2.prototype.call = function () {
  this.value++;
  console.log(this.value)
}
let ext2 = new extend2();
ext2.call()
ext2.call()


// 闭包实现命令模式

const TV = {
  open() {
    console.log("open TV")
  },
  close() {
    console.log("close TV")
  }
}
let createCommand = function (receiver) {
  this.receiver = receiver; // 闭包
  return {
    execute: function () {
      this.receiver.open();
    },
    undo: function () {
      this.receiver.close()
    }
  }
}
let setCommand = function (command) {
  document.getElementById("execute").onclick = function () {
    command.execute()
  }
  document.getElementById("undo").onclick = function () {
    command.undo();
  }
}
setCommand(new OpenTVCommand(TV))
