class Exceptions {
  public static void main(String[] args) {

  }

  public Exceptions() {
  };

  public Exceptions(String i, String j) {

  }
}

class EcDef extends Exception {
  static final long serialVersionID = -19596822534558L;

  public EcDef() {
  };

  public EcDef(String msg) {
    System.out.println(msg);
  }
}
