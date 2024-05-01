import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class day3 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day3.txt";
        } else {
            filename = "./inputs/day3.txt";
        }
        int result1 = part1(filename);
        System.out.println(
                "What do you get if you multiply your final horizontal position by your final depth? " + result1);
    }

    public static int part1(String filename) {
        int[] sums = null;
        int lineCounter = 0;
        String gamma = "";
        String epsilon = "";

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                lineCounter++;
                if (lineCounter == 1) {
                    sums = new int[line.length()];
                }
                for (int i = 0; i < line.length(); i++) {

                    if (line.charAt(i) == '0') {
                        sums[i]++;
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        for (int i = 0; i < sums.length; i++) {
           
            if (sums[i] < lineCounter/2) {
               gamma += 0;
               epsilon += 1;
            }
            else {
                gamma += 1;
                epsilon += 0;
            }
        }
      
        int gammaDecimal = Integer.parseInt(gamma, 2);
        int epsilonDecimal = Integer.parseInt(epsilon, 2);
        return gammaDecimal*epsilonDecimal;
    }
}
