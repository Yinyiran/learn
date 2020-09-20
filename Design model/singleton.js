// 定义：保证一个类只有一个实例，并提供一个全局访问点； 例如：浏览器的 window

// 传统方式
let CreateDiv = function (html) {
  this.html = html;
  this.init();
}
CreateDiv.prototype.init = function () {
  console.log(`html:${this.html}`)
  // let div = document.createElement('div')
  // div.innerHTML = this.html;
  // document.body.appendChild(div)
}

let proxySingletonCreateDiv = (function () {
  let instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html)
    }
    return instance;
  }
})();
// let div1 = new proxySingletonCreateDiv("sven1")
// let div2 = new proxySingletonCreateDiv("sven2")
// console.log(div1, div2);

// JS的单例
let MyApp = {}
MyApp.namespace = function (name) {
  let parts = name.split(".")
  let current = MyApp; // 变量
  for (const i in parts) {
    if (!current[parts[i]]) {
      current[parts[i]] = {}
    }
    current = current[parts[i]] // 此处改变了current
  }
}
// MyApp.namespace("event")；
MyApp.namespace("dom.style.fontSize")
console.log(MyApp);

// 闭包隐藏私有变量
let user = function () {
  let _name = "Mask"; //外部访问不到
  let _age = 39;
  return {
    getUserInfo() {
      return `${_name}-${_age}`
    }
  }
}

// 通用的惰性单例模式

// 管理单例的职责函数
let getSingle = function (fn) {
  let result; // 闭包缓存值
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}
// 创建实例对象的职责函数
let createLoginLayer = getSingle(function () {
  let div = { single: 'document.createElement("div")' }
  // div.innerHTML = "login layer"
  // document.appendChild(div)
  return div; //返回缓存值
})
let loginlayer = createLoginLayer();
let loginlayer2 = createLoginLayer();
console.log(loginlayer === loginlayer2); // 两个是同一个函数

// 只给div绑定一次事件
let bindEvent = getSingle(function () {
  // document.getElementById("div1").onclick = function (e) {
  //   console.log(e)
  // }
  
  return true; // getSingle result = true
})
bindEvent()
bindEvent()