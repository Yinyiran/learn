// let
// 1. 代码块内可以访问
// 2. 无变量提升
// 3. 暂时性死区（在声明变量前无法使用变量会报错）
{
  let a = 10; // 括号外面无法访问 
  var b = 11 // 外部可以访问
}

for (let i = 0; i < array.length; i++) {
  // const element = array[i];
  // 外部无法访问i; 以前i是个全局变量
}
var c = [];
for (let i = 0; i < 10; i++) {
  a[i] = () => {
    console.log(i)
  }
}
console.log(a[6]()) // 6；

// const  
// 实际上是执行那个内存地址所保存的数据不能改变，对象的属性是可以改变的
// 如何让对象彻底不能够改变
const constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key])
    }
  })
}

let b = "b-1" // let 的变量不再挂到window上了
window.b = "b-2"

// 获取当前环境顶级变量
const getGlobal = function () {
  if (typeof self != "undefined") return self;
  if (typeof window != "undefined") return window;
  if (typeof global != "undefined") return global;
  throw new Error("unable to locate global object")
}

// 解构 
// 数组按照对应顺序取值
let [a, b, c] = ["foo", "bar", "baz"] // a:foo; b:bar; c:baz
let [, b, c = 1] = ["foo", ["bar"]] // b:"afwe" ; c=1
let [, ...a] = ["amze", "brave", "control"] // a:["brave","control"]

function f() {
  console.log("aaa")
}
let [x = f()] = [1] // f() 不会执行 因为x可以取到值

let [x = 1, y = x] = []; // x =1 ; y = 1
let [x = y, y = 1] = []; // 报错 y没有定义
// 对象结构 没有顺序  套对象结构 
let obj = {
  p: ["Hello", { y: "World" }]
}
let { p: [x, { y }] } = obj // p是模式不是变量
let { p, p: [x, { y }] } = obj // 此处p有值

const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
}
let { loc, loc: { start }, loc: { start: { line } } } = node;
// 此处跟别对loc，start，line三个属性解构赋值
// 最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。

// 嵌套赋值
let obj = {}
let arr = []
  ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true })
  // obj : {prop:123} arr:[true]

  // 指定默认值
  let 