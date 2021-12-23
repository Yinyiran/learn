/**
 * Thread类的常用方法
 * 1. start() 启动当前线程，执行当前线程的run();
 * 2. run() 通常需要重写Thread类中的此方法，将创建的线程和要执行的操作声明在此方法中
 * 3. currentThread() 静态方法，返回当前代码执行的线程
 * 4. getName() 获取当前线程的名字
 * 5. setName() 设置当前线程的名字
 * 6. yield() 释放但钱CPU的执行权
 * 7. join() 在A线程中调用B线程的join() ，此时A线程进入阻塞状态，直到B线程完全执行完成之后，结束阻塞状态
 * 8. stop() 已经过时，强制结束当前线程
 * 9. sleep(millitime) 阻塞前线程多长时间（millitime毫秒）
 * 10 isAlive() 判断当前线程是否激活状态
 */

package importtest;

public class ThreadJ {
  static LeftThread left;
  static RightThread right;

  public static void main(String[] args) {
    // render();
    join();
  }

  static void render() {
    left = new LeftThread();
    right = new RightThread();
    left.start();
    right.start();
  }

  static void join() {
    LeftThread l = new LeftThread();
    l.start();
    for (int i = 0; i < 100; i++) {
      System.out.print(i + "-");
      if (i == 90) {
        try {
          l.join(); // 等待l线程执行完成才会继续 print 90以后的数字
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    }
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
