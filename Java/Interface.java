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
    // USBTest();
    compareTest();
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

  public static void compareTest() {
    CompareCircle c1 = new CompareCircle(3.4);
    CompareCircle c2 = new CompareCircle(3.6);
    int compareVal = c1.compareTo(c2);
    if (compareVal > 0) {
      System.out.println("c1对象大");
    } else if (compareVal < 0) {
      System.out.println("c2对象大");
    } else {
      System.out.println("c1 与 c2 一样大");
    }
    int compareValue1 = c1.compareTo(new String("AA"));
    System.out.println(compareValue1);
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

// 错误1
interface A {
  int x = 0;
}

class B {
  int x = 1;
}

class C extends B implements A {
  public void pX() {
    // 编译不通过，x 不明确
    // System.out.println(x);

    // System.out.println(super.x); //1
    // System.out.println(A.x);//0
  }

  public static void main(String[] args) {
    new C().pX();
  }
}

// 错误2
interface PlayAble {
  void play();
}

interface BounceAble {
  void play();
}

interface RollAble extends PlayAble, BounceAble {
  Ball ball = new Ball("PingPang"); // 此处省略了 public static final
}

class Ball implements RollAble {
  private String name;

  public String getName() {
    return name;
  }

  public Ball(String name) {
    this.name = name;
  }

  public void play() {
    // ball = new Ball("footbal"); // 报错
    System.out.println(ball.getName());
  }
}

// 练习 ： 比较两个对象
interface CompareObj {
  int compareTo(Object o);
}

class CircleA {
  Double radius;

  public Double getRadius() {
    return radius;
  }

  public void setRadius(Double radius) {
    this.radius = radius;
  }

  public CircleA() {
    super();
  }

  public CircleA(Double radius) {
    this.radius = radius;
  }
}

class CompareCircle extends CircleA implements CompareObj {
  public CompareCircle(double radius) {
    super(radius);
  }

  @Override
  public int compareTo(Object o) {
    if (this == o) {
      return 0;
    }
    if (o instanceof CompareCircle) {
      CompareCircle c = (CompareCircle) o;
      // 当属性 radius 声明为 Double 类型时，可以调用包装类的方法
      return this.getRadius().compareTo(c.getRadius());
    } else {
      return 0;
    }
  }
}
