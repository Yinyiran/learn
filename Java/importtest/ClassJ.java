package importtest;

public class ClassJ {
  public Employee e = new Employee();

  public void print() {
    System.out.println("classj");
  }

  public void getLog(String lala) {
    System.out.println("lala");
  }
}

class Employee extends ClassJ {
  public ClassJ c = new ClassJ();

  public void print() {
    System.out.println("employee");
  }

  public void getLog() {
    System.out.println(" getLog");
  }
}

abstract class Employe22e {
  abstract void push();

  public void getLog() {
    System.out.println(" getLog");
  }
}
