public class Design {
  public static void main(String[] args) {
    // staticBlock();
    // templateTest();
  }

  public static void staticBlock() {
    System.out.println(Block.orderId);
    Block o = new Block();
    System.out.println(Block.orderId);
    System.out.println(o);
  }

  public static void templateTest() {
    SubTemplate t = new SubTemplate();
    t.sendTime();
  }
}

// 所谓类的单例设计模式，就是采取一定的方法保证在
// 整个的软件系统中，对某个类只能存在一个对象实例
// 由于单例模式只生成一个实例，减少了系统性能开销，当一个对象的产生需要比较多的资源时，
// 如读取配置、产生其他依赖对象时，则可以通过在应用启动时直接产生一个单例对象，然后永久驻留内存的方式来解决。

class SingleTon {

}

// 单例模式：饿汉模式
class Bank {

  // 私有构造器，外部不能new创建Bank对象
  private Bank() {
  }

  // 内部创建对象
  private static Bank instance = new Bank();

  // 提供静态方法，返回该对象(这样保证Bank只存在一个对象)
  public static Bank getInstance() {
    return instance;
  }

}

// 单例模式懒汉模式
class Order {

  private Order() {
  };

  private static Order instance = null;

  public static Order getInstance() {
    if (instance == null) {
      instance = new Order();
    }
    return instance;
  }
}

class Block {
  final int WIDTH = 0;
  static int orderId;
  static {
    orderId = 1;
  }

  {
    orderId = 2;
  }
}

// 抽象类体现的就是一种模板模式的设计，抽象类作为多个子类的通用模板，子类在抽象类的基础上进行扩展、改造，
// 但子类总体上会保留抽象类的行为方式。

// 模板方法的设计模式
abstract class Template {
  public void sendTime() {
    long start = System.currentTimeMillis();
    code();
    long end = System.currentTimeMillis();
    System.out.println(start);
    System.out.println(end);
  }

  public abstract void code();
}

class SubTemplate extends Template {
  @Override
  public void code() {
    for (int i = 2; i < 1000; i++) {
      boolean isFlag = true;
      for (int j = 2; j < Math.sqrt(i); j++) {
        if (i % j == 0) {
          isFlag = false;
          break;
        }
        if (isFlag) {
          System.out.println(i);
        }
      }
    }
  }
}

abstract class BankTemplateMethod {
  public void takeNumber() {
    System.out.println("取号，排队");
  }

  public abstract void transact(); // 办理基本业务 钩子方法

  public void evaluate() {
    System.out.println("反馈评分");
  }

  // 模板方法，把基本操作组合到一起，子类一般不能重写
  public final void process() {
    this.takeNumber();
    this.transact(); // 像个钩子，具体执行时，挂哪个子类，就执行哪个子类的实现代码
    this.evaluate();
  }
}

class DrawMoney extends BankTemplateMethod {
  @Override
  public void transact() {
    System.out.println("我要取款");
  }
}

class ManageMoney extends BankTemplateMethod {
  @Override
  public void transact() {
    System.out.println("我要理财");
  }
}
