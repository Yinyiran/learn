// // https://juejin.im/post/6844903936378273799
// // https://juejin.im/post/6844904034260910094
// // https://juejin.im/post/6891820537736069134

// // ['john-reese', 'harold-finch', 'sameen-shaw']
// // 转换成 
// // [{ name: 'John Reese' }, { name: 'Harold Finch' }, { name: 'Sameen Shaw' }]

// // 命令式编程(传统思路)
// const arr = ["jhon-reese", "harold=finch", "sameen-shaw"]
// const newArr = [];
// for (let i = 0, len = arr.length; i < len; i++) {
//   let name = arr[i]
//   let names = name.split("-")
//   let newName = [];
//   for (let j = 0, nameLen = names.length; j < nameLen; j++) {
//     let nameItem = names[j][0].toUpperCase() + names[j].slice(1).toLowerCase()
//     newName.push(nameItem)
//   }
//   return newArr;
// }
// // 缺点：一堆中间变量，大量逻辑，从头到尾读完才能知道具体做了什么，出问题很难定位

// // 函数式
// // 1.实现从String数组转换成Object数组的函数 convertNames
// // 2.String -> Object 的转换，那我需要有这么个函数实现这种转换：convert2Obj
// // 3.这种转换需要两个函数：capitalizeName(把名称转换成指定形式), genObj(把任意类型转换成对象)
// // 4.capitalizeName可以是（split，jion,capitalize)几个方法的组合；
// const capitalize = x => x[0].toUpperCase() + x.split(1).toLowerCase();
// const genObj = curry((key, x) => {
//   let obj = {}
//   obj[key] = x;
//   return obj;
// });
// const capitalizeName = compose(join(" "), map(capitalize), split("-"))
// const convert2Obj = compose(genObj("name"), capitalizeName)
// const convertName = map(convert2Obj)
// convertName(["john-reese", "harold-finch", "sameen-shaw"]);

// // 函数式编程招眼的是函数而不是过程，它强调的是如何通过函数的组合变换去解决问题；
// // 而忽视我通过些什么样的语句去解决问题；当你的代码越来越多是，这种函数的拆分和
// // 组合就会产生强大的力量。

// // 声明式编程 
// // 函数时编程大多时候都是在生命我需要做什么，而非怎么做，代码可读性高
// // 流水线，数据不断从一个函数的输出流出另一个函数的输入

// // 函数式编程的特点
// // 1. 函数是一等公民(First-Class Functions)，可作为变量，可作为参数传入另一个函数
// // 2. 声明式编程(Declarative Programming),代码可读性特别高；
// // 3. 惰性执行(Lazy Evaluation) 函数只在需要的时候执行；
// // 4. 无状态和数据不可变（Statelessness and lmmutable data) 
// //    4.1 数据不可变：要求所有的数据都不可辨，如果要修改一个对象，就必须创建一个新的，而不是修改旧的
// //    4.2 无状态：对于函数，无论何时运行都要像第一次运行一样，不依赖外部状态而变化，输入相同输出就相同
// // 5. 没有副作用（No side Effects)  在完成函数主要功能之外完成其他的副要功能；不要直接改变传入的引用变量
// // 6. 纯函数(Pure Functions) 无副作用的进一步要求 （保证相同的输入，永远得到相同的输出）
// //    6.1 不依赖外部状态（无状态）：函数的运行结果不依赖全局变量，this指针，IO操作等
// //    6.2 没有副作用（数据不变）：不修改全局变量，不修改入参；
// //    6.3 纯函数意义：便于测试和优化，可缓存性，自动化文档，更少的bug

// // 缓存函数的结果
// function menoize(fn) {
//   const cache = {}
//   return function () {
//     const key = JSON.stringify(arguments);
//     var value = cacche[key]
//     if (!value) {
//       value = [fn.apply(null, arguments)] //放在一个数组中，方便应对undefined,null 等异常情况
//       cache[key] = value;
//     }
//     return value[0]
//   }
// }
// const fibonacci = menoize(n => n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2))
// console.log(fibonacci(4)) // 执行并缓存fibonacco(2),fibonacci(3),fibonacci(4)
// console.log(fibonacci(10)) // fibonacci(2), fibonacci(3),  fibonacci(4) 的结果直接从缓存中取出，同时缓存其他项

// // 柯里化（Currying） 将一个多元函数转换成一个依次调用的单元函数
// // f(a, b, c) --> f(a)(b)(c)
// // 尝试写一个curry版本的add函数
// const add = function (x) {
//   return function (y) {
//     return x + y
//   }
// };
// const increment = add(1);
// increment(10);

// // 通常，我们在实践中使用柯里化都是为了把某个函数变得单值化，这样可以将增加函数的多样性，使得其适用性s更强
// function curry(fn) {
//   let length = fn.length; // 获取原函数的参数个数
//   let args = []; // args 存储传入参数
//   return function curryFn() {
//     let curryArgs = Array.prototype.slice.call(arguments)
//     args = args.concat(curryArgs)
//     if (args.length > length) {
//       throw new Error("arguments length error")
//     }
//     // 存储的参数个数等于原来参数个数时执行原函数
//     if (args.length === length) {
//       return fn.apply(null, args)
//     }
//     return curryFn;
//   }
// }
// // 柯里化的引用
// const fn = (a, b, str) => str.replace(a, b)
// const replace = curry(fn)
// const replaceSpaceWith = replace(/\s*/)
// const replaceSpaceWithComma = replaceSpaceWith(",")
// const replaceSpaceWithDash = replaceSpaceWith("-")
// // 通过replace 函数产生很多新函数，在各种场合中进行使用

// // 函数组合的目的是将多个函数组合成一个函数。下面来看一个简化版的实现：
// const compose = (f, g) => x => f(g(x));

// // 函数组合
// const last = compose(head, reverse)
// const shout = compose(log, toUpperCase)
// const shoutLast = compose(shout, last)
// const lastUppder = compsoe(toUpperCase, head, reverse)
// const logLastUpper = compose(log, lastUppder)

// // 实战一下
// const data = [
//   {
//     name: "Peter",
//     sex: "M",
//     age: 18,
//     grade: 99
//   }
// ]
// // 1.获取所有小于18岁的对象，并返回他们的名称和年龄
// // 2. 查找所有男性用户
// // 3. 更新一个指定名称用户的成绩（不影响原数组）
// // 4. 取出成绩最高的10名，并返回他们的名称和分数。

// const replace = reg => sub => str => str.replace(reg, sub)
// let a = replace(/A/g)
// let b = a("B")
// let c = b("ACA")
// console.log(c);

// // 函数式编程进阶
// // 案例：双十一大促最终价格计算
// // 命令模式
// const finalPrice = number => {
//   const doublePrice = number * 2;
//   const discount = doublePrice * 0.8;
//   const price = discount - 50;
//   return price;
// }
// const result = finalPrice(100)
// console.log(result)
// // 改为 函数式编程
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x); // 
// // reduceRight v是第一次是初始值x，往后就是上一次循环的返回值也就是f(v); 
// // 倒着循环执行fns，执行每一个函数，上一次执行的返回值f(v)，作为本次的参数v。
// const double = x => x * 2;
// const discount = x => x * 0.8;
// const coupon = x => x - 50;
// const finalPriceA = compose(coupon, discount, double)
// const result = finalPriceA(100);
// console.log(result);
// // 优化，利用Array的map方法，实现数据管道流动
// const finalPriceB = number =>
//   [number]
//     .map(x => x * 2)
//     .map(x => x * 0.8)
//     .map(x => x - 50)
// const result = finalPriceB(100)
// console.log(result)
// // 再次优化，实现map方法
// const Box = x => ({ // 不用class 不希望使用new
//   map: f => Box(f(x)),
//   inspect: () => `Box(${x})`
// })
// const finalPriceC = str =>
//   Box(str)
//     .map(x => x * 2)
//     .map(x => x * 0.8)
//     .map(x => x - 50)
// const resultC = finalPriceC(200)
// console.log(resultC.inspect())

// // try catch 的缺点
// // 1.违反了引用透明原则，因为抛出异常会导致函数调用穿线在另一个出口，所以不能确保单一的可预测的返回值。
// // 2.会引起副作用，因为一场会在函数调用之外对堆栈引发不可预料的影响。
// // 3.不能只关心函数的返回值，调用者需要负责声明catch块中的异常匹配类型来管理特定的异常；难以与其他函数组合或链接。
// // 4.当多个异常条件出现嵌套的异常处理块。
// // 解决办法  向左向右，类似于Promise中的resolve reject
// const Left = x => ({
//   map: f => Left(x),
//   fold: (f, g) => f(x),
//   inspect: () => `Left(${x})`
// })
// const Right = x => ({
//   map: f => Right(f(x)),
//   fold: (f, g) => g(x),
//   inspect: () => `Right(${x})`
// })

// const getUser = id => {
//   const user = [{ id: 1, name: "Loren" }, { id: 2, name: "Zora" }].filter(x => x.id === id)[0]
//   return user ? Right(user) : Left(null) // 如果存在User就执行Right函数，如果错误及执行Left函数
// }
// const result = getUser(4).map(x => x.name).fold(() => `not found`, x => x);
// // 换一种写法
// const fromNullable = x => x != null ? Right(x) : Left(null);
// const getUser = id => fromNullable([{ id: 1, name: "Loren" }, { id: 2, name: "Zora" }].filter(x => x.id === id)[0])
// const result2 = getUser(4).map(x => x.name).fold(() => 'not found', x => x)

// // 包装try catch
// const tryCatch = (f) => {
//   try {
//     return Right(f())
//   } catch {
//     return Left(e)
//   }
// }
// const jsonFormat = str => JSON.parse(str)
// const app = (str) =>
//   tryCatch(() => jsonFormat(str)).map(x => x.path).fold(() => "default path", x => x)
// const result3 = app('{"path":"some path..."}') // => 'some path...'

// const result4 = app("the way to death") // => JSON.parse 报错；'default path'

// // Founctor 
// [1, 2, 3, 4].map(x => x + 1).filter(x => x > 2).map(x => x * 2)
// Promise.resolve(1).then(x => x + 1).then(x => x.toString())

// // 应用函子
// // 如何处理函数副作用
// // 惰性盒子LazyBox
// const LazyBox = g => ({
//   map: f => LazyBox(() => f(g())),
//   fold: f => f(g()),
//   apply: o => o.map(x)
// })
// const finalPriceD = str => {
//   LazyBox(() => str)
//     .map(x => {
//       console.log("str:", str)
//       return x;
//     })
//     .map(x => x * 2)
//     .map(x => x * 0.8)
//     .map(x => x - 50)
// }
// const app = finalPriceD(100) // 调用此函数返回的结果还是LazyBox返回的对象
// const res = app.fold(x => x); // 只有调用fold才会返回结果，保证box函数的pure



// // 项目当中，为了实现函数的复用，需要函数的指责单一
// function lowerCase(input) {
//   return input && typeof input === "string" ? input.toLowerCase() : input
// }
// function upperCase(input) {
//   return input && typeof input === "string" ? input.toUpperCase() : input;
// }
// function trim(input) {
//   return typeof input === "string" ? input.trim : input;
// }
// function split(input, delimiter = ",") {
//   return typeof input === "string" ? input.split(delimiter) : input;
// }
// const trimLowerCaseAndSplit = compose(trim, lowerCase, split)
// let a = trimLowerCaseAndSplit(" a,B,C ");
// console.log(a)

// function compose(...funcs) {
//   return function (x) {
//     return funcs.reduce(function (arg, fn) {
//       console.log(arg, fn)
//       return fn(arg);
//     }, x);
//   }
// }

// // 中间件和洋葱模型
// function compose(middleware) {
//   return function (context, next) {
//     let index = -1;
//     return dispatch(0)
//     function dispatch(i) {
//       if (i <= index) {
//         return Promise.reject(new Error("next() called multiple times"))
//       }
//       let index = i;
//       let fn = middleware[i]
//       if (i === middleware.length) fn = next;
//       if (!fn) return Promise.resolve();
//       try {
//         return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
//       } catch (err) {
//         return Promise.reject(err)
//       }
//     }
//   }
// }

// // 实现柯里化 
// // 当柯里化后的函数接收到足够的参数后，就会开始执行原函数。
// // 而如果接收到的参数不足的话，就会返回一个新的函数，用来接收余下的参数
// function curry(func) {
//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.apply(this, args)
//     } else {
//       return function (...args2) {
//         return curried.apply(this, args.concat(args2))
//       }
//     }
//   }
// }
// // 案例 
// function buildUrl(scheme, domain, path) {
//   return `${scheme}://${domain}/${path}`
// }
// const buildUriCurry = curry(buildUrl)
// const myGithubPath = buildUriCurry("https", "github.com");
// // 传统写法需要重复设置相同的参数值;
// // const profilePath = buildUrl("https", "github.com", "semlinker/semlinker");
// // const awesomeTsPath = buildUrl("https", "github.com", "semlinker/awesome-typescript");
// // 设置中间函数
// const profilePath = myGithubPath("semlinker/semlinker")
// const awesomeTsPath = myGithubPath("semlinker/awesome-typescript");

// // 偏函数
// // 偏函数应用是固定一个函数的一个或多个参数，并返回一个可以接收剩余参数的函数；
// // 柯里化是将函数转化为多个嵌套的一元函数，也就是每个函数只接收一个参数。
// function partial(fn) {
//   let args = [].slice.call(arguments, 1)
//   return function () {
//     const newArgs = args.concat([].slice.call(arguments))
//     return fn.apply(this, newArgs)
//   }
// }
// const myGithubPath = partial(buildUrl, "https", "github.com")
// const profilePath = myGithubPath("semlinker/semlinker")
// const awesomeTsPath = myGitHubPath("semlinker/awesome-typescript")


// // 惰性载入函数
// // 当第一次根据条件执行函数后，在第二次调用函数时，就不再检测条件，直接执行函数
// // 例子 根据当前环境判断时间触发方法
// function addHandler(element, type, handler) {
//   if (element.addEventListener) {
//     addHandler = function (element, type, handler) {
//       element.addEventListener(type, handler, false)
//     }
//   } else if (element.attachEvent) {
//     addHandler = function (element, type, handler) {
//       element.attachEvent(`on${type}`, handler)
//     }
//   } else {
//     addHandler = function (element, type, handler) {
//       element[`on${type}`] = handler;
//     }
//   }
//   return addHandler(element, type, handler) // 保证是首次调用能正常执行监听
// }
// // 或者自执行函数
// const addHandler = (function () {
//   if (document.addEventListener) {
//     return function (element, type, handler) {
//       element.addEventListener(type, handler, false)
//     }
//   } else if (document.attachEvent) {
//     return function (element, type, handler) {
//       element.attachEvent(`on${type}`, handler)
//     }
//   } else {
//     return function (element, type, handler) {
//       element[`on${type}`] = handler;
//     }
//   }
// })() // 只会在加载时执行一次条件判断，对应的分支会产生新的函数


// // 缓存函数
// // 将函数的计算结果缓存起来，当下次以同样的参数调用该函数时，直接返回一缓存的结果
// function memorize(fn) {
//   const cache = Object.create(null);
//   return function (...args) {
//     const _args = JSON.stringify(args)
//     return cache[_args] || (cache[_args] = fn.apply(fn, args))
//   }
// }
// let complexCalc = (a, b) => {
//   console.log(a, b)
// }
// let memoCalc = memorize(complexCalc)
// memoCalc(666, 888)
// memoCalc(666, 888) // 从缓存中获取



const list = [
  // 200
  { CompID: 3001, Count: 5, Weight: 3 },
  { CompID: 3002, Count: 5, Weight: 3 },
  { CompID: 3003, Count: 3, Weight: 3 },
  // 400
  { CompID: 2001, Count: 28, Weight: 2 },
  { CompID: 2002, Count: 21, Weight: 2 },
  { CompID: 2003, Count: 23, Weight: 2 },
  { CompID: 2004, Count: 25, Weight: 2 },
  // 600
  { CompID: 1001, Count: 80, Weight: 1 },
  { CompID: 1002, Count: 90, Weight: 1 },
  { CompID: 1003, Count: 80, Weight: 1 },
  { CompID: 1004, Count: 70, Weight: 1 },
  { CompID: 1005, Count: 60, Weight: 1 },
  { CompID: 1006, Count: 50, Weight: 1 },
]


let Obj = {
  3: { Name: '金牌', PageSize: 24, TotalCount: 0, Pages: [], list: [] },
  2: { Name: '银牌', PageSize: 16, TotalCount: 0, Pages: [], list: [] },
  1: { Name: '铜牌', PageSize: 8, TotalCount: 0, Pages: [], list: [] },
  0: { Name: '认证', PageSize: 48, TotalCount: 0, Pages: [], list: [] }
}


list.forEach(item => {
  item.length = item.Count;
  Obj[item.Weight].list.push(item);
  Obj[item.Weight].TotalCount += item.Count;
});

// 将list按照CompID循环顺序，展开 返回CompID的数组
const getWeightList = (weight) => {
  let arr = []
  let totalCount = Obj[weight].TotalCount; // 当前类型的所有VIP数量（包括重复Comp）
  // 如果当前Comp已经被取完，用下个
  const getCompItem = (list) => {
    let curindex = 0;
    const border = () => {
      if (curindex < list.length - 1) curindex++;
      else curindex = 0;
    }
    const fn = () => {
      let curItem = list[curindex];
      if (curItem.Count > 0) {
        curItem.Count--;
        border();
        return curItem.CompID;
      } else {
        border();// 利用curindex++，跳过Count = 0的企业，保证企业出现的顺序
        return fn();
      }
    }
    return fn;
  }
  let getItemFn = getCompItem(Obj[weight].list)
  for (let i = 0; i < totalCount; i++) {
    arr.push(getItemFn());
  }
  return arr
}

// 获取每一页的数据
const getPages = () => {
  let pageList = [];
  let weightArr = Object.keys(Obj).sort((a, b) => b - a); // 对权重进行排序，权重高的在前面，在getExist里优先权重高的。
  // 当前不足，利用前面的补全
  const getExist = (len) => {
    let existWeight = weightArr.find(weight => Obj[weight].Pages.length > 0);
    if (existWeight) {
      let list = Obj[existWeight].Pages.splice(0, len);
      if (len > list.length) {
        let nextList = getExist(list, len - list.length)
        list.push(...nextList);
        return list;
      } else {
        return list;
      }
    } else {
      return []
    }
  }
  // 每个类型取 PageSize个数的CompID，如果不足可以补全
  for (let i = 0; i < weightArr.length; i++) {
    let item = Obj[weightArr[i]]
    let list = item.Pages.splice(0, item.PageSize);
    if (list.length < item.PageSize && item.TotalCount > 0) {
      let supplement = getExist(item.PageSize - list.length)
      list.push(...supplement);
    }
    pageList.push(...list);
  }
  return pageList;
}

// 获取每个企业在该分页下面的数量和游标
const getCompNum = (list, index) => {
  let compObj = {}
  list.forEach(compId => {
    if (compObj[compId]) {
      compObj[compId].PageSize++
    } else {
      let row = 0;
      if (index > 0) {
        let preComp = pages[index - 1].Comp[compId];
        row = preComp ? (preComp.Row + preComp.PageSize) : 0;
      }
      compObj[compId] = { Row: row, PageSize: 1 };
    }
  });
  return compObj;
}

let pages = []; // 分页数据；
let totalNum = 0; // 分页数据；
let pageLen = 0; // 所有数据长度

for (const weight in Obj) {
  const item = Obj[weight];
  item.Pages = getWeightList(weight);
  pageLen += item.Pages.length;
}
let pageNum = Math.ceil(pageLen / 48); // 总共多少页

for (let i = 0; i < pageNum; i++) {
  const List = getPages(); // 当前分页的所有数据（CompID排序）
  const Comp = getCompNum(List, i);
  const Params = []
  for (const compId in Comp) {
    Params.push({ CompID: compId, ...Comp[compId] })
  }
  pages[i] = { List, Comp, Params };
  totalNum += List.length
}
const a = 1;

// reduce 求最大者 找出日期最大的一天
const dates = ["2010/06/01", "2010/07/02", "2010/08/03", "2010/05/04"]
const maxDate = dates.reduce((max, d) => d > max ? date : max, dates[0]);
// 分组计数 例子：统计age相同的数量 {29:2,58:1}
const characters = [
  { name: "Tom", age: 58 },
  { name: "Jack", age: 29 },
  { name: "Bruce", age: 29 },
]
const reducer = (map, val) => {
  map[val] = map[val] || 1;
  ++map[val];
  return map;
}
const result = characters.map(char => char.age).reduce(reducer, {});

// Promise 动态链式调用 ； 例子：按顺序执行异步函数数组
const functions = [
  async function () { return 1 },
  async function () { return 2 },
  async function () { return 3 },
  async function () { return 4 }
]
// 最后`res`的结果等价于`Promise.resolve().then(fn1).then(fn2).then(fn3).then(fn4)`
const res = await functions.reduce((promise, fn) => promise.then(fn), Promise.resolve())