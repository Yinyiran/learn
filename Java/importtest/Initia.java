package importtest;

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
    str = new String("hello");
    it.changeStr(str);
    System.out.println("Str value is:" + str);
    it.itValue = 101f;
    it.changeObjValue(it);
    System.out.println("Current itValue is:" + it.itValue);
  }
}