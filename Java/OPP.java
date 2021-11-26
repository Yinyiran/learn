public class OPP {
  public static void main(String[] args) {
    // newPerson();
    // getArea();
    accountBook();
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

}

class Person {
  int age;
  private int age2;

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

  Person() {
    System.out.println("new Person ");
  }

  Person(int age1) {
    // age = age1;
    System.out.println("new Person age");
    System.out.println(age);
    System.out.println(age2);
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

class KidsTest {
  public static void main(String[] args) {
    Kids somekid = new Kids(12);
    System.out.println();
    somekid.printAge();
    somekid.setYearsOld(20);
    somekid.setSex(1);

    somekid.employeed();
    somekid.manOrWoman();
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