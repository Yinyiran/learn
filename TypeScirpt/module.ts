// 全局变量会被同目录下的其他文件访问到，export 出去之后就编程私有变量，不会被访问到

// const BeeKeeper = "fawe" 会报错，因为 ClassTs.ts 也声明了BeeKeeper变量，会被同文件夹下的其他文件访问到
// foo.ts
export const someVar = 123;
export type someType = {
  foo: string;
};
const ZooKeeper = ""; // Class.ts也有同名变量，但是epxort之后，会变成这个文件的私有变量，不会报错
export { ZooKeeper }