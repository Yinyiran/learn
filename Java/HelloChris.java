import pack.PackOne;
import java.util.Date;

// class zz extends PackOne {

// }

// class yy extends pack2.PackOne {

// }

public class HelloChris {
  private String name;

  /**
   * main
   * 
   * @param args any
   */
  public static void main(String[] args) {
    basicType();
    Date d = new Date();
    System.out.println(d.getTime());
    customer();
  }

  private static void basicType() {
    System.out.println("Hello World");// hello world
    System.out.print("print");
    int age;
    age = 30;
    System.out.println(age);
    byte b = 127;
    double dot = 123.22 + b;
    float dot1 = 123;
    double f = dot + dot1;
    System.out.println(f);
    String str = "a";
    String str1 = str + dot1;
    System.out.println(str1);
    System.out.println('a' + 1);
  }

  public static void customer() {
    HelloChris helloChris = new HelloChris();
    {
      String name = "A-Chrisgader";
      helloChris.name = name;
      System.out.println("The helloChris's name:" + helloChris.name);
    }
    String name = "JSon Pierpo";
    helloChris.name = name;
    System.out.println(helloChris.name);
  }

}