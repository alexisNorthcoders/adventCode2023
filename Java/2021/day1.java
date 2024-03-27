import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class day1 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day1.txt";
        } else {
            filename = "./inputs/day1.txt";
        }

        int counter = countMeasurements(filename);
        System.out.println("How many measurements are larger than the previous measurement? " + counter);

        counter = countLargerSums(filename, 3);
        System.out.println("How many sums are larger than the previous sum? " + counter);
    }

    public static int countMeasurements(String filename) {
        int counter = 0;
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            String previousLine = bufferedReader.readLine();
            if (previousLine == null) {
                System.out.println("File is empty.");
                bufferedReader.close();
                return 0;

            }

            String currentLine;

            while ((currentLine = bufferedReader.readLine()) != null) {
                int previousValue = Integer.parseInt(previousLine);
                int currentValue = Integer.parseInt(currentLine);

                if (currentValue > previousValue) {
                    counter++;
                }

                previousLine = currentLine;
            }
            bufferedReader.close();
            fileReader.close();
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.err.println("Invalid input in the file: " + e.getMessage());
        }
        return counter;
    }

    public static int countLargerSums(String filename, int windowSize) {
        int counter = 0;
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            String[] window = new String[windowSize];
            int sum = 0;

            // Initialize the first window
            for (int i = 0; i < windowSize; i++) {
                String line = bufferedReader.readLine();
                window[i] = line;
                sum += Integer.parseInt(window[i]);
            }

            int prevSum = sum;

            String nextLine;
            while ((nextLine = bufferedReader.readLine()) != null) {
                int nextNum = Integer.parseInt(nextLine);
                sum = sum - Integer.parseInt(window[0]) + nextNum;
                if (sum > prevSum) {
                    counter++;
                }
                prevSum = sum;

                // Shift the window
                for (int i = 0; i < windowSize - 1; i++) {
                    window[i] = window[i + 1];
                }
                window[windowSize - 1] = nextLine;
            }

            bufferedReader.close();
            fileReader.close();
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.err.println("Invalid input in the file: " + e.getMessage());
        }
        return counter;
    }
}
