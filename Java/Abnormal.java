import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.File;
import java.io.FileInputStream;
import java.util.Scanner;

/**
 * 异常处理机制 1:
 * try-catch-finally
 */
public class Abnormal {
  public static void main(String[] args) {
    // ArithmeticException();
    // InputMismatchException();
    throwError();
  }

  public static void ArithmeticException() {
    try {
      System.out.println(10 / 0); // java.lang.ArithmeticException: / by zero
    } catch (Exception e) {
      System.out.println(e.getMessage());
      e.printStackTrace();
    } finally {
      System.out.println("finally");
    }
  }

  public static void InputMismatchException() {
    try {
      Scanner scanner = new Scanner(System.in);
      int score = scanner.nextInt();
      System.out.println(score);
      scanner.close();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      e.printStackTrace();
    }
  }

  public static void throwError() {
    try {
      ExceptionClass.method2();
    } catch (IOException e) {
      System.out.println("throwError");
      e.printStackTrace();
    }
  }
}

/**
 * 异常处理机制 2:
 * throws
 * 1. "throws + 异常类型"写在方法的声明处。指明此方法执行时，可能会抛出的异常类型。
 * 一旦当方法体执行时，出现异常，仍会在异常代码处生成一个异常类的对象，此对象满足throws后异常
 * 类型时，就会被抛出。异常代码后续的代码，就不再执行！
 *
 * 关于异常对象的产生:
 * ① 系统自动生成的异常对象
 * ② 手动生成一个异常对象，并抛出(throw)
 */

class ExceptionClass {
  public void method2() throws IOException {
    method1();
  }

  public void method1() throws FileNotFoundException, IOException {
    File file = new File("java8.test");
    FileInputStream fis = new FileInputStream(file);
    int data = fis.read();
    while (data != -1) {
      System.out.print((char) data);
      data = fis.read();
    }
    fis.close();
    System.out.println("haha");
  }
  // 手动扔出错误
  public void handleThrowError() {
    throw new RuntimeException("您输入的数据非法");
  }
}

// 重写方法抛出异常
class SubExceptClass extends ExceptionClass {
  @Override
  public void method1() throws FileNotFoundException, IOException {
    System.out.println("SubExceptClass method1");
  }
}

/*
 * 3. 开发中如何选择使用try-catch-finally 还是使用throws？
 * 3.1 如果父类中被重写的方法没有throws方式处理异常，则子类重写的方法也不能使用throws，意味着如果
 * 子类重写的方法中有异常，必须使用try-catch-finally方式处理。
 * 3.2 执行的方法a中，先后又调用了另外的几个方法，这几个方法是递进关系执行的。我们建议这几个方法使用throws
 * 的方式进行处理。而执行的方法a可以考虑使用try-catch-finally方式进行处理。
 */