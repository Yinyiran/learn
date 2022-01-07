package importtest;

import java.io.*;

public class IO {
  public static void main(String[] args) {
    // out();
    // in();
    file();
  }

  static void file() {
    File myFile = new File("./"                                                                                                                                                                                                                        );
    String name = myFile.getName();
    System.out.println(name);
    String path = myFile.getAbsolutePath();
    System.out.println(path);
    long modifyTime = myFile.lastModified();
    System.out.println(modifyTime);
    Boolean isExist = myFile.exists();
    System.out.println(isExist);
  }

  /**
   * 写入文件
   */
  static void out() {
    try {
      FileOutputStream out = new FileOutputStream("myFile.dat");
      out.write('H');
      out.write(69);
      out.write(76);
      out.write('L');
      out.write('O');
      out.write('!');
      out.close();
    } catch (FileNotFoundException e) {
      System.out.println("Error: Cannot open file for writing");
    } catch (IOException e) {
      System.out.println("Error: Cannot write to file");
    }
  }

  /**
   * 读取文件
   */
  static void in() {
    try {
      FileInputStream in = new FileInputStream("myFile.dat");
      while (in.available() > 0)
        System.out.println(in.read() + " ");
      in.close();
    } catch (FileNotFoundException e) {
      System.out.println("Error: Cannot open file reading.");
    } catch (EOFException e) {
      System.out.println("Error: EOF encounted, file may be currupted");
    } catch (IOException e) {
      System.out.println("Error: Cannot read from file");
    }
  }
}
