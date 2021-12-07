public class Design {
  public static void main(String[] args) {
    // staticBlock();
    // templateTest();
    starConcert();
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

  public static void starConcert() {
    Proxy star = new Proxy(new RealStar());
    star.confer();
    star.signContract();
    star.bookTicket();
    star.sing();
    star.collectMoney();
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

/**
 * 代理模式
 * 为其他对象提供一种代理以控制对这个对象的访问。
 * 1.安全代理：屏蔽对真实角色的直接访问。
 * 2.远程代理：通过代理类处理远程方法调用（RMI）
 * 3.延迟加载：先加载轻量级的代理对象，真正需要再加载真实对象
 */

interface NetWork {
  void browse();
}

// 被代理类
class Server implements NetWork {
  @Override
  public void browse() {
    System.out.println("真实的服务器来访问");
  }
}

// 代理类
class ProxyServer implements NetWork {
  private NetWork work;

  public ProxyServer(NetWork work) {
    this.work = work;
  }

  public void check() {
    System.out.println("联网前的检查工作");
  }

  @Override
  public void browse() {
    check();
    work.browse();
  }
}

// 比如你要开发一个大文档查看软件，大文档中有大的图片，有可能一个图片有 100MB，在打开文件时，不可能
// 将所有的图片都显示出来，这样就可以使用代理模式，当需要查看图片时，用 proxy 来进行大图片的打开。

// 例子
interface Star {
  void confer();// 面谈

  void signContract();// 签合同

  void bookTicket();// 订票

  void sing();// 唱歌

  void collectMoney();// 收钱
}

// 被代理类
class RealStar implements Star {
  @Override
  public void confer() {

  }

  @Override
  public void signContract() {

  }

  @Override
  public void bookTicket() {

  }

  @Override
  public void sing() {
    System.out.println("明星唱歌");
  }

  @Override
  public void collectMoney() {

  }
}

// 代理类
class Proxy implements Star {
  private Star real;

  public Proxy(Star real) {
    this.real = real;
  }

  @Override
  public void confer() {
    System.out.println("经纪人面谈");
  }

  @Override
  public void signContract() {
    System.out.println("经纪人签合同");
  }

  @Override
  public void bookTicket() {
    System.out.println("经纪人订票");
  }

  @Override
  public void sing() {
    real.sing();
  }

  @Override
  public void collectMoney() {
    System.out.println("经纪人收钱");
  }
}

// 工厂模式

