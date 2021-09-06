
import java.util.*;

public class Methods {
  private int day, month, year;

  Methods() {
    day = 1;
    month = 12;
    year = 2021;
  }

  Methods(int d, int m, int y) {
    day = d;
    month = m;
    year = y;
  }

  Methods(Calendar d) {
    // day = d.day;
    // month = d.month;
    // year = d.year;
  }

  public String prinDay() {
    return (day + "/" + month + "/" + year);
  }

  public Date tomorrow() {
    Date d = new Date();
    return d;
  }
}
