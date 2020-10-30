// 模板方法模式：使用继承

// 冲一壶咖啡
// 泡壶茶

// 分离出共同点
class Beverage {
  boilWater() {
    console.log("把水煮沸")
  }
  // abstract brew() { }
  brew() {
    throw new Error("子类必须重写brew方法")
  }
  pourInCup() {
    throw new Error("子类必须重写pourInCup方法")
  }
  addCondiments() {
    throw new Error("子类必须重写addCondiments方法")
  }
  // 钩子函数，确定是否需要执行addCondiments方法
  customerWantsCondiments() {
    return true; //默认需要调料
  }
  // 模板
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments) { // 如果钩子函数返回true，则需要调用
      this.addCondiments();
    }
  }
}
class Coffee extends Beverage {
  brew() {
    console.log("用沸水冲泡咖啡")
  }
  pourInCup() {
    console.log("把咖啡倒进杯子里")
  }
  addCondiments() {
    console.log("加糖和牛奶")
  }
}

class Tea extends Beverage {
  brew() {
    console.log("用沸水侵泡茶叶")
  }
  pourInCup() {
    console.log("拔插水倒进杯子")
  }
  addCondiments() {
    console.log("添加柠檬")
  }
  customerWantsCondiments() {
    return window.confirm("请问需要调料吗？")
  }
}

const coffee = new Coffee();
coffee.init();

const tea = new Tea();
tea.init();

// 模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式。在传统的面向对象语言中， 一个运用了模板
// 方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以我们把这部分逻辑抽象到父类的模板方法里面。
// 而子类的方法具体怎么实现则是可变的，于是我们把这部分变化的逻辑封装到子类中。 通过增加新的子类，
// 我们便能给系统增加新的功能，并不需要改动抽象父类以及其他子类，这也是符合开放 - 封闭原则的。

// JavaScript 方式实现继承

const BeverageJ = function (param) {
  const boilWater = function () {
    console.log("把水煮沸")
  }
  const brew = param.brew || function () {
    throw new Error("必须传入brew方法")
  }
  const pourInCup = param.pourInCup || function () {
    throw new Error("必须传入pourInGroup方法")
  }
  const addCondiments = param.addCondiments || function () {
    throw new Error("必须传入addCondiments方法")
  }
  const F = function () { }
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  }
  return F;
}

const CoffeeJ = BeverageJ({
  brew() {
    console.log("用沸水冲咖啡")
  },
  pourInCup() {
    console.log("")
  },
  addCondiments() {
    console.log("")
  }
});
const TeaJ = BeverageJ({
  brew: function () {
    console.log("用沸水冲泡茶叶")
  },
  pourInCup: function () {
    console.log("")
  },
  addCondiments() {
    console.log("")
  }
})
const coffeej = new CoffeeJ;
coffeej.init();
const teaj = new TeaJ()
teaj.init();