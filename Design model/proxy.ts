// 当客户不方便直接访问一个对象，提供一个替身对象来控制对这个对象的访问。
// 客户实际访问的是替身对象，替身对象对请求做一些处理后再交给原对象。

// 虚拟代理 （把开销很大的对象，延迟到真正需要的时候才去创建
// 案例：图片预加载

class MyImage {
  imgNode: any
  constructor() {
    this.imgNode = document.createElement("img")
    document.body.appendChild(this.imgNode)
  }
  setSrc(src: string) {
    this.imgNode.src = src;
  }
}
class ProxyImage {
  proxyImg: any
  myImg: any
  constructor() {
    this.proxyImg = new Image;
    this.myImg = new MyImage();
    this.proxyImg.onload = () => {
      this.myImg.setSrc(this.proxyImg.src)
    }
  }
  setSrc(src) {
    this.myImg.setSrc(`loading.gif`)
    this.proxyImg.src = src;
  }
}
let proxyImg = new ProxyImage()
proxyImg.setSrc(`http://img.jpg`)

// 代理和本体接口的一致性（上边的例子setSrc），用户可以放心地请求代理，他只关心是否能得到想要的结果。
// 在任何使用本体的地方都可以替换成使用代理。

// 案例：合并2s内的请求
const syncFile = function (id: string) {
  console.log(`begin sync file, id is ${id}`)
}
let proxySyncFile = (function () {
  let cache = [];
  let timer: any;
  return function (id: number) {
    cache.push(id);
    if (timer) return
    timer = setTimeout(() => {
      syncFile(cache.join(","))
      clearTimeout(timer)
      timer = null;
      cache.length = 0;
    }, 2000);
  }
})()

for (var i = 0; i < 200; i++) {
  proxySyncFile(i);
};

// 虚拟代理，惰性加载
// 按F2加载js文件
const miniConsole = (function () {
  const cache = [];
  const handler = function (ev) {
    if (ev.keyCode === 113) {
      const script = document.createElement("script")
      script.onload = function () {
        for (let i = 0, fn: () => void; fn = cache[i++];) {
          fn();
        }
      }
      script.src = "miniConsole.js"
      document.getElementsByTagName("head")[0].appendChild(script)
      document.body.removeEventListener("keydown", handler); // F2只执行一次加载
    }
  }
  document.body.addEventListener("keydown", handler, false) // 注册事件
  return {
    log(...args: any[]) {
      cache.push(() => {
        return miniConsole.log.apply(miniConsole, args)
      })
    }
  }
})();

miniConsole.log(11);

// 缓存代理 ：为一些开销大的运算结果提供暂时的存储，下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。
// 例子：计算乘积
const mult = function (...args: number[]) {
  console.log("begin mult")
  let a = 1;
  for (let i = 0, len = args.length; i < len; i++) {
    a = a * args[i]
  }
  return a;
}

const proxyMult = (function () {
  let cache = {};
  return function (...args: number[]) {
    const argStr = args.join(",");
    if (argStr in cache) return cache[argStr]; // 返回缓存
    return cache[argStr] = mult(...args);
  }
})()
proxyMult(1, 2, 3, 4, 5)
proxyMult(1, 2, 3, 4, 5)


// 用高阶函数动态创建代理
// 缓存代理的工厂
/**************** 计算加和 *****************/
const plus = function () {
  let a = 0;
  for (let i = 0, len = arguments.length; i < len; i++) {
    a += arguments[i];
  }
  return a;
}
/************创建缓存代理的工厂**************/
const createProxyFactory = function (fn: () => any) {
  let cache = [];
  return function (...args: number[]) {
    const argStr = args.join(",")
    if (argStr in cache) return cache[argStr]
    return cache[argStr] = fn.apply(this, arguments)
  }
}
const proxyMult1 = createProxyFactory(mult);
const proxyPlus = createProxyFactory(plus);
proxyMult1(1, 2, 3, 4, 5);
proxyPlus(1, 2, 3, 4, 5);

// 其他代理模式：
// 防火墙代理：控制网络资源的访问，保护主题不让“坏人”接近。
// 远程代理：为一个对象在不同的地址空间提供局部代表，在Java中，远程代理可以是另一个虚拟机中的对象。
// 保护代理：用于对象应该有不同访问权限的情况。
// 智能引用代理：取代了简单的指针，它在访问对象时执行一些附加操作，比如计算一个对象被引用的次数。
// 写时复制代理：通常用于复制一个庞大对象的情况。写时复制代理延迟了复制的过程，当对象被真正修改时，才对它进行复制操作。写时复制代理是虚拟代理的一种变体，DLL（操作系统中的动态链接库）是其典型运用场景。