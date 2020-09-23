// 又叫观察者模式 ：定义对象间的一种一对多的依赖关系，
// 当一个对象的状态发生改变时，所有依赖它的对象都将得到通知

document.addEventListener("click", function (e) {
  console.log(e)
}, false)
document.addEventListener("click", function (e) {
  console.log(e)
}, false)

// 1 指定发布者，增加翻出列表
// 2 遍历缓存列表，触发通知

const EventClient = {
  ClientList: {},
  listen(key: string, fn: () => any) {
    if (!this.ClientList[key]) {
      this.ClientList[key] = []
    }
    this.ClientList[key].push(fn)
  },
  trigger(key, ...args) {
    const fns = this.ClientList[key];
    if (!fns || fns.length === 0) {
      return false
    }
    for (let i = 0, fn; fn = fns[i];) {
      fn.apply(this, args)
    }
  },
  remove(key, fn) {

  }
}
const installEvent = function (obj) {
  for (const key in EventClient) {
    obj[key] = EventClient[key]
  }
}
let obj = {}
installEvent(obj)