
//#region 函数  
interface User1 {
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
function userB(): User1 {
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
function networkStatus(state: NetworkState): string {
  // return state.code // 必须是三个类型都同时存在的属性才能调用
  switch (state.state) {
    case "loading":
      return "Downloading..."
    case "failed":
      return `Error ${state.code} downloading`
    case "success":
      return `Error ${state.respones.title} - ${state.respones.summary}`
    default:
      return ""
  }
}
// button.animate(0, 0, "ease-inout")

// 交叉类型
function extend<T extends object, U extends object>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id]
    }
  }
  return result;
}
const x = extend({ a: "hello" }, { b: 42 })
// 现在 x 拥有了 a 属性与b属性；
//#endregion
