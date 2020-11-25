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

// 字符串解构赋值
let { length: len } = "hello" // 字符串对象length属性
let [h, e, l, l, o] = "hello" // 数组

// 数值和布尔值的解构赋值
let { toString: s } = 123;
s === Number.prototype.toString


// 函数参数解构赋值
function add([x, y]) {
  return x + y;
}
add([1, 2]);
[[1, 2], [3, 4]].map(([a, b]) => a + b) // [3,7]

// 默认值 参数结构不出x，y会被赋默认值，没有参数
function move({ x = 0, y = 0 } = {}) {
  console.log([x, y])
  return [x, y]
}
move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 另一种写法  此函数为参数指定默认值，而不是为x，y指定，所以不一样
function move({ x, y } = { x: 0, y: 0 }) {
  console.log([x, y])
  return [x, y]
}
move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
// undefined 会触发默认值
[1, undefined, 3].map((x = "yes") => x) // [1,"yes",3]

function ajax(url, {
  async = true,
  beforeSend = function () { },
  cache = true,
  complete = function () { } },
  crossDomain = false,
  global = true
) { }

// 方便获取map结构的 key，value
const map = new Map();
map.set("first", "hello")
map.set("second", "world")
for (const [key, value] of map) {
  console.log(`${key}-${value}`)
}

// 字符串
// 可以换行
let html = `
<ul>
  <li>first line </li>
  <li>second line </li>
</ul>
`
html.trim()// 可以消除换行