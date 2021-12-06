// 接口时抽象方法和常量值的定义集合
// 从几个类中抽取出一些共同的行为特征，而它们之间又没有 is-a 的关系，仅仅是具有相同的行为特征而已

/**
 * 特点：
 * 接口中的所有成员变量都默认是由 public static final 修饰的。
 * 接口中的所有抽象方法都默认是由 public abstract 修饰的。
 * 接口中没有构造器，接口不可以实例化
 * 接口采用多继承机制。
 */

public class Interface {
  public static void main(String[] args) {
    USBTest();
  }

  public static void USBTest() {
    // 1.创建了接口的非匿名实现类的非匿名对象；
    Computer com = new Computer();
    Flash flash = new Flash();
    com.transferData(flash);
    // 2. 创建几接口的非匿名实现类的匿名对象；
    com.transferData(new Printer());
    // 3.创建了接口的匿名实现类的非匿名对象；
    USB phone = new USB() {
      @Override
      public void start() {
        System.out.println("手机开始工作");
      }

      @Override
      public void stop() {
        System.out.println("手机结束工作");
      }
    };
    com.transferData(phone);
    // 4.创建了接口的匿名实现类的匿名对象
    com.transferData(new USB() {
      @Override
      public void start() {
        System.out.println("mp3 开始工作");
      }

      @Override
      public void stop() {
        System.out.println("mp3 结束工作");
      }
    });
  }
}

interface Flayable {
  // 全局变量
  public static final int Max_SPEED = 7900;
  int MIN_SPEED = 1; // 省略了public static final;
  // 抽象方法

  public abstract void fly();

  void stop();// 省略了 public abstract;
}

interface Attackable {
  void attack();
}

interface AA {
  void AAMethod();
}

interface BB {
  void BBMethod();
}

interface CC extends AA, BB {
  void CCMethod();
}

// 可继承的类必须实现所有接口方法
class Plane implements Flayable {
  @Override
  public void fly() {
    System.out.println("飞机通过引擎起飞");
  }

  @Override
  public void stop() {
    System.out.println("分级减速停止");
  }
}

// 抽象类可以implement部分方法
abstract class Kite implements Flayable {
  @Override
  public void fly() {

  }
}

class Bullet extends Object implements Flayable, Attackable, CC {
  @Override
  public void fly() {

  }

  @Override
  public void stop() {

  }

  @Override
  public void attack() {

  }

  @Override
  public void AAMethod() {

  }

  @Override
  public void BBMethod() {

  }

  @Override
  public void CCMethod() {

  }
}

class Computer {
  public void transferData(USB usb) {
    usb.start();
    System.out.println("具体传输数据的细节");
    usb.stop();
  }
}

interface USB {
  void start();

  void stop();
}

class Flash implements USB {
  @Override
  public void start() {
    System.out.println("U 盘开始工作");
  }

  @Override
  public void stop() {
    System.out.println("U 盘结束工作");
  }
}

class Printer implements USB {
  @Override
  public void start() {
    System.out.println("打印机开始工作");
  }

  @Override
  public void stop() {
    System.out.println("打印机结束工作");
  }
}
