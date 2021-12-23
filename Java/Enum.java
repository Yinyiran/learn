/**
 * 一、枚举类的使用
 * 1.枚举类的理解：类的对象只有有限个，确定的。我们称此类为枚举类。
 * 2.当需要定义一组常量时，强烈建议使用枚举类
 * 3.若枚举只有一个对象, 则可以作为一种单例模式的实现方式。
 *
 * 二、如何定义枚举类
 * 方式一：JDK1.5之前需要自定义枚举类
 * 方式二：JDK 1.5 新增的enum 关键字用于定义枚举类
 *
 */
class Enum {
  public static void main(String[] args) {
    classEnumTest();
  }

  public static void classEnumTest() {
    Season s = new Season();
    System.out.println(s.toString());
    System.out.println(Season.SPRING);
  }
}

class Season {
  private final String seasonName;
  private final String seasonDesc;

  public Season() {
    this.seasonName = "seasonName";
    this.seasonDesc = "seasonDesc";
  }

  // 私有化类的构造器，并给对象属性赋值
  private Season(String seasonName, String seasonDesc) {
    this.seasonName = seasonName;
    this.seasonDesc = seasonDesc;
  }

  // 提供当前枚举对象的多个对象
  public static final Season SPRING = new Season("春天", "万物复苏");
  public static final Season SUMMER = new Season("夏天", "烈日炎炎");
  public static final Season AUTUMN = new Season("秋天", "金秋送爽");
  public static final Season WINTER = new Season("冬天", "白雪皑皑");

  // 获取枚举类的属性
  public String getSeasonName() {
    return seasonName;
  }

  @Override
  public String toString() {
    return "Season{" + "seasonName='" + seasonName + "'" + ", seasonDesc='" + seasonDesc + "'}";
  }

}

/**
 * 使用enum定义的枚举类默认继承了java.lang.Enum类，因此不能再继承其他类
 * 枚举类的构造器只能使用private 权限修饰符
 * 枚举类的所有实例必须在枚举类中显式列出(, 分隔; 结尾)。列出的实例系统会自动添加public static final 修饰
 * 必须在枚举类的第一行声明枚举类对象
 */

enum SeasonT {
  // 1.提供当前枚举类的对象，多个对象之间用“,”隔开，末尾对象用";" 结束；
  SPRING("春天", "万物复苏"),
  SUMMER("夏天", "烈日炎炎"),
  AUTUMN("秋天", "金秋送爽"),
  WINTER("冬天", "白雪皑皑");

  private final String SeasonName;
  private final String SeasonDesc;

  private SeasonT(String SeasonName, String SeasonDesc) {
    this.SeasonName = SeasonName;
    this.SeasonDesc = SeasonDesc;
  }

  public String getSeasonDesc() {
    return SeasonDesc;
  }

  public String getSeasonName() {
    return SeasonName;
  }

}
