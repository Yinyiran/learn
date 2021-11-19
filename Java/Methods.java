
import java.util.*;

public class Methods {
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

  static void fibonacci(int count) {
    int[] arr = new int[count];
    fibRecursion(arr);
  }

  static void fibRecursion(int[] arr) {
    if (arr[arr.length - 1] != 0) {
      fibRecursion(arr);
    } else {
      System.out.println(arr.toString());
    }
  }

}
