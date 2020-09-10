"use strict"
//#region 基本类型  
// 类型
// 判断类型 借用Object.toString方法
let isDone: boolean = false;
let decimal: number = 2;
let hex: string = "111"
let list: number[] = [1, 2]
let list2: Array<string> = ["1", "2"]
const typeNum = Object.prototype.toString.call(1);

// 原数组
let x: [string, number] // 声明原数组类型
x = ['22', 222] // 初始化 x

// 枚举类型 

function getColor(): string {
  return "color" // 计算属性
}
enum Color { Red = "red", Green = "green", Blue = "blue" }; // { 'red': 'Red', "green": 'Green', 'blue': 'Blue', Red: "red", Green:"green" ,Blue: "" }
enum Color2 { Red = 2, Green, Blue }; //{ '2': 'Red', '3': 'Green', '4': 'Blue', Red: 2, Green: 3, Blue: 4 }
let c: Color = Color.Green
enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWite = Read | Write,
  G = "234".length
}
interface Circle {
  readius: number;
}
// 类型
type WindowState = "open" | "closed" | "mininized";
type StringArray = Array<string>;
type ObjectWithNameArray = Array<{ name: string }>;


// 未知
let notSure: unknown = 4
notSure = false;
notSure = "maybe a string instead";
let looselyTyped: any = 4;
looselyTyped.toFixed();
looselyTyped = "afewe"
// null undefined
// any  不安全，不推荐x用
let unde: undefined = undefined;
let nul: null = null;
//#endregion

//#region 接口  
// 接口
interface SquareConfig {
  color: string;
  width?: number;   // 可选属性
  readonly height: number; // 只读
  [propName: string]: any; // 任意数量的其它属性
}
// 只读属性数组
let readOnlyArr: ReadonlyArray<number> = [1, 2, 4, 4]

// 函数类型接口
interface searchFunc {
  (source: string, subString: string): boolean // 参数source subString ,返回值类型Bollean
}

let mySearch: searchFunc;
mySearch = function (source: string, subString: string): boolean {
  return source + subString === ""
}
//#endregion

//#region 函数  
interface User {
  name: string;
  id: number;
}
// 函数参数和返回值  默认参数和省略参数是一样的 外部可以不传参
// userA({ name: "fawe", id: 22 })
function userA(params: User, some = "smaith"): string {
  console.log(some);
  return JSON.stringify(params)
}
// 函数返回值
function userB(): User {
  return { name: "qafew", id: 1 }
}
// 剩余参数  
function userC(a: string, ...b: string[]): void {
  console.log(a, b);

}
// 函数无返回值  void
function warnUser(): void {
  console.log("This function has no return value");
}
// 函数参数多种类型
function getlen(obj: string | string[]): number {
  return obj.length
}
// never
function error(): never {
  throw "this is an error"
}
function nuLives([a1, b1]: [number, number]) {
  const a = "aa"
  return a
}
// this 的值在函数被调用的时候才会指定
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => {};
}
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  //指定thi环境（假参数，出现在参数列表最前面，只能指定的this环境调用）
  createCardPicker: function (this: Deck, name: string) {
    // 箭头函数能保存函数创建时的 this
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}
// 数据类型
type Easing = "ease-in" | "ease-out" | "ease-in-out"
// 数字类型
function rollDice(): 1 | 2 | 3 | 4 | 5 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5;
}
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    console.log(dy, dx, easing)
  }
}
let button = new UIElement();
button.animate(0, 0, "ease-in");
type NetworkLoadingState = {
  state: string;
}
type NetworkFailedState = {
  state: "failed";
  code: number;
}
type NetworkSuccessState = {
  state: "success";
  respones: {
    title: string;
    duration: number;
    summary: string;// 摘要
  }
}
type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState;
// function networkStatus(state: NetworkState): string {
//   // return state.code // 必须是三个类型都同时存在的属性才能调用
//   switch (state.state) {
//     case "loading":
//       return "Downloading..."
//     case "failed":
//       return `Error ${state.code} downloading`
//     case "success":
//       return `Error ${state.respones.title} - ${state.respones.summary}`
//     default:
//       return ""
//   }
// }
// button.animate(0, 0, "ease-inout")
//#endregion

//#region  泛型 
// 泛型    返回值的类型与传入参数的类型是相同的
interface GenericIdentityFn<T> {
  (arg: T): T;
}
let myIdentity1: GenericIdentityFn<number> = identity //函数声明
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("heheh"); // 调用时确定类型
let output1 = identity("heheh"); // 调用时确定类型
let myIdentity: <T>(arg: T) => T = identity //函数声明
let myIdentity2: { <T>(arg: T): T } = identity // 同函数声明 带有调用签名的对象字面量来定义泛型函数
// 泛型类
class GenericNumber<T> {
  zeroValue?: T;
  add?: (x: T, Y: T) => T
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.add = (x, y) => { return x + y }
// 泛型约束 传入的类型必须有length属性
interface Lenthwise {
  length: number;
  name: string
}
function logIdenty<T extends Lenthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// logIdenty(20)
logIdenty({ name: "log", length: 20 }) //传入的类型必须有length和name属性 
/**
 * 数组泛型 
 * @param arg Array<T>
 */
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}
let loadput = loggingIdentity([123]);

// 在泛型约束中使用类型参数
// function getProperty(obj: <T>, Key: string) {
//   return obj[Key]
// }
// let obj = { a: 1, b: 2, c: 3, d: 4 }
// getProperty(obj, "a")

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal2 {
  numLegs: number;
}

class Bee extends Animal2 {
  keeper: BeeKeeper;
}

class Lion extends Animal2 {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal2>(c: new () => A): A {
  return new c();
}

//#endregion

//#region 类   
// 类 
class Greeter {
  greeting: string; // 属性
  // 构造函数  
  constructor(message: string) {
    this.greeting = message;
  }
  // 方法
  greet() {
    return "Hello" + this.greeting;
  }
}
// 构造类实例
let greeter = new Greeter("world")
console.log(greeter)

// 继承
class Animal {
  name: string; // 默认public
  #maxLen: number; // 私有属性 只能类内部使用 派生类、实例不能访问 同private age
  private _fullName = "";
  protected location: string; // 基类和派生类当中能访问  实例当中不能访问
  readonly height: number; // 只读属性
  static origin = { x: 0, y: 0 } // 静态属性，存在于类本身而不是类的实例上(其他属性都是实例化之后才会被初始化) 访问时需要加基类名：Animal.orrigin
  // 构造函数    readonly width: number 同height 但是简写
  constructor(theName: string, len = 0, readonly width?: number) {
    this.name = theName;
    this.#maxLen = len;
    this.height = 20;// 初始化时可以赋值；
    this.location = ""
    console.log(Animal.origin);
  }
  // 存取器
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > this.#maxLen) {
      throw new Error(`fullName has a max length of ${this.#maxLen}`)
    }
    this._fullName = newName;
  }
  move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}`)
  }
}
// D  og(派生类) 从基类Animal(超类)继承了 属性和方法；
class Dog extends Animal {
  constructor(name: string) {
    super(name, 10) // 在使用this之前调用super() 
  }
  // 此处重写了基类的move方法
  move(distanceInMeters = 5) {
    console.log("dog run");
    console.log(this.location); // 可以访问protected属性
    super.move(distanceInMeters) // 调用基类的方法
  }
}
class Horse extends Animal {
  constructor(name: string) {
    super(name, 10) // 执行基类的构造函数
  }
  // 重写父类方法
  move(distanceInMeters = 5) {
    console.log(`Galloping...`)
    super.move(distanceInMeters)
  }
}
const dog = new Dog("Sammy the Python")
const tom: Animal = new Horse("Tommy the Palomino")
dog.move();
tom.move(20);

dog.fullName = "fawejfo" //
console.log(dog.fullName);

// 抽象类  作为基类使用，不会呗实例化，抽象方法必须在派生类中实现
abstract class Human {
  country: string;
  abstract makeSound(): void; // 必须在派生类当中实现
  constructor(country: string) {
    this.country = country
  }
  sayHi(): void {
    console.log(`Hello I'm ${this.country}`);
  }
}
class America extends Human {
  constructor() {
    super("America")
  }
  makeSound(): void {
    console.log("I speack English")
  }
  notInAbstract(): void {
    console.log("south ")
  }
}
let man = new America();
man.notInAbstract();


// 把类作为接口使用
class PointA {
  x?: number;
  y?: number;
}
interface Point3d extends PointA {
  z: number;
}
let point3d: Point3d = { x: 1, y: 2, z: 3 }

//#endregion

//#region  实用类型
// Partial 类型转换为？
interface Todo {
  title: string;
  description: string;
}
// type a = Partial<Todo>
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate }
}
const todo1 = {
  title: "organize desk",
  description: "clear clutter"
}
const todo2 = updateTodo(todo1, {
  description: "throw out trash"
})
// 转换为只读 
const todo3: Readonly<Todo> = {
  title: "name",
  description: "string"
}
// Record type转object
interface PageInfo {
  title: string
}
type Page = "home" | "about" | "contact"
const nav: Record<Page, PageInfo> = {
  about: { title: "about", },
  home: { title: "home", },
  contact: { title: "contact", },
}
// Pick  取部分字段
interface Todo2 {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo2, "title" | "completed">
const todo4: Readonly<TodoPreview> = {
  title: "name",
  completed: false
}
// 排除 "a"
type T0 = Exclude<"a" | "b" | "c", "a"> // T0 : "b"|"c"
// 包含 "a"
type T1 = Extract<"a" | "b" | "c", "a"> // T0 : "a"

let personProps: keyof Todo2 = "title";

//#endregion

//#region Symbols  不可改变并且唯一
let syml = Symbol("keyof");
let syml2 = Symbol("keyof");
let sym = syml === syml2; //false
// 创建value唯一的对象
const directions = {
  UP: Symbol("UP"),
  DOWN: Symbol("DOWN"), // 与下面的不一样
  DOWN2: Symbol("DOWN"),
  LEFT: Symbol("LEFT"),
  RIGHT: Symbol("RIGHT")
};
const fibonacci = {
  [Symbol.iterator]: function* () {
    let a = 1;
    let b = 2;
    let temp;
    yield b;
    while (true) {
      temp = a;
      a = a + b;
      b = temp;
      yield b;
    }
  }
}
// 给对象创建
function getObj() {
  const symbol = Symbol("test")
  const obj = {};
  obj[symbol] = "text"
  return obj;
}
const obj = getObj();
Object.keys(obj) // []
obj[Symbol("test")] // undefined

const [symb] = Object.getOwnPropertySymbols(obj);
obj[symb];// 'test'
//#endregion


//#region Mixins
class Jumpable {
  jump() { }
}
class Duckable {
  duck() { }
}
class Sprite {
  x = 0;
  y = 0
}
interface Sprite extends Jumpable, Duckable { }
applyMixins(Sprite, [Jumpable, Duckable]);
let player = new Sprite();
player.jump()
// applyMixins(SmartObject)
// 混合
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
      )
    })
  })
}
function base<T>() {
  class Base {
    static prop: T;
  }
  return Base;
}
function derived<T>() {
  class Derived extends base<T>() {
    static anotherProp: T;
  }
  return Derived;
}
class Spec extends derived<string>() { }
Spec.anotherProp

//#endregion

//#region  声明合并
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 10, width: 12, scale: 0.3 }
interface Cloner {
  clone(animal: Animal): Animal
}
//#endregion

// 1.声明文件
// 2.项目配置(引用,配置,编译)


