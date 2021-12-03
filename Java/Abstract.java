// 抽象类是用来模型化那些父类无法确定全部实现，而是由其子类提供具体实现的对象的类。
// 1.abstract 不能用来修饰变量、代码块、构造器；
// 2.abstract 不能用来修饰私有方法、静态方法、final 的方法、final 的类。

public class Abstract {
  public static void main(String[] args) {
    // Creature ins = new Creature()

  }
}

// 抽象类 不能实例化
abstract class Creature {
  public abstract void breath();
}

abstract class Person extends Creature {
  String name;
  int age;

  public Person() {
  }

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public abstract void eat();

  public void walk() {
    System.out.println("人走路");
  }
}

class Student extends Person {
  public Student(String name, int age) {
    super(name, age);
  }

  @Override
  public void eat() {
    System.out.println("student eat food");
  }

  @Override
  public void breath() {
    System.out.println("student breath air");
  }
}

class Teacher extends Person {
  @Override
  public void eat() {
    System.out.println("teacher eat breakfast");
  }

  @Override
  public void breath() {
    System.out.println("teacher breath");
  }
}

// 模板方法的设计模式
abstract class Template {
  public void sendTime() {
    long start = System.currentTimeMillis();
    code();
    long end = System.currentTimeMillis();
    System.out.println("")
  }

  public abstract void code();
}