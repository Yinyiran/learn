package importtest;

public class Constructor {
  public String name;
  public int age;
  public double score;

  public Constructor(String s, int n) {
    name = s;
    age = n;
  }

  public Constructor() {
    name = "aaa";
  }

  public Constructor(double s) {
    score = s;
  }

  public String getConInfo() {
    return name + score + age;
  }

}

