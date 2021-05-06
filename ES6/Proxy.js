const obj = new Proxy({}, {
  get(target, propKey, receiver) {
    console.log("get", target, propKey, receiver);
    return Reflect.get(target, propKey, receiver)
  },
  set(target, propKey, value, receiver) {
    console.log("set", target, propKey, value, receiver)
    return Reflect.set(target, propKey, value, receiver)
  },
});

obj.name = "1243";

obj.count = 1;
obj.count++;
console.log(obj);

const persion = {
  isHuman: false,
  printIntroduction() {
    console.log(`My name is ${this.name} , Am I is human :${this.isHuman}`)
  }
}
const me = Object.create(persion)
console.log(me);
const pipe = function (value) {
  let funcStack = [];
  let oproxy = new Proxy({}, {
    get(pipeObj, fnName) {
      console.log(fnName)
      if (fnName === "get") {
        return funcStack.reduce((val, fn) => {
          return fn(val)
        }, value)
      }
    }
  })
}