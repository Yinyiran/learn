import java.util.Calendar;


// 抽象类是用来模型化那些父类无法确定全部实现，而是由其子类提供具体实现的对象的类。
// 1.abstract 不能用来修饰变量、代码块、构造器；
// 2.abstract 不能用来修饰私有方法、静态方法、final 的方法、final 的类。

public class Abstract {
  public static void main(String[] args) {
    // Creature ins = new Creature()
    payrollSystem();
  }

  public static void personTest() {
    // 创建了一个匿名子类的对象:p
    Person p = new Person() {
      @Override
      public void eat() {
        System.out.println("abstract person eat");
      }

      @Override
      public void breath() {
        System.out.println("breath abstract breath");
      }
    };
    System.out.println(p);
  }

  public static void payrollSystem() {
    Calendar calendar = Calendar.getInstance();
    int month = calendar.get(Calendar.MONTH);
    Employee[] emps = new Employee[2];
    emps[0] = new SalariedEmployee("马良", 10001, new MyDate(1995, 2, 20), 10000);
    emps[1] = new HourlyEmployee("乔巴", 20001, new MyDate(2012, 12, 12), 100, 90);
    for (int i = 0; i < emps.length; i++) {
      System.out.println(emps[i].toString());
      double salary = emps[i].earnings();
      System.out.println("月工资为：" + salary);
      if (month + 1 == emps[i].getBirthday().getMonth()) {
        System.out.println("生日快乐，奖励100元");
      }
    }
  }
}

// 抽象类 不能实例化
abstract class Creature {
  public abstract void breath();
}

abstract class Person extends Creature {
  String name;
  int age;

  public Person() {
  }

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public abstract void eat();

  public void walk() {
    System.out.println("人走路");
  }
}

class Student extends Person {
  public Student(String name, int age) {
    super(name, age);
  }

  @Override
  public void eat() {
    System.out.println("student eat food");
  }

  @Override
  public void breath() {
    System.out.println("student breath air");
  }
}

class Teacher extends Person {

  @Override
  public void eat() {
    System.out.println("teacher eat breakfast");
  }

  @Override
  public void breath() {
    System.out.println("teacher breath");
  }
}

/*
 * 定义一个 Employee 类，
 * 该类包含：private 成员变量 name,number,birthday，
 * 其中 birthday 为 MyDate 类的对象；
 * abstract 方法 earnings()；
 * toString()方法输出对象的 name,number 和 birthday。
 * 
 */
abstract class Employee {
  private String name;
  private int number;
  private MyDate birthday;

  public Employee(String name, int number, MyDate birthday) {
    this.name = name;
    this.number = number;
    this.birthday = birthday;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getNumber() {
    return number;
  }

  public void setNumber(int number) {
    this.number = number;
  }

  public MyDate getBirthday() {
    return birthday;
  }

  public void setBirthday(MyDate birthday) {
    this.birthday = birthday;
  }

  public abstract double earnings();

  @Override
  public String toString() {
    return "name=" + name + ", number=" + number + ", birthday=" + birthday.toDateString() + "]";
  }
}

/*
 * MyDate 类包含:private 成员变量 year,month,day；
 * toDateString()方法返回日期对应的字符串：xxxx 年 xx 月 xx 日
 */
class MyDate {
  private int year;
  private int month;
  private int day;

  public MyDate(int year, int month, int day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  public int getYear() {
    return year;
  }

  public void setYear(int year) {
    this.year = year;
  }

  public int getMonth() {
    return month;
  }

  public void setMonth(int month) {
    this.month = month;
  }

  public int getDay() {
    return day;
  }

  public void setDay(int day) {
    this.day = day;
  }

  public String toDateString() {
    return year + "年" + month + "月" + day + "日";
  }
}

/*
 * 定义 SalariedEmployee 类继承 Employee 类，实现按月计算工资的员工处理。
 * 该类包括：private 成员变量 monthlySalary；实现父类的抽象方法 earnings(),
 * 该方法返回 monthlySalary 值；
 * toString()方法输出员工类型信息及员工的 name，number,birthday。
 */
class SalariedEmployee extends Employee {
  private double monthlySalary;

  public SalariedEmployee(String name, int number, MyDate birthday) {
    super(name, number, birthday);
  }

  public SalariedEmployee(String name, int number, MyDate birthday, double monthlySalary) {
    super(name, number, birthday);
    this.monthlySalary = monthlySalary;
  }

  @Override
  public double earnings() {
    return monthlySalary;
  }

  @Override
  public String toString() {
    return "SalaryiedEmployee [" + super.toString() + "]";
  }
}

/*
 * 参照 SalariedEmployee 类定义 HourlyEmployee 类，
 * 实现按小时计算工资的员工处理。该类包括：private 成员变量 wage 和 hour；
 * 实现父类的抽象方法 earnings(),该方法返回 wage*hour 值；
 * toString()方法输出员工类型信息及员工的 name，number,birthday。
 * 
 */
class HourlyEmployee extends Employee {
  private int wage;
  private int hour;

  public HourlyEmployee(String name, int number, MyDate birthday) {
    super(name, number, birthday);
  }

  public HourlyEmployee(String name, int number, MyDate birthday, int wage, int hour) {
    super(name, number, birthday);
    this.wage = wage;
    this.hour = hour;
  }

  @Override
  public double earnings() {
    return wage * hour;
  }

  public int getWage() {
    return wage;
  }

  public void setWage(int wage) {
    this.wage = wage;
  }

  public int getHour() {
    return hour;
  }

  public void setHour(int hour) {
    this.hour = hour;
  }

  @Override
  public String toString() {
    return "HourlayEmployee [" + super.toString() + "]";
  }
}
