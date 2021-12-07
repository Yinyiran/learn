
import java.util.*;

public class Methods {
  public static void main(String[] args) {
    fibonacci();
  }

  private int day, month, year;

  Methods() {
    day = 1;
    month = 12;
    year = 2021;
  }

  Methods(int d, int m, int y) {
    day = d;
    month = m;
    year = y;
  }

  Methods(Calendar d) {
    // day = d.day;
    // month = d.month;
    // year = d.year;
  }

  public String prinDay() {
    return (day + "/" + month + "/" + year);
  }

  public Date tomorrow() {
    Date d = new Date();
    return d;
  }

  static void methodArgument() {
    DataSwap dt = new DataSwap();
    dt.a = 1;
    dt.b = 2;
    System.out.println("a:" + dt.a + ", b:" + dt.b);
    refArgument(dt);
  }

  static void refArgument(DataSwap ds) {
    int temp = ds.a;
    ds.a = ds.b;
    ds.b = temp;
    System.out.println("a:" + ds.a + ", b:" + ds.b);
  }

  static void fibonacci() {
    int value = fibRecursion(10);
    System.out.println(value);
  }

  static int fibRecursion(int n) {
    if (n == 1 || n == 2) {
      return 1;
    } else {
      return fibRecursion(n - 1) + fibRecursion(n - 2);
    }
  }

}

class DataSwap {
  public int a;
  public int b;
}