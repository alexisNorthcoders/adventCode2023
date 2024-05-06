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
            for (String value : initialState) {
                Lanternfish lanternfish = new Lanternfish(Integer.parseInt(value));
                lanternfishList.add(lanternfish);
            }

            int result1 = part1(lanternfishList);
            System.out.println("How many lanternfish would there be after 80 days? " + result1);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static int part1(ArrayList<Lanternfish> lanternfishList) {
        int n = 80;
        int i = 0;

        while (i < n) {
            for (int j = 0; j < lanternfishList.size(); j++) {
                if (lanternfishList.get(j).timer == 0) {
                    lanternfishList.add(new Lanternfish(9));
                }
                lanternfishList.get(j).update();
            }
            i++;
        }
        return lanternfishList.size();
    }

    static class Lanternfish {
        int timer;

        public Lanternfish(int x) {
            timer = x;
        }

        public void update() {
            if (timer == 0) {
                timer = 6;
            } else {
                timer--;
            }
        }
    }
}