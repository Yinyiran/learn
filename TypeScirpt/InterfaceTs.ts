
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

// 类当作参数传入泛型类
class User {
  username: string | undefined;
  password: string | undefined;
  constructor(param: { username: string | undefined; password?: string | undefined }) {
    this.username = param.username;
    this.password = param.password;
  }
}
// 数据库类
class Db<T> {
  add(user: T): boolean {
    console.log(user)
    return true;
  }
  updated(user: T, id: number): boolean {
    console.log(user, id)
    return true
  }
}
let u = new User({ username: "张三" });
u.password = "11111"
let db = new Db<User>();
db.add(u)
db.updated(u, 1)


//#endregion