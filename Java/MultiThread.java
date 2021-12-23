import java.lang.Runnable;

/**
 * 基本概念：程序、进程、线程
 * 进程(process)：程序的一次执行过程，或是正在运行的一个程序。
 * 线程(thread)，进程可进一步细化为线程，是一个程序内部的一条执行路径。
 * 创建线程的场景：
 * ① 同时执行多个任务
 * ② 执行等待任务（用户输入、文件读写、网络操作、搜索等）
 * ③ 执行后台循行的程序
 */

/**
 * 测试Thread类的常用方法
 * 1.start():启动当前线程，执行当前线程的run()
 * 2.run():通常需要重写Thread类中的此方法，将创建的线程要执行的操作声明在此方法中
 * 3.currentThread(): 静态方法，返回当前代码执行的线程
 * 4.getName():获取当前线程的名字
 * 5.setName():设置当前线程的名字
 * 6.yield():释放当前CPU的执行权
 * 7.join():在线程a中调用线程b的join(),此时线程a就进入阻塞状态，直到线程b完全执行完以后，线程a才结束阻塞状态
 * 8.stop():已过时。当执行此方法时，强制结束当前线程。
 * 9.sleep(long-millitime):让当前线程“睡眠”指定时间的millitime毫秒)。在指定的millitime毫秒时间内，当前线程是阻塞状态的
 * 10.isAlive()：返回boolean，判断线程是否还活着
 * 11.getPriority()：获取线程优先等级
 * 11.setPriority()：设置线程优先等级 MAX_PRIORITY：10 MIN _PRIORITY：1 NORM_PRIORITY：5（默认）
 */

public class MultiThread {
  public static void main(String[] args) {
    // runMyThread();
    // ticketTest();
    ticketTest2();
  }

  public static void runMyThread() {
    MyThreadA ta = new MyThreadA();
    // 通过对象调用start() ① 启用当前线程，② 调用当前线程run();
    // 不能直接调用run 会报错
    ta.setName("Thread-A");
    ta.setPriority(Thread.MAX_PRIORITY);
    ta.start();

    MyThreadB tb = new MyThreadB();
    tb.setName("Thread-B");
    tb.getPriority();
    tb.start();
  }

  // 三个窗口同时卖票
  public static void ticketTest() {
    Wicket w1 = new Wicket();

    Thread t1 = new Thread(w1);
    Thread t2 = new Thread(w1);
    Thread t3 = new Thread(w1);
    t1.setName("窗口1");
    t2.setName("窗口2");
    t3.setName("窗口3");
    t1.start();
    t2.start();
    t3.start();
  }

  // 三个窗口同时卖票
  public static void ticketTest2() {
    Wicket2 w1 = new Wicket2();
    Wicket2 w2 = new Wicket2();
    Wicket2 w3 = new Wicket2();
    w1.setName("窗口1");
    w2.setName("窗口2");
    w3.setName("窗口3");
    w1.start();
    w2.start();
    w3.start();
  }

}

// 1. 创建一个继承于Thread类的子类
class MyThreadA extends Thread {
  // 重写run方法
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if (i % 2 == 0) {
        try {
          sleep(20);
        } catch (Exception e) {
          e.printStackTrace();
        }
        String threadName = Thread.currentThread().getName();
        System.out.println(threadName + i);
      }
    }
  }
}

class MyThreadB extends Thread {
  // 重写run方法
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if (i % 2 == 1) {
        String threadName = Thread.currentThread().getName();
        System.out.println(threadName + i);
      }
    }
  }
}

// 实现Runnable接口
class Wicket implements Runnable {
  private static int ticket = 100;

  // 实现类去实现Runnable中的抽象方法:run()
  @Override
  public void run() {
    while (true) {
      if (ticket > 1) {
        show();
      } else {
        break;
      }
    }
  }

  public synchronized void show() {
    try {
      Thread.sleep(100);
    } catch (Exception e) {
      e.printStackTrace();
    }
    System.out.println(Thread.currentThread().getName() + ": 卖票，票号为：" + ticket);
    ticket--;
  }
}
 
// 方法2
class Wicket2 extends Thread {
  private static int ticket = 100;

  @Override
  public void run() {
    while (true) {
      if (ticket > 1) {
        show();
      } else {
        break;
      }
    }
  }

  public static synchronized void show() {
    try {
      Thread.sleep(100);
    } catch (Exception e) {
      e.printStackTrace();
    }
    System.out.println(Thread.currentThread().getName() + ": 卖票，票号为：" + ticket);
    ticket--;
  }
}
