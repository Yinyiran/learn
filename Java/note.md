## 面试题: ==和 equals 的区别

一、== : 运算符

1. 可以使用在基本数据类型变量和引用数据类型变量中
2. 如果比较的是基本数据类型变量：比较两个变量保存的数据是否相等。(不一定类型要相同)
   如果比较的是引用数据类型变量：比较两个对象的地址值是否相同,即两个引用是否指向同一个对象实体
   补充: == 符号使用时，必须保证符号左右两边的变量类型一致。

二、equals()方法的使用

1. 是一个方法，而非运算符 .
2. 只能适用于引用数据类型。
3. Object 类中 equals()的定义：

   ```
   public boolean equals(Object obj){
         return (this == obj);
       }
   ```

   > 说明：Object 类中定义的 equals()和==的作用是相同的，比较两个对象的地址值是否相同，即两个引用是否指向同一个对象实体。

4. 像 String、Date、File、包装类等都重写了 Object 类中的 equals()方法.

   > 两个引用的地址是否相同，而是比较两个对象的“实体内容”是否相同。

5. 通常情况下，我们自定义的类如果使用 equals()的话，也通常是比较两个对象的"实体内容"是否相同。那么，我们

   > 就需要对 Object 类中的 equals()进行重写。

   > 重写的原则:比较两个对象的实体内容是否相同。

   ```java
     String str1 = new String("BAT");
     String str2 = new String("BAT");
     str1.equals(str2) // true   String、Date、File、包装类,比较两个对象的“实体内容”是否相同
     str1 == str2 // false  两个引用的地址是否相同
   ```

三、 final :最终的

1.  final 可以用来修饰的结构:类、方法、变量
2.  final 用来修饰一个类:此类不能被其他类所继承。
    比如:String 类、System 类、StringBuffer 类
3.  final 修饰一个方法:final 标记的方法不能被子类重写。
    比如：Object 类中的 getClass()。
4.  final 用来修饰变量:此时的"变量"(成员变量或局部变量)就是一个常量。名称大写，且只能被赋值一次。

    1. final 修饰属性，可以考虑赋值的位置有:显式初始化、代码块中初始化、构造器中初始化
    2. final 修饰局部变量:
       尤其是使用 final 修饰形参时，表明此形参是一个常量。当我们调用此方法时，给常量形参赋一个实参。
       一旦赋值以后，就只能在方法体内使用此形参，但不能进行重新赋值。

5.  static final 用来修饰:全局常量

```java
   // 常量类 不能被继承
   final class FinalClass {
      final WIDTH = 0; // 常量 不能被修改
      final HEIGHT;
      // 常量方法不能被重写
      final getWIDTH(){
         return WIDTH;
      }
   }
```
