import java.lang.Runnable;
import java.util.concurrent.locks.ReentrantLock;

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
    // ticketTest2();
    lockTicketTest();
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

  public static void lockTicketTest() {
    LockTicket t = new LockTicket();
    Thread t1 = new Thread(t);
    Thread t2 = new Thread(t);
    Thread t3 = new Thread(t);
    t1.setName("窗口1");
    t2.setName("窗口2");
    t3.setName("窗口3");
    t1.start();
    t2.start();
    t3.start();
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

// 线程死锁
class ThA {
  public synchronized void foo(ThB b) {
    System.out.println("当前线程名称" + Thread.currentThread().getName() + "进入了A实例的foo方法");
    try {
      Thread.sleep(200);
    } catch (Exception e) {
      e.printStackTrace();
    }
    System.out.println("当前线程名称" + Thread.currentThread().getName() + "企图调用B实例的last方法");
    b.last();
  }

  public synchronized void last() {
    System.out.println("进入了A类的last方法内部");
  }
}

class ThB {
  public synchronized void bar(ThA a) {
    System.out.println("当前线程名称" + Thread.currentThread().getName() + "进入了B实例的bar方法");
    try {
      Thread.sleep(200);
    } catch (Exception e) {
      e.printStackTrace();
    }
    System.out.println("当前线程名称" + Thread.currentThread().getName() + "企图调用A实例的last方法");
    a.last();
  }

  public synchronized void last() {
    System.out.println("进入了B类的last方法内部");
  }

}

class DeadLock implements Runnable {
  ThA a = new ThA();
  ThB b = new ThB();

  public void init() {
    Thread.currentThread().setName("-主线程-");
    a.foo(b);
    System.out.println("进入了主线程之后");
  }

  public void run() {
    Thread.currentThread().setName("副线程");
    b.bar(a);
    System.out.println("进入副线程之后");
  }

  public static void main(String[] args) {
    DeadLock dl = new DeadLock();
    new Thread(dl).start();
    dl.init();
  }
}

// 解决线程安全问题方式 三：Lock
/**
 * 1. 面试题：synchronized 与 Lock的异同？
 * 相同：二者都可以解决线程安全问题
 * 不同：synchronized机制在执行完相应的同步代码以后，自动的释放同步监视器
 * Lock需要手动的启动同步（lock()），同时结束同步也需要手动的实现（unlock()）
 * 2. 优先使用顺序：
 * Lock 同步代码块（已经进入了方法体，分配了相应资源）同步方法（在方法体之外）
 */
class LockTicket implements Runnable {
  private int ticket = 100;
  private ReentrantLock lock = new ReentrantLock();

  @Override
  public void run() {
    while (true) {
      try {
        lock.lock();
        if (ticket > 0) {
          try {
            Thread.sleep(100);

          } catch (Exception e) {
            e.printStackTrace();
          }
          System.out.println(Thread.currentThread().getName() + "售票，票号为：" + ticket);
          ticket--;
        } else {
          break;
        }
      } finally {
        lock.unlock();
      }
    }
  }
}

/**
 * 线程通信的例子：使用两个线程打印1-100。线程1, 线程2 交替打印
 *
 * 涉及到的三个方法：
 * wait():一旦执行此方法，当前线程就进入阻塞状态，并释放同步监视器。
 * notify():一旦执行此方法，就会唤醒被wait的一个线程。如果有多个线程被wait，就唤醒优先级高的那个。
 * notifyAll():一旦执行此方法，就会唤醒所有被wait的线程。
 *
 * 说明：
 * 1.wait()，notify()，notifyAll()三个方法必须使用在同步代码块或同步方法中。
 * 2.wait()，notify()，notifyAll()三个方法的调用者必须是同步代码块或同步方法中的同步监视器。
 * 否则，会出现IllegalMonitorStateException异常
 * 3.wait()，notify()，notifyAll()三个方法是定义在java.lang.Object类中。
 */

/*
 * 线程通信的应用：经典例题：生产者/消费者问题
 *
 * 生产者(Productor)将产品交给店员(Clerk)，而消费者(Customer)从店员处取走产品，
 * 店员一次只能持有固定数量的产品(比如:20），如果生产者试图生产更多的产品，
 * 店员会叫生产者停一下，如果店中有空位放产品了再通知生产者继续生产；
 * 如果店中没有产品了，店员会告诉消费者等一下，
 * 如果店中有产品了再通知消费者来取走产品。
 *
 * 分析：
 * 1.是否是多线程的问题？是，生产者的线程，消费者的线程
 * 2.是否有共享数据的问题？是，店员、产品、产品数
 * 3.如何解决线程的安全问题？同步机制，有三种方法
 * 4.是否涉及线程的通信？是
 */

class Clerk {
  private int productCount = 0;

  // 生产产品
  public synchronized void produceProduct() {
    if (productCount < 20) {
      productCount++;
      System.out.println(Thread.currentThread().getName() + ", 开始生产第" + productCount + "个产品");
      notify();
    } else {
      try {
        wait();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  // 消费产品
  public synchronized void consumeProduct() {
    if (productCount > 0) {
      System.out.println(Thread.currentThread().getName() + ", 消费第" + productCount + "个产品");
      productCount--;
      notify();
    } else {
      try {
        wait();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }
}

// 生产
class Producer extends Thread {
  private Clerk clerk;

  public Producer(Clerk clerk) {
    this.clerk = clerk;
  }

  @Override
  public void run() {
    System.out.println(getName() + ", 开始生产产品 ......");
    while (true) {
      try {
        Thread.sleep(10);
      } catch (Exception e) {
        e.printStackTrace();
      }
      clerk.produceProduct();
    }
  }
}
