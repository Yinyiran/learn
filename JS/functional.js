// https://juejin.im/post/6844903936378273799
// https://juejin.im/post/6844904034260910094
// https://juejin.im/post/6891820537736069134

// ['john-reese', 'harold-finch', 'sameen-shaw']
// 转换成 
// [{ name: 'John Reese' }, { name: 'Harold Finch' }, { name: 'Sameen Shaw' }]

// 命令式编程(传统思路)
const arr = ["jhon-reese", "harold=finch", "sameen-shaw"]
const newArr = [];
for (let i = 0, len = arr.length; i < len; i++) {
  let name = arr[i]
  let names = name.split("-")
  let newName = [];
  for (let j = 0, nameLen = names.length; j < nameLen; j++) {
    let nameItem = names[j][0].toUpperCase() + names[j].slice(1).toLowerCase()
    newName.push(nameItem)
  }
  return newArr;
}
// 缺点：一堆中间变量，大量逻辑，从头到尾读完才能知道具体做了什么，出问题很难定位

// 函数式
// 1.实现从String数组转换成Object数组的函数 convertNames
// 2.String -> Object 的转换，那我需要有这么个函数实现这种转换：convert2Obj
// 3.这种转换需要两个函数：capitalizeName(把名称转换成指定形式), genObj(把任意类型转换成对象)
// 4.capitalizeName可以是（split，jion,capitalize)几个方法的组合；
const capitalize = x => x[0].toUpperCase() + x.split(1).toLowerCase();
const genObj = curry((key, x) => {
  let obj = {}
  obj[key] = x;
  return obj;
});
const capitalizeName = compose(join(" "), map(capitalize), split("-"))
const convert2Obj = compose(genObj("name"), capitalizeName)
const convertName = map(convert2Obj)
convertName(["john-reese", "harold-finch", "sameen-shaw"]);

// 函数式编程招眼的是函数而不是过程，它强调的是如何通过函数的组合变换去解决问题；
// 而忽视我通过些什么样的语句去解决问题；当你的代码越来越多是，这种函数的拆分和
// 组合就会产生强大的力量。

// 声明式编程 
// 函数时编程大多时候都是在生命我需要做什么，而非怎么做，代码可读性高
// 流水线，数据不断从一个函数的输出流出另一个函数的输入

// 函数式编程的特点
// 1. 函数是一等公民(First-Class Functions)，可作为变量，可作为参数传入另一个函数
// 2. 声明式编程(Declarative Programming),代码可读性特别高；
// 3. 惰性执行(Lazy Evaluation) 函数只在需要的时候执行；
// 4. 无状态和数据不可变（Statelessness and lmmutable data) 
//    4.1 数据不可变：要求所有的数据都不可辨，如果要修改一个对象，就必须创建一个新的，而不是修改旧的
//    4.2 无状态：对于函数，无论何时运行都要像第一次运行一样，不依赖外部状态而变化，输入相同输出就相同
// 5. 没有副作用（No side Effects)  在完成函数主要功能之外完成其他的副要功能；不要直接改变传入的引用变量
// 6. 纯函数(Pure Functions) 无副作用的进一步要求 （保证相同的输入，永远得到相同的输出）
//    6.1 不依赖外部状态（无状态）：函数的运行结果不依赖全局变量，this指针，IO操作等
//    6.2 没有副作用（数据不变）：不修改全局变量，不修改入参；
//    6.3 纯函数意义：便于测试和优化，可缓存性，自动化文档，更少的bug

// 缓存函数的结果
function menoize(fn) {
  const cache = {}
  return function () {
    const key = JSON.stringify(arguments);
    var value = cacche[key]
    if (!value) {
      value = [fn.apply(null, arguments)] //放在一个数组中，方便应对undefined,null 等异常情况
      cache[key] = value;
    }
    return value[0]
  }
}
const fibonacci = menoize(n => n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2))
console.log(fibonacci(4)) // 执行并缓存fibonacco(2),fibonacci(3),fibonacci(4)
console.log(fibonacci(10)) // fibonacci(2), fibonacci(3),  fibonacci(4) 的结果直接从缓存中取出，同时缓存其他项

// 柯里化（Currying） 将一个多元函数转换成一个依次调用的单元函数
// f(a, b, c) --> f(a)(b)(c)
// 尝试写一个curry版本的add函数
const add = function (x) {
  return function (y) {
    return x + y
  }
};
const increment = add(1);
increment(10);

// 通常，我们在实践中使用柯里化都是为了把某个函数变得单值化，这样可以将增加函数的多样性，使得其适用性s更强
function curry(fn) {
  let length = fn.length; // 获取原函数的参数个数
  let args = []; // args 存储传入参数
  return function curryFn() {
    let curryArgs = Array.prototype.slice.call(arguments)
    args = args.concat(curryArgs)
    if (args.length > length) {
      throw new Error("arguments length error")
    }
    // 存储的参数个数等于原来参数个数时执行原函数
    if (args.length === length) {
      return fn.apply(null, args)
    }
    return curryFn;
  }
}
// 柯里化的引用
const fn = (a, b, str) => str.replace(a, b)
const replace = curry(fn)
const replaceSpaceWith = replace(/\s*/)
const replaceSpaceWithComma = replaceSpaceWith(",")
const replaceSpaceWithDash = replaceSpaceWith("-")
// 通过replace 函数产生很多新函数，在各种场合中进行使用

// 函数组合的目的是将多个函数组合成一个函数。下面来看一个简化版的实现：
const compose = (f, g) => x => f(g(x));

// 函数组合
const last = compose(head, reverse)
const shout = compose(log, toUpperCase)
const shoutLast = compose(shout, last)
const lastUppder = compsoe(toUpperCase, head, reverse)
const logLastUpper = compose(log, lastUppder)

// 实战一下
const data = [
  {
    name: "Peter",
    sex: "M",
    age: 18,
    grade: 99
  }
]
// 1.获取所有小于18岁的对象，并返回他们的名称和年龄
// 2. 查找所有男性用户
// 3. 更新一个指定名称用户的成绩（不影响原数组）
// 4. 取出成绩最高的10名，并返回他们的名称和分数。

const replace = reg => sub => str => str.replace(reg, sub)
let a = replace(/A/g)
let b = a("B")
let c = b("ACA")
console.log(c);

// 函数式编程进阶
// 案例：双十一大促最终价格计算
// 命令模式
const finalPrice = number => {
  const doublePrice = number * 2;
  const discount = doublePrice * 0.8;
  const price = discount - 50;
  return price;
}
const result = finalPrice(100)
console.log(result)
// 改为 函数式编程
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x); // 
// reduceRight v是第一次是初始值x，往后就是上一次循环的返回值也就是f(v); 
// 倒着循环执行fns，执行每一个函数，上一次执行的返回值f(v)，作为本次的参数v。
const double = x => x * 2;
const discount = x => x * 0.8;
const coupon = x => x - 50;
const finalPriceA = compose(coupon, discount, double)
const result = finalPriceA(100);
console.log(result);
// 优化，利用Array的map方法，实现数据管道流动
const finalPriceB = number =>
  [number]
    .map(x => x * 2)
    .map(x => x * 0.8)
    .map(x => x - 50)
const result = finalPriceB(100)
console.log(result)
// 再次优化，实现map方法
const Box = x => ({ // 不用class 不希望使用new
  map: f => Box(f(x)),
  inspect: () => `Box(${x})`
})
const finalPriceC = str =>
  Box(str)
    .map(x => x * 2)
    .map(x => x * 0.8)
    .map(x => x - 50)
const resultC = finalPriceC(200)
console.log(resultC.inspect())

  // / https://juejin.im/user/4265760847567016/posts