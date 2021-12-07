public class Java8 {
  public static void main(String[] args) {
    testCompare();
  }

  public static void testCompare() {
    SubCompare sub = new SubCompare();
    // 知识点1： 接口中定义的静态方法，只能通过接口来调用
    CompareX.m1();
    // 知识点2： 通过实现类的对象，可以调用接口中的默认方法。
    // 如果实现类重写接口中默认方法，调用重写后的方法
    sub.m2();
    // 知识点3：如果子类/实现类继承的父类和实现的接口中声明了同名参数的默认方法，子类没有重写，调用父类同名同参数方法(类优先原则）)
    // 知识点4：如果实现类实现多个接口，多个接口中定义了同名同参数默认方法，实现类没有重写此方法，会报错（接口冲突）
    sub.m3();

  }
}

interface CompareX {
  public static void m1() {
    System.out.println("Compare xian");
  }

  public default void m2() {
    System.out.println("Compare shenzhen");
  }

  public default void m3() {
    System.out.println("Compare hangzhou");
  }
}

class SubCompare extends SuperCompare implements CompareX, CompareY {
  @Override
  public void m2() {
    System.out.println("SubCompare: shagnhai");
  }

  @Override
  public void m3() {
    System.out.println("SubCompare: shenzhen");
  }

  public void myMethod() {
    m3(); // 自己的方法
    super.m3(); // 父类的方法
    CompareX.super.m3(); // 接口默认方法
    CompareY.super.m3(); // 接口默认方法
  }
}

class SuperCompare {
  public void m3() {
    System.out.println("SuperCompare: beijing");
  }
}

interface CompareY {
  default void m3() {
    System.out.println("compare :shanghai");
  }
}

// 练习 ：接口冲突解决方式
interface Filial {
  default void help() {
    System.out.println("爷爷");
  }
}

interface Spoony {
  default void help() {
    System.out.println("媳妇");
  }
}

class Father {
  public void help() {
    System.out.println("爸爸");
  }
}

class Man extends Father implements Filial, Spoony {
  @Override
  public void help() {
    System.out.println("该救谁");
    Filial.super.help();
    Spoony.super.help();
  }
}