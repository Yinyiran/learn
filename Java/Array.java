import java.util.Scanner;
import java.util.Arrays;

public class Array {

  Array() {
  }

  public static void main(String[] args) {
    // arrDefaultValue();
    // arrayTest();
    // getStuAvScore();
    // multiArr();
    // binarySearch();
    // arrMethods();
    // arrayEver();
    // getUniqueNum();
    circleRound();
  }

  public static void arrDefaultValue() {
    int[] arr = new int[3];
    // arr[0] = 1;
    // arr[1] = 2;
    // arr[2] = 3;
    System.out.println(arr[0]); // 默认是0

    String names[] = { "张三", "李四", "王五" };
    System.out.println(names[1]);
  }

  public static void arrayTest() {
    int[] arr = new int[] { 5, 0, 1, 6, 9, 2, 3 };
    int[] indexs = new int[] { 2, 0, 3, 4, 5, 6, 4, 1, 6, 6, 4 };
    String tel = "";
    for (int i = 0; i < indexs.length; i++) {
      tel += arr[indexs[i]];
    }
    System.out.println(tel);
  }

  // 输入学生人数，分数，求平均和最高分，分数等级
  public static void getStuAvScore() {
    Scanner scan = new Scanner(System.in);
    System.out.println("请输入学生人数");
    int stuNum = scan.nextInt();
    int[] numArr = new int[stuNum];
    String[] levelArr = new String[stuNum];
    int max = 0;
    for (int i = 0; i < stuNum; i++) {
      System.out.println("请输入第 " + (i + 1) + " 个学生的成绩，共" + stuNum + "个学生");
      int num = scan.nextInt();
      if (max < num) {
        max = num;
      }
      numArr[i] = num;
    }
    for (int i = 0; i < numArr.length; i++) {
      int num = numArr[i];
      if (num > max - 10) {
        levelArr[i] = "A";
      } else if (num > max - 20) {
        levelArr[i] = "B";
      } else if (num > max - 30) {
        levelArr[i] = "C";
      } else {
        levelArr[i] = "D";
      }
      System.out.println("student " + i + "score is " + numArr[i] + " grade is " + levelArr[i]);
    }
    System.out.println("最高分是" + max);
    scan.close();
  }

  public static void multiArr() {
    int[][] mArr = new int[3][2];
    System.out.println(mArr[1]);
    int[][] mArr2 = new int[3][];
    System.out.println(mArr2[1]);
    int[][] mArr3 = new int[][] { { 3, 4, 54 }, { 2134, 56450 }, { 12, 4, 5, 6 } };
    System.out.println(mArr3[2].length);
  }

  public static void arrMethods() {
    int arr[] = new int[] { 1, 2, 43, 54, 56, 6, 7, 7 };
    int arr2[] = new int[] { 1, 2, 43, 54, 56, 6, 65, 6, 7, 9 };
    System.out.println(Arrays.toString(arr));
    Arrays.sort(arr2);
    System.out.println(Arrays.toString(arr2));
    System.out.println(Arrays.binarySearch(arr2, 56)); // 二分法查找给定值，
    System.out.println(Arrays.equals(arr, arr2));
  }

  // 杨辉三角
  public static void arrayEver() {
    int[][] arr = new int[20][];
    for (int i = 0; i < arr.length; i++) {
      arr[i] = new int[i + 1]; // 第一行有 1 个元素, 第 n 行有 n 个元素
      arr[i][0] = arr[i][i] = 1; // 每一行的第一个元素和最后一个元素都是 1
      for (int j = 1; j < arr[i].length - 1; j++) {
        arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
      }
    }
    for (int i = 1; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
      }
      System.out.println();
    }
  }

  // 创建一个长度为 10 的 int 型数组，要求取值为 1-15，同时元素值各不相同
  public static void getUniqueNum() {
    int cycleCount = 0;
    int[] unique = new int[10];
    for (int i = 0; i < unique.length; i++) {
      unique[i] = (int) (Math.random() * 15) + 1;
      for (int j = 0; j < i; j++) {
        if (unique[i] == unique[j]) {
          i--; // i回退1次，多进行一次循环
          break;
        }
      }
      System.out.print(unique[i] + " ");
      cycleCount++;
    }
    System.out.println("循环了 " + cycleCount + "次");
    for (int i = 0; i < unique.length; i++) {
      System.out.print(unique[i] + " ");
    }
  }

  // 输入一个数字，打印出回旋数字
  public static void circleRound() {
    Scanner scanner = new Scanner(System.in);
    System.out.println("输入一个数字:");
    int len = scanner.nextInt();
    int[][] arr = new int[len][len];
    int s = len * len;
    /*
     * k = 1:向右 k = 2:向下 k = 3:向左 k = 4:向上
     */
    int k = 1;
    int i = 0, j = 0;
    for (int m = 1; m <= s; m++) {
      if (k == 1) {
        if (j < len && arr[i][j] == 0) {
          arr[i][j++] = m;
        } else {
          k = 2;
          i++;
          j--;
          m--;
        }
      } else if (k == 2) {
        if (i < len && arr[i][j] == 0) {
          arr[i++][j] = m;
        } else {
          k = 3;
          i--;
          j--;
          m--;
        }
      } else if (k == 3) {
        if (j >= 0 && arr[i][j] == 0) {
          arr[i][j--] = m;
        } else {
          k = 4;
          i--;
          j++;
          m--;
        }
      } else if (k == 4) {
        if (i >= 0 && arr[i][j] == 0) {
          arr[i--][j] = m;
        } else {
          k = 1;
          i++;
          j++;
          m--;
        }
      }
    }
    // 遍历
    for (int m = 0; m < arr.length; m++) {
      for (int n = 0; n < arr[m].length; n++) {
        System.out.print(arr[m][n] + "\t");
      }
      System.out.println();
    }
    scanner.close();
  }

  // 反转数组
  public int[] reversalArr(int[] arr) {
    for (int i = 0; i < arr.length / 2; i++) {
      int temp = arr[i];
      int revIndex = arr.length - i - 1;
      arr[i] = arr[revIndex];
      arr[revIndex] = temp;
    }
    for (int i = 0, j = arr.length - 1; i < j; i++, j--) {
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  // 二分法查找；
  public static void binarySearch() {
    int[] arr = new int[] { -54, -2, 0, 2, 33, 43, 256, 999 };
    boolean isFlag = true;
    int number = 256;
    int head = 0; // 首索引位置
    int end = arr.length - 1; // 尾索引位置
    while (head <= end) {
      int middle = (head + end) / 2;
      if (arr[middle] == number) {
        System.out.println("找到指定的元素，索引为：" + middle);
        isFlag = false;
        break;
      } else if (arr[middle] > number) {
        end = middle - 1;
      } else { // arr[middle] < number
        head = middle + 1;
      }
    }
    if (isFlag) {
      System.out.println("未找到指定的元素");
    }
  }

  // 冒泡排序
  public static void bubbleSort() {
    int[] arr = new int[] { 43, 54, 32, 44, 67, 89, -42, -62 };
    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }

  // 快速排序

  public static void quickSort() {
    int[] data = { 9, -16, 30, 23, -30, -49, 25, 21, 30 };
    System.out.println("排序之前：\n" + java.util.Arrays.toString(data));
    subSort(data, 0, data.length - 1);
    System.out.println("排序之后：\n" + java.util.Arrays.toString(data));
  }

  private static void swap(int[] data, int i, int j) {
    int temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }

  private static void subSort(int[] data, int start, int end) {
    if (start < end) {
      int base = data[start];
      int low = start;
      int high = end + 1;
      while (true) {
        while (low < end && data[++low] - base <= 0)
          ;
        while (high > start && data[--high] - base >= 0)
          ;
        if (low < high) {
          swap(data, low, high);
        } else {
          break;
        }
      }
      swap(data, start, high);

      subSort(data, start, high - 1);// 递归调用
      subSort(data, high + 1, end);
    }
  }
}
