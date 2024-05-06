import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class day6 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day6.txt";
        } else {
            filename = "./inputs/day6.txt";
        }
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            String[] initialState = bufferedReader.readLine().split(",");

            bufferedReader.close();
            ArrayList<Lanternfish> lanternfishList = new ArrayList<>();
            for (int i = 0; i <= 9; i++) {
                Lanternfish lanternfish = new Lanternfish(i);
                lanternfishList.add(lanternfish);
            }
            for (String value : initialState) {
                int index = Integer.parseInt(value);
                lanternfishList.get(index).population++;
            }
            if (args.length > 0 && args[0].equals("part1")) {
                long result1 = part1(lanternfishList, 80);
                System.out.println("How many lanternfish would there be after 80 days? " + result1);
            } else if (args.length > 0 && args[0].equals("part2")) {
                long result2 = part1(lanternfishList, 256);
                System.out.println("How many lanternfish would there be after 256 days? " + result2);
            }

        } catch (

        IOException e) {
            e.printStackTrace();
        }

    }

    public static long part1(ArrayList<Lanternfish> lanternfishList, int n) {
        int i = 0;

        while (i <= n) {
            long tempZeroPop = lanternfishList.get(0).population;

            lanternfishList.get(0).population = lanternfishList.get(1).population;
            lanternfishList.get(1).population = lanternfishList.get(2).population;
            lanternfishList.get(2).population = lanternfishList.get(3).population;
            lanternfishList.get(3).population = lanternfishList.get(4).population;
            lanternfishList.get(4).population = lanternfishList.get(5).population;
            lanternfishList.get(5).population = lanternfishList.get(6).population;
            lanternfishList.get(6).population = lanternfishList.get(7).population;
            lanternfishList.get(7).population = lanternfishList.get(8).population;

            lanternfishList.get(6).population += tempZeroPop;
            lanternfishList.get(8).population = tempZeroPop;

            i++;
        }
        long totalPopulation = 0;
        for (int j = 0; j < 8; j++) {
            totalPopulation += lanternfishList.get(j).population;

        }
        return totalPopulation;
    }

    static class Lanternfish {
        int timer;
        long population;

        public Lanternfish(int x) {
            timer = x;
            population = 0;
        }

    }
}