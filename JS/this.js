// this 总是指向一个对象

// 1.最为对象的方法调用
let obj = {
  a: 1,
  getA: function () {
    console.log(this === obj) // true
    console.log(this.a) // 1
  }
}
obj.getA();
let aFun = obj.getA; // aFun为全局变量，this改变了
aFun()

// 2.作为普通函数调用
let name = "aaa"
let getName = function () {
  console.log(this.name)
}
getName()
// 3.构造器调用
let MyClass = function () {
  this.name = "Tony"
  return { name: "Cherry" }
}
let myclass = new MyClass()
console.log(myclass.name) // this 指向的是返回的函数 而不是 构造函数

// 4.call apply 动态传入，改变函数的this
let obj1 = {
  name: "obj111",
}
let obj2 = {
  name: "obj222"
}
function consoleName() {
  console.log(this.name)
}
consoleName() // window
consoleName.apply(obj1) // obj1
consoleName.apply(obj2) // obj2

// 手写一个bind
Function.prototype.bind = function () {
  let self = this;
  let context = [].shift.call(arguments); // 获取第一个参数：this
  let args = [].slice.call(arguments); // 剩余参数转换成数组
  return function () {
    return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
  }
}
let func = function (a, b, c, d) {
  console.log(this.name,"--bind")
  console.log([a, b, c, d])
}.bind(obj1, 3, 4)
func(1, 2)
// bind