import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class day8 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day8.txt";
        } else {
            filename = "./inputs/day8.txt";
        }
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            String line;
            ArrayList<String[]> puzzleInput = new ArrayList<>();
            while ((line = bufferedReader.readLine()) != null) {
                puzzleInput.add(line.split(" "));
            }

            bufferedReader.close();
            int result1 = part1(puzzleInput);
            System.out.println("In the output values, how many times do digits 1, 4, 7, or 8 appear? " + result1);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static int part1(ArrayList<String[]> input) {
        int sum = 0;
        for (int i = 0; i < input.size(); i++) {
            for (int j = 11; j <= 14; j++) {
                if (input.get(i)[j].length() == 2 || input.get(i)[j].length() == 3 || input.get(i)[j].length() == 4
                        || input.get(i)[j].length() == 7) {
                    sum++;
                }
            }
        }
        return sum;
    }
}