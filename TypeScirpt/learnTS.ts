"use strict"
import { Animal } from "./ClassTs";
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
let x1: [string, number] // 声明原数组类型
x1 = ['22', 222] // 初始化 x

type Text1 = string | { text: string };
type Coordinates = [string, number];
type Callback = (data: string) => void;

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
// 用个变量来存储传入的变量, 这样可以传入定义的接口以外的值，否则如果直接传入对象中无接口定义的值会报错，所以建议接口定义了哪些值就传哪些值。
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
// 约束数组
interface Arr {
  [index: number]: string
}
let ss: Arr = ["234"];
interface Obj {
  [index: string]: string
}
let ob: Obj = { a: "1" }


let mySearch: searchFunc;
mySearch = function (source: string, subString: string): boolean {
  return source + subString === ""
}
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


