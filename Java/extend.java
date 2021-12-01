public class Extend {
  public static void main(String[] args) {

  }

  // static void areaTest() {
  //   Geometric geome = new Geometric();
  //   Circle c1 = new Circle();
  //   geome.
  // }
}

// 子类继承父类
// 1. 若子类重写了父类的方法，就意味着子类里定义的方法彻底覆盖了父类的同名方法，系统将不可能吧父类的方法转移到子类上；
// 2. 对于实例变量则不存在这样的现象，即使子类里定义了与父类完全相同的实例变量，这个实例变量依然不可能覆盖父类中定义的实例变量

class Geometric {
  protected String color;
  protected double weight;

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public double getWeight() {
    return weight;
  }

  public void setWeight(double weight) {
    this.weight = weight;
  }

  public Geometric(String color, double weight) {
    this.color = color;
    this.weight = weight;
  }

  public Geometric() {
  }

  public double calArea() {
    return 0.0;
  }

}

class Round extends Geometric {
  private double radius;

  public Round(String color, double weight, double radius) {
    super(color, weight);
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
  private double width;
  private double height;

  public Rectangle(double width, double height, String color, double weight) {
    super(color, weight);
    this.width = width;
    this.height = height;
  }

  public double getWidth() {
    return width;
  }

  public void setWidth(double width) {
    this.width = width;
  }

  public double getHeight() {
    return height;
  }

  public void setHeight(double height) {
    this.height = height;
  }

  @Override
  public double calArea() {
    return width * height;
  }
}
