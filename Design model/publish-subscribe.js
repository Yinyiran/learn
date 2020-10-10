// 又叫观察者模式 ：定义对象间的一种一对多的依赖关系，
// 当一个对象的状态发生改变时，所有依赖它的对象都将得到通知

// 在JavaScript中，我们无需去选择使用推模型还是拉模型。推模型是指在事件发生时，
// 发布者一次性把所有更改的状态和数据都推送给订阅者。拉模型不同的地方是，发布者仅仅通知订阅者事件已经发生了，
// 此外发布者要提供一些公开的接口供订阅者来主动拉取数据。拉模型的好处是可以让订阅者“按需获取”，
// 但同时有可能让发布者变成一个“门户大开”的对象，同时增加了代码量和复杂度。

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

var EventSapce = (function () {

  var Event,
    _default = 'default';

  Event = function () {
    let _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      each = function (ary, fn) {
        var ret;
        for (var i = 0, l = ary.length; i < l; i++) {
          var n = ary[i];
          ret = fn.call(n, i, n);
        }
        return ret;
      };

    const _listen = function (key, fn, cache) {
      if (!cache[key]) cache[key] = [];
      cache[key].push(fn);
    };

    const _remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var i = cache[key].length; i >= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };

    const _trigger = function () {
      var cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        ret,
        stack = cache[key];

      if (!stack || !stack.length) {
        return;
      }

      return each(stack, function () {
        return this.apply(_self, args);
      });
    };

    const _create = function (namespace) {
      var namespace = namespace || _default;
      var cache = {},
        offlineStack = [],    // 离线事件
        ret = {
          listen: function (key, fn, last) {
            _listen(key, fn, cache);
            if (offlineStack === null) {
              return;
            }
            if (last === 'last') {
              offlineStack.length && offlineStack.pop()();
            } else {
              each(offlineStack, function () {
                this();
              });
            }

            offlineStack = null;
          },
          one: function (key, fn, last) {
            _remove(key, cache);
            this.listen(key, fn, last);
          },
          remove: function (key, fn) {
            _remove(key, cache, fn);
          },
          trigger: function () {
            var fn,
              args,
              _self = this;

            _unshift.call(arguments, cache);
            args = arguments;
            fn = function () {
              return _trigger.apply(_self, args);
            };

            if (offlineStack) {
              return offlineStack.push(fn);
            }
            return fn();
          }
        };

      return namespace ?
        (namespaceCache[namespace] ? namespaceCache[namespace] :
          namespaceCache[namespace] = ret)

        : ret;
    };

    return {
      create: _create,
      one: function (key, fn, last) {
        var event = this.create();
        event.one(key, fn, last);
      },
      remove: function (key, fn) {
        var event = this.create();
        event.remove(key, fn);
      },
      listen: function (key, fn, last) {
        var event = this.create();
        event.listen(key, fn, last);
      },
      trigger: function () {
        var event = this.create();
        event.trigger.apply(this, arguments);
      }
    };
  }();

  return Event;

})();
