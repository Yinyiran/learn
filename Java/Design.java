public class Design {
  public static void main(String[] args) {
    staticBlock();
  }

  public static void staticBlock() {
    System.out.println(Block.orderId);
    Block o = new Block();
    System.out.println(Block.orderId);
    System.out.println(o);
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
