import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

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
        int result2 = part2(filename);
        System.out.println(
                "What do you get if you multiply your final horizontal position by your final depth? " + result2);
    }

    public static int part1(String filename) {

        String gamma = "";
        String epsilon = "";

        List<String> numberList = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                numberList.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        int lineLength = numberList.get(0).length();

        for (int i = 0; i < lineLength; i++) {
            char mostCommon = getMostCommon(numberList, i);
            gamma += mostCommon;
            epsilon += mostCommon == '0' ? '1' : '0';
        }

        int gammaDecimal = Integer.parseInt(gamma, 2);
        int epsilonDecimal = Integer.parseInt(epsilon, 2);
        return gammaDecimal * epsilonDecimal;
    }

    public static int part2(String filename) {

        List<String> remainingNumbers = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;

            while ((line = br.readLine()) != null) {

                remainingNumbers.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        int lineLength = remainingNumbers.get(0).length();

        // find oxygen rating
        char mostCommon;
        List<String> oxygenList = new ArrayList<>(remainingNumbers);
        for (int i = 0; i < lineLength; i++) {
            if (oxygenList.size() == 1) {
                break;
            }
            mostCommon = getMostCommon(oxygenList, i);
            Iterator<String> iterator = oxygenList.iterator();

            while (iterator.hasNext()) {
                String line = iterator.next();

                if (line.charAt(i) != mostCommon) {
                    iterator.remove();
                }
                if (oxygenList.size() == 1) {
                    break;
                }
            }
        }
        String oxygen = oxygenList.get(0);
        int oxygenDecimal = Integer.parseInt(oxygen, 2);

        // find CO2 rating
        char leastCommon;
        List<String> co2List = new ArrayList<>(remainingNumbers);
        for (int i = 0; i < lineLength; i++) {
            if (co2List.size() == 1) {
                break;
            }
            leastCommon = getMostCommon(co2List, i);
            leastCommon = leastCommon == '0' ? '1' : '0';
            Iterator<String> iterator = co2List.iterator();

            while (iterator.hasNext()) {
                String line = iterator.next();

                if (line.charAt(i) != leastCommon) {
                    iterator.remove();
                }
                if (co2List.size() == 1) {
                    break;
                }
            }
        }
        String co2 = co2List.get(0);
        int c02Decimal = Integer.parseInt(co2, 2);
        return oxygenDecimal * c02Decimal;
    }

    public static char getMostCommon(List<String> numberList, int index) {
        Iterator<String> iterator = numberList.iterator();
        int counter = 0;
        int numberListSize = numberList.size();
        char mostCommon = '0';
        while (iterator.hasNext()) {
            String line = iterator.next();
            if (line.charAt(index) == '0') {
                counter++;
            }
        }
        if (counter > numberListSize / 2) {
            mostCommon = '0';
        } else {
            mostCommon = '1';
        }
        return mostCommon;
    }
}
