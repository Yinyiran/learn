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