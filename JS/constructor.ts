// 所有的JS对象都是从根对象复制过来的
// let a = {}  等同于 let a = Object.create()

// ### JavaScript 原型 / 继承

// 1. 原型基本规则

//   - 所有数据都是对象
//   - 找到一个对象作为原型并克隆来创建对象
//   - 对象会记住他的原型链
//   - 如果对象无法响应某个请求，它会把这个请求委托给自己的原型

// 2. JS 根对象是 Object.prototype 是一个空对象


const person = function (name: any) {
  this.name = name;
  this.say = () => {
    return `I'm ${this.name}`
  }
}

try {
  // 一些不好的事情发生了，抛出错误
  throw {
    name: "MyErrorType", // 自定义错误类型
    message: "oops",
    extra: "This was rather embarrassing",
    remedy: () => {
      console.log("handler error")
    } // 应该由谁处理
  };
} catch (e) {
  // 通知用户
  alert(e.message); // "oops"

  // 优雅地处理错误
  e.remedy(); // 调用genericErrorHandler()
}

let Plan = function () {
  this.blood = 100;
  this.attacklevel = 1;
  this.defenselevel = 1;
}
let plane = new Plan();
plane.blood = 300;
plane.attacklevel = 20;
plane.defenselevel = 2;

let clonePlane = Object.create(plane)
console.log(clonePlane instanceof Plan)

Object.create = Object.create || function (obj) {
  let F = function () { }
  F.prototype = obj;
  return new F();
}
