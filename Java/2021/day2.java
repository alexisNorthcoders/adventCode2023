import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class day2 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day2.txt";
        } else {
            filename = "./inputs/day2.txt";
        }
        int result = calculateProduct(filename);
        System.out.println(
                "What do you get if you multiply your final horizontal position by your final depth? " + result);
    }

    public static int calculateProduct(String filename) {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            int depth = 0;
            int horizontal = 0;
            String line;
            while ((line = br.readLine()) != null) {
                String[] instructions = line.split(" ");
                switch (instructions[0]) {
                    case "forward":
                        horizontal += Integer.parseInt(instructions[1]);
                        break;
                    case "up":
                        depth -= Integer.parseInt(instructions[1]);
                        break;
                    case "down":
                        depth += Integer.parseInt(instructions[1]);
                        break;
                }

            }
            return depth * horizontal;

        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return 0;
        }
    }
}