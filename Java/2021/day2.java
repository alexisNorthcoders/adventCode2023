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
        int result1 = part1(filename);
        System.out.println(
                "What do you get if you multiply your final horizontal position by your final depth? " + result1);
        int result2 = part2(filename);
        System.out.println(
                "What do you get if you multiply your final horizontal position by your final depth? " + result2);
    }

    public static int part1(String filename) {
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

    public static int part2(String filename) {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            int depth = 0;
            int horizontal = 0;
            int aim = 0;
            String line;
            while ((line = br.readLine()) != null) {
                String[] instructions = line.split(" ");
                String move = instructions[0];
                int x = Integer.parseInt(instructions[1]);
                switch (move) {
                    case "forward":
                        horizontal += x;
                        depth += aim * x;
                        break;
                    case "up":
                        aim -= x;
                        break;
                    case "down":
                        aim += x;
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