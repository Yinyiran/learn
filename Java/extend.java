import java.util.Random;

public class Extend {
  public static void main(String[] args) {
    // geometricAreaTest();
    animalTest();
  }

  // Geometric
  static void geometricAreaTest() {
    Round r1 = new Round("black", 3, 5);
    printGeometric(r1);
    Rectangle r2 = new Rectangle("white", 2.0, 5.0);
    printGeometric(r2);
    Triangle t1 = new Triangle("white", 2.0, 5.0);
    printGeometric(t1);
    boolean isEual = equalGeomeArea(r1, r2);
    System.out.println("面积是否相等：" + isEual);
  }

  public static void printGeometric(Geometric obj) {
    System.out.println(getGeometricType(obj) + "，面积：" + obj.calArea());
  }

  public static boolean equalGeomeArea(Geometric o1, Geometric o2) {
    return o1.calArea() == o2.calArea();
  }

  public static String getGeometricType(Geometric obj) {
    if (obj instanceof Round) {
      return "圆";
    } else if (obj instanceof Rectangle) {
      return "长方形";
    } else if (obj instanceof Triangle) {
      return "三角形";
    } else {
      return "基本类型";
    }
  }

  // Animal
  public static void animalTest() {
    int key = new Random().nextInt(4);
    System.out.println(key);
    Animal animal = getAnimalInstance(key);
    animal.eat();
  }

  public static Animal getAnimalInstance(int key) {
    switch (key) {
      case 0:
        return new Cat();
      case 1:
        return new Dog();
      case 3:
        return new Sheep();
      default:
        return new Animal();
    }
  }
}

// 子类继承父类
// 1. 若子类重写了父类的方法，就意味着子类里定义的方法彻底覆盖了父类的同名方法，系统将不可能吧父类的方法转移到子类上；
// 2. 对于实例变量则不存在这样的现象，即使子类里定义了与父类完全相同的实例变量，这个实例变量依然不可能覆盖父类中定义的实例变量

class Geometric {
  protected String color;
  protected double with;

  public Geometric() {
  }

  public Geometric(String color, double with) {
    this.color = color;
    this.with = with;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public double getWeight() {
    return with;
  }

  public void setWeight(double with) {
    this.with = with;
  }

  public double calArea() {
    return 0.0;
  }
}

class Round extends Geometric {
  private double radius;

  public Round(String color, double radius, double with) {
    super(color, with);
    this.radius = radius;
  }

  public double getRadius() {
    return radius;
  }

  public void setRadius(double radius) {
    this.radius = radius;
  }

  @Override
  public double calArea() {
    return Math.PI * radius * radius;
  }
}

class Rectangle extends Geometric {
  private double height;

  public Rectangle(String color, double height, double with) {
    super(color, with);
    this.height = height;
  }

  public double getHeight() {
    return height;
  }

  public void setHeight(double height) {
    this.height = height;
  }

  @Override
  public double calArea() {
    return super.with * height;
  }
}

class Triangle extends Geometric {

  private double height;

  public Triangle(String color, double height, double with) {
    super(color, with);
    this.height = height;
  }

  public void setHeight(double height) {
    this.height = height;
  }

  public double getHeight() {
    return height;
  }

  @Override
  public double calArea() {
    return height * super.with / 2;
  }
}

// 面试题： 多态是编译时行为还是运行时行为？如何证明？
class Animal {
  protected void eat() {
    System.out.println("animal eat food");
  }
}

class Cat extends Animal {
  protected void eat() {
    System.out.println("cat eat food");
  }
}

class Dog extends Animal {
  protected void eat() {
    System.out.println("dog eat food");
  }
}

class Sheep extends Animal {
  protected void eat() {
    System.out.println("sheep eat food");
  }
}