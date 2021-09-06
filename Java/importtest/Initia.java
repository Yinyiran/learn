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
  }
}
