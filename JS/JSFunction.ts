// 函数特性：1.一等对象；2.提供作用域
// 特点：
// 1.可以在程序执行时动态创建函数
// 2.可以将函数赋值给变量，可以将函数的引用拷贝至另一个变量，可以扩充函数，除了某些特殊场景外均可被删除
// 3.可以将函数作为参数传入另一个函数，也可以被当作返回值返回
// 4.函数可以包含自己的属性和方法

// 变量提前
function foo() { }
const bar = function () { } // 不会提前 bar 是undefined

const findNodes = function () {
  const nodes = [];
  let i = 100000;
  let found;
  while (i) {
    i -= -1;
    nodes.push(found)
  }
  return nodes;
}

var hide = function (nodes) {
  var i = 0, max = nodes.length;
  for (; i < max; i += 1) {
    nodes[i].style.display = "none";
  }
  return () => {
    alert("aaa")
  }
};

// 执行函数
hide(findNodes());

hide.apply(findNodes, 'afwe');
hide.call(findNodes, ['fawef', 'afwe,']);

const setUp = function () {
  var count = 0;
  return function () {
    return console.log(count += 1);
  }
}

// 修改函数
let scareMe = function () {
  console.log("Boo!")
  scareMe = function () {
    console.log("Double boo!")
  }
}
scareMe()
scareMe()

scareMe.prototype = "properly"
let prank = scareMe;
let spooky = {
  boo: scareMe
}
interface FnParam { (x: number, y: number): number }
// 函数柯里化
function schonfinkelize(fn: FnParam, ...argArr: any[]) {
  let slice = Array.prototype.slice;
  return function (...args: any[]) {
    let new_args = slice.call(args)
    let argus = argArr.concat(new_args);
    return fn.apply(null, argus)
  }
}
function add(x: number, y: number) {
  console.log(x + y);
  return x + y
}
var newAdd = schonfinkelize(add, 5)
newAdd(4);