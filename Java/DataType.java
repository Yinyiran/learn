import java.util.Scanner;

public class DataType {
  public static void main(String[] args) {
    // printType();
    // getGCD();
    // getLCM();
    // analyseNum();
    logPyrimad();
  }

  static void printType() {
    char a = '中';
    System.out.println(a);
    short s = 5;
    int b = s - 2;
    System.out.println(b++ == 3);
    Scanner scan = new Scanner(System.in);
    String name = scan.next();
    System.out.println("请输入姓名");
    System.out.println(name);
    Boolean isSingle = scan.nextBoolean();
    System.out.println("是否单身？true/false");
    System.out.println(isSingle);
    scan.close();

    int score = 70;
    System.out.println(score / 60); // 精度丢失 结果为1；
  }

  // 求最大公约数
  static void getGCD() {
    Scanner scan1 = new Scanner(System.in);
    System.out.println("请输入一个正整数");
    int num1 = scan1.nextInt();
    Scanner scan2 = new Scanner(System.in);
    System.out.println("请输入一个正整数");
    int num2 = scan2.nextInt();
    int gcd;
    int samll = num1 > num2 ? num2 : num1;
    for (int i = samll; i >= 1; i--) {
      if (num1 % i == 0 && num2 % i == 0) {
        gcd = i;
        System.out.println(num1 + " 和 " + num2 + " 的最大公约数是：" + gcd);
        break;
      }
    }
    scan1.close();
    scan2.close();
  }

  // 求最小公倍数
  static void getLCM() {
    Scanner scan = new Scanner(System.in);
    System.out.println("请输入一个正整数");
    int num1 = scan.nextInt();
    System.out.println("请输入一个正整数");
    int num2 = scan.nextInt();
    int gcd;
    int big = num1 > num2 ? num1 : num2;
    for (int i = big; i <= num1 * num2; i++) {
      if (i % num1 == 0 && i % num2 == 0) {
        gcd = i;
        System.out.println(num1 + " 和 " + num2 + " 的最大公倍数是：" + gcd);
        break;
      }
    }
    scan.close();
  }

  // 给出一个不多于5位的正整数，要求：
  // 1、 求出他是几位数；
  // 2、分别输出每一位数；
  // 3、按照逆序输出各位数字，例：给出12345，输出54321

  static void analyseNum() {
    Scanner scan = new Scanner(System.in);
    System.out.println("请输入不多于五位数的正整数");
    int num = scan.nextInt();
    String numStr = String.valueOf(num);
    int numLen = numStr.length();
    if (numLen > 5) {
      System.out.println("数字不能大于五位数");
      scan.close();
      return;
    }
    System.out.println("你输入了" + numLen + "位数");
    String[] numLevel = { "个", "十", "百", "千", "万" };
    String reverseNum = "";
    for (int i = 0; i < numLen; i++) {
      char a = numStr.charAt(numLen - 1 - i);
      System.out.println("你输入的数字" + numLevel[i] + "位是" + a);
      reverseNum += a;
    }
    System.out.println("你输入的数字倒序是" + reverseNum);
    scan.close();
  }

  // 金字塔

  static void logPyrimad() {
    // int len = 10;
    // for (int i = 1; i <= len; i++) {
    // for (int j = 0; j < (2 * (len - i)) / 2; j++) {
    // System.out.print(" ");
    // }
    // for (int j = 0; j < (2 * i - 1); j++) {
    // System.out.print(" * ");
    // }
    // System.out.println();
    // }
    int len = 9;
    for (int i = 1; i <= len; i++) {
      for (int j = 1; j <= i; j++) {
        System.out.print(j + "*" + i + "=" + i * j);
        System.out.print(" ");
      }
      System.out.println();
    }
  }

}

