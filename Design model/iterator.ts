// 迭代器模式:提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示
// 迭代器模式可以把迭代的过程从业务逻辑中分离出来，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

// jquery $.each
const each = function (obj, callback) {
  let value;
  let length = obj.length;
  let isArray = isArrayLike(obj)
  if (isArray) {
    for (let i = 0; i < length; i++) {
      const value = callback.call(obj[i], i, obj[i]);
      if (value === false) break;
    }
  } else {
    for (const key in obj) {
      value = callback.call(obj[key], key, obj[key])
      if (value === false) break;
    }
  }
}

function isArrayLike(obj) {
  let length = "length" in obj && obj.length;
  let reg = /^\[Object\s(.+)\]$/g;
  Object.prototype.toString.call(obj).match(reg)
  let type = RegExp.$1.toLowerCase();
  if (type === "function") return false
  if (obj.nodeType === 1 && length) return true;
  return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
}

// 倒叙迭代器
const reverseEach = function (ary, callback) {
  for (let i = ary.length - 1; i >= 0; i--) {
    callback(i, ary[i])
  }
}
reverseEach([0, 1, 2], function (i, n) {
  console.log(i, n)
})

// 案例：上传方法判断

const conditionA = function () {
  return false
}
const conditionB = function () {
  return false;
}
const conditionC = function () {
  return true
}
const conditionList = [conditionA, conditionB, conditionC]

let condition = function (list) {
  for (let i = 0; i < list.length; i++) {
    let fn = list[i]
    let obj = fn();
    if (obj) return obj;
  }
}
let res = condition(conditionList)