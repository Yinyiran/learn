## JS 类型

#### 基本（值）类型

- String: 任意字符串
- Number: 任意数字
- Boolean: true / false
- undefined: undefined
- null: null

#### 对象（引用）类型

- Object: 任意对象
- Function: 一种特别的对象
- Array: 一种特别对象(数值下表，内部数据是有序的)

### 类型判断

- typeof 可以判断对象的具体类型 除了 null object array(返回 Object)
- instanceof 判断对象类型 function(Function,Object) [] {}
- === 可以判断 undefined null
- undefined 未赋值，null 是基本类型，
- 什么时候用 null? let a = null 表明未来要赋值对象； 或者清空对象（回收）也可以赋值 null
-
