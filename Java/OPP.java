public class OPP {
  public static void main(String[] args) {
    // newPerson();
    // getArea();
    // accountBook();
    // kidsTest();
    personTest();
  }

  static void newPerson() {
    Person anna = new Person(5);
    // Person tony = new Person();
    // anna.age = 10;
    anna.shout();
    // tony.shout();
    Person tony = anna;
    anna = null;
    System.out.println(anna);
    System.out.println(tony.age);

  }

  static void getArea() {
    Cylinder cy = new Cylinder();
    cy.setRadius(2.1);
    cy.setLength(3.4);
    double volues = cy.finVolumn();
    System.out.println("圆柱的体积" + volues);
    double area = cy.findArea();
    System.out.println("圆的面积" + area);
    cy.print();
  }

  static void accountBook() {
    Account account = new Account(111, 2000, 3.2);
    account.deposit(500);
    System.out.println(account.getBalance());
    account.withdraw(1000);
    System.out.println(account.getBalance());
    System.out.println(account.getAnnualInterestRate());
  }

  static void kidsTest(String[] args) {
    Kids somekid = new Kids(12);
    System.out.println();
    somekid.printAge();
    somekid.setYearsOld(20);
    somekid.setSex(1);
    somekid.employeed();
    somekid.manOrWoman();
  }

  static void personTest() {
    System.out.println("1. Person p1:");
    Person p1 = new Person();
    p1.eat();

    System.out.println("2. Man:");
    Man man = new Man();
    man.eat();
    man.age = 30;
    man.earnMoney();

    System.out.println("3. Person-Man p2:");
    // 有了对象的多态性以后，内存中实际上是加载了子类特有的属性和方法，但是由于变量声明为父类类型，导致
    // 编译时，只能调用父类中声明的属性和方法。子类的属性和方法不能调用。
    Person p2 = new Man();
    p2.eat();
    p2.walk();
    p2.name = "Tom";

    System.out.println("4. (Man)p2:");
    Man m1 = (Man) p2; // 使用强制类型转换符，也可称为:向下转型
    m1.earnMoney();

    // a instanceof A 判断对象a是否是类A的实例；
    if (p2 instanceof Woman) {
      Woman w1 = (Woman) p2;
      // Woman w1 = (Woman) p2; // 使用强转时，可能出现ClassCastException异常
      // w1.goShopping();
      w1.goShopping();
      System.out.println("p2 instanceof Woman");
    }

    if (p2 instanceof Man) {
      Man m2 = (Man) p2;
      m2.earnMoney();
      System.out.println("p2 instanceof Man");
    }
    if (p2 instanceof Person) {
      System.out.println("p2 instanceof Person");
    }
    if (p2 instanceof Object) {
      System.out.println("p2 instanceof Object");
    }

    // 向下转型的常见问题
    // 练习
    // 问题1:编译时通过，运行时不通过
    // 举例一
    // Person p3 = new Woman();
    // Man m3 = (Man)p3;

    // 举例二
    Person p4 = new Person();
    Man m4 = (Man) p4;
    System.out.println(m4.age);

    // 问题二:编译通过，运行时也通过
    Object obj = new Woman();
    Person p = (Person) obj;
    System.out.println(p.age);

    // 问题三:编译不通过
    // Man m5 = new woman();

    // String str = new Date();

    // Object o = new Date();
    // String str1 = (String)o;
  }


}

class DataSwap {
  public int a;
  public int b;
}

class ManKind {
  int sex;
  int salary;

  public ManKind(int sex, int salary) {
    this.sex = sex;
    this.salary = salary;
  }

  public void manOrWoman() {
    String sexStr = sex == 1 ? "man" : "woman";
    System.out.println(sexStr);
  }

  public void employeed() {
    String employ = salary > 0 ? "job" : "no job";
    System.out.println(employ);
  }

  public int getSex() {
    return sex;
  }

  public void setSex(int sex) {
    this.sex = sex;
  }

  public int getSalary() {
    return salary;
  }

  public void setSalary(int salary) {
    this.salary = salary;
  }
}

class Kids extends ManKind {
  int yearsOld;

  public Kids(int yearsOld) {
    super(1, 23);
    this.yearsOld = yearsOld;
  }

  public void setYearsOld(int yearsOld) {
    this.yearsOld = yearsOld;
  }

  public int getYearsOld() {
    return yearsOld;
  }

  public void printAge() {
    System.out.println("I am " + yearsOld);
  }
}

class Circle {
  public double radius;

  public Circle() {
    radius = 1.0;
  }

  public double getRadius() {
    return radius;
  }

  public void setRadius(double radius) {
    this.radius = radius;
  }

  public double findArea() {
    return Math.PI * radius * radius;
  }

  public void print() {
    System.out.println("print");
  }
}

class Cylinder extends Circle {
  private double length;

  public Cylinder() {
    length = 1.0;
  }

  public double getLength() {
    return length;
  }

  public void setLength(double length) {
    this.length = length;
  }

  public double finVolumn() {
    return findArea() * length;
  }

  @Override
  public void print() {
    System.out.println("rewrite print");
  }

  @Override
  public double findArea() {
    return super.findArea();
  }
}

/*
 * 写一个名为Account的类模拟账户。该类的属性和方法如下图所示。
 * 该类包括的属性：账号id，余额balance，年利率annualInterestRate； 包含的方法：访问器方法（getter和setter方法），
 * 返回月利率的方法getMonthlyInterest()， 取款方法withdraw()，存款方法deposit()。
 */

class Account {
  private int id;
  private double balance;
  private double annualInterestRate;

  public Account(int id, double balance, double annualInterestRate) {
    super();
    this.id = id;
    this.balance = balance;
    this.annualInterestRate = annualInterestRate;
  }

  public double getBalance() {
    return balance;
  }

  public int getId() {
    return id;
  }

  public double getAnnualInterestRate() {
    return annualInterestRate;
  }

  public void setBalance(int balance) {
    this.balance = balance;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setAnnualInterestRate(double annualInterestRate) {
    this.annualInterestRate = annualInterestRate;
  }

  // 取款方法
  public void withdraw(double amount) {
    if (balance >= amount) {
      balance -= amount;
      return;
    }
    System.out.println("余额不足");
  }

  public void deposit(int amount) {
    if (amount > 0) {
      balance += amount;
    }
  }
}

class CheckAccount extends Account {
  private double overdraft;

  public CheckAccount(int id, double balance, double annualInterestRate, double overdraft) {
    super(id, balance, annualInterestRate);
    this.overdraft = overdraft;
  }

  public double getOverdraft() {
    return overdraft;
  }

  public void setOverdraft(double overdraft) {
    this.overdraft = overdraft;
  }

  @Override
  public void withdraw(double amount) {
    // super.withdraw(amount);
  }

}

class Person {
  String name;
  int age;
  private int age2;

  Person() {
    // System.out.println("new Person ");
  }

  Person(int age1) {
    // age = age1;
    System.out.println("new Person age");
    System.out.println(age);
    System.out.println(age2);
  }

  String shout() {
    String name = "awefawefw";
    System.out.println("oh,my good ! i am " + age + " year old");
    return name;
  }

  String shout(int a) {
    String name = "1111";
    System.out.println("oh,my good ! i am " + age + " year old");
    return name;
  }

  public void eat() {
    System.out.println("人，吃饭");
  }

  public void walk() {
    System.out.println("人，走路");
  }
}

class Man extends Person {
  boolean isSmoking;

  public void eat() {
    System.out.println("男人，吃饭，长肉");
  }

  public void walk() {
    System.out.println("男人，霸气走路");
  }

  public void earnMoney() {
    System.out.println("赚钱养家");
  }
}

class Woman extends Person {
  boolean isDress;

  public void goShopping() {
    System.out.println("女人喜欢购物");
  }

  public void eat() {
    System.out.println("女人，吃的少，身材苗条");
  }

  public void walk() {
    System.out.println("女人，走路好看");
  }
}
