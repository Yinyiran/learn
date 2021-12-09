package importtest;

public class ThreadJ {
  static LeftThread left;
  static RightThread right;

  public static void main(String[] args) {
    render();
  }

  static void render() {
    left = new LeftThread();
    right = new RightThread();
    left.start();
    right.start();
  }
}

class LeftThread extends Thread {
  public void run() {
    for (int i = 0; i < 5; i++) {
      System.out.print("LeftThread : " + i + "; ");
      System.out.println(Thread.currentThread().getName());
      ;
      try {
        sleep(500);
      } catch (InterruptedException e) {
      }
    }
  }
}

class RightThread extends Thread {
  public void run() {
    for (int i = 0; i < 5; i++) {
      System.out.print("RightThread : " + i + "; ");
      System.out.println(Thread.currentThread().getName());
      ;
      try {
        sleep(300);
      } catch (InterruptedException e) {
      }
    }
  }
}

class stack {
  int idx = 0;
  char data[] = new char[6];

  public void push(char c) {
    data[idx] = c;
    idx++;
  }

  public char pop() {
    idx--;
    return data[idx];
  }
}
