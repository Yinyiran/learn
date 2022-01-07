package importtest;

import java.util.Date;
import java.util.Vector;

class Point {
  public int x, y;

  Point(int x1, int y1) {
    x = x1;
    y = y1;
  };

  Point() {
    x = 0;
    y = 0;
  };

  public void moveTo(int x1, int y1) {
    x = x1;
    y = y1;
  }
}

public class Initia {

  public static void main(String[] args) {
    Point p = new Point(1, 2);
    p.x = 50;
    System.out.println("p.x = " + p.x + "; " + " p.y = " + p.y);
    p.moveTo(20, 20);
    System.out.println("p.x = " + p.x + "; " + " p.y = " + p.y);
    testVal();
  }

  private float itValue;

  public void changeInt(int value) {
    value = 55;
  }

  public void changeStr(String value) {
    value = new String("diffrent");
  }

  public void changeObjValue(Initia ref) {
    ref.itValue = 99f;
  }

  public static void testVal() {
    String str;
    int val;
    Initia it = new Initia();
    val = 11;
    it.changeInt(val);
    System.out.println("Int value is:" + val);
    str = new String("c");
    it.changeStr(str);
    System.out.println("Str value is:" + str);
    it.itValue = 101f;
    it.changeObjValue(it);
    System.out.println("Current itValue is:" + it.itValue);

    StringObj.handleStr();
    ArrayT.initArr();
    ArrayT.test3(4);
  }
}

class Course {
  static String name = "qrqr3wrqew";
  static Date time;
  static String teacher;
  static int duration;

  static String getCourseName() {
    return name;
  }

  static String getCourseTeacher() {
    return teacher;
  }
}

class ArrayT {
  static int perimater;
  static String strArr[] = { "anmalew", "fawef", "afwef", "afwef1", "afwef2", "afwef3", "afwef4" };
  static int int1[] = { 2, 3, 4, 5, 6, 7, 8 };
  static int int2[] = { 113, 234, 34, 534, 523, 645, 622, 3456 };

  static void doubleArr() {
    int iarr[] = new int[4];
    iarr[0] = 0;
    iarr[1] = 234;
    System.out.println(iarr[1]);

    int i2[][] = new int[3][2]; // 二维数组
    i2[0] = new int[2];
    i2[1] = new int[2];
    i2[2] = new int[2];
    i2[0][0] = 1;
    i2[0][1] = 2;
  }

  static void initArr() {
    System.arraycopy(int1, 0, int2, 1, 4);
    System.out.println(int2);
    char charArr[] = { 'a', 'b', 'c', 'd', 'e', 'f' };
    String sc = new String(charArr, 2, 4);
    System.out.println(sc);
    System.out.println("Java".indexOf('a'));
    System.out.println("JavaHelloWord!".substring(1, 3));
    String s1 = "XYZ";
    String s2 = "XYZ";
    String s3 = new String("XYZ");
    System.out.println("s1==s2:" + (s1 == s2) + "\ns1==s3:" + (s1 == s3));
  }

  static void test3(int n) {
    int k, i, j, a[][] = new int[n][n];
    k = 1;
    for (i = 0; i < n; i++) {
      if (i % 2 == 0) {
        for (j = 0; j < i; j++)
          a[i][j] = k++;
        for (j = i - 1; j >= 0; j--)
          a[j][i] = k++;
      } else {
        for (j = 0; j < i; j++)
          a[j][i] = k++;
        for (j = i - 1; j >= 0; j--)
          a[i][j] = k++;
      }
    }
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        // System.out.println();
      }
    }
    System.out.println(a);
  }

  // 向量
  static void initVector() {
    Vector<String> MyVector = new Vector<String>(100, 50); // 可变数目数组 创建MyVector向量初始有100个空间的字符串容量，空间用后50递增；
    MyVector.addElement("e");
  }
}

class Site {
  int x, y;

  Site(int x1, int y1) {
    x = x1;
    y = y1;
  }

  Site() {
    this(0, 0);
  }
}

class StringObj {
  static String str1 = "afwef";
  static String str2 = "afwef";

  static void handleStr() {
    System.out.println(str1);
    System.out.println(str1.compareTo(str1));
    System.out.println(str1.compareToIgnoreCase(str1));
  }
}
