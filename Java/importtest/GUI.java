package importtest;

import javax.swing.*;

public class GUI {
  public static void main(String[] args) {
    JFrame frame = new JFrame("JFrame Demo");
    JButton button = new JButton("Press me");
    frame.getContentPane().add(button, "");
    frame.pack();
    frame.setVisible(true);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
  }
}
