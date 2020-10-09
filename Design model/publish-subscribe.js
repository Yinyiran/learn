// 又叫观察者模式 ：定义对象间的一种一对多的依赖关系，
// 当一个对象的状态发生改变时，所有依赖它的对象都将得到通知

// document.addEventListener("click", function (e) {
//   console.log(e)
// }, false)
// document.addEventListener("click", function (e) {
//   console.log(e)
// }, false)

// 1 指定发布者，增加翻出列表
// 2 遍历缓存列表，触发通知

const EventClient = {
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);    // 订阅的消息添加进缓存列表
  },
  trigger(key, ...args) {
    const fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false
    }
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, args)
    }
  },
  remove(key, fn) {
    let fns = this.clientList[key]
    if (!fns) return false;
    if (!fn) {
      fns && (fns.length = 0); //如果之传入了key，那么就把key下面的都删掉
    } else {
      for (let l = fns.length; l >= 0; l--) {
        if (fns[l] === fn) fns.splice(l, 1) // 删除订阅的回调函数
      }
    }
  }
}
// 可以为任何一个对象 安装发布订阅功能
const installEvent = function (obj) {
  for (const key in EventClient) {
    obj[key] = EventClient[key]
  }
}
// let salesOffices = {};
// installEvent(salesOffices);
EventClient.listen("square100", (price) => {
  console.log(`价格-${price}1`)
})
EventClient.listen("square88", (price) => {
  console.log(`价格-${price}2`)
})
const s88 = (price) => {
  console.log(`价格-${price}3`)
}
EventClient.listen("square88", s88)
EventClient.trigger("square100", 33);

EventClient.remove("square88", s88)
EventClient.trigger("square88", 22)

// 案例：登陆成功之后给各个模块发消息()
$ajax("http://yunyiran.com?login", function (data) {
  login.trigger("loginSucc", data)
})
const header = (function () {
  login.listen("loginSucc", function (data) {
    header.serAvatar(data.avatar)
  })
  return {
    setAvatar(avatar) {
      console.log(`set header avatar:${avatar}`)
    }
  }
})();
const nav = (function () {
  login.listen("loginSucc", function (data) {
    nav.setName(data.UserName)
  })
  return {
    setName(name) {
      console.log(`set nav userName :${name}`)
    }
  }
})()

// 先发布后订阅, (用户未登录，订阅的信息，有些模块惰性加载)
EventClient.trigger("click", 1)
EventClient.listen("click", function (a) {
  console.log(a)
})

// 全局的订阅发布
//（一个运行时存在一个即可，多了浪费，重复查找）

const EventSpace = (function () {
  let global = this;
  let Event;
  let _default = "default"
  Event = function(){
    let _listen,_trigger,_remove,_slice = Array.prototype.slice()
  }
})()
