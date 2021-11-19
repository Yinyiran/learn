import java.lang.constant.DirectMethodHandleDesc.Kind;

public class OPP {
  public static void main(String[] args) {
    // newPerson();
    // methodArgument();
    // fibonacci(10);
    String[] arr = new String[4];
    for (int i = 0; i < arr.length; i++) {
      System.out.println("----" + arr[i] + "****");
    }
    System.out.println("*****************");
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

}

class Person {
  int age;
  private int age2;

  String shout() {
    String name = "awefawefw";
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

  void manOrWoman() {
    String sexStr = sex == 1 ? "man" : "woman";
    System.out.println(sexStr);
  }

  void employeed() {
    String employ = salary > 0 ? "job" : "no job";
    System.out.println(employ);
  }
}

class Kids extends ManKind {
  int yearsOld;

  // Kids(int sex, int salary) {
  // }

  void printAge() {
    System.out.println(yearsOld);
  }
}

class KidsTest {
  public static void main(String[] args) {
    Kids someKid = new Kids();
    System.out.println(someKid.sex);
    System.out.println(someKid.salary);
  }
}