import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import  java.util.stream.IntStream;

public class day7 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day7.txt"; 
        } else {
            filename = "./inputs/day7.txt"; 
        }
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            String[] submarinePositions = bufferedReader.readLine().split(",");
            bufferedReader.close();

            int result1 = part1(submarinePositions);
            System.out.println("How much fuel must they spend to align to that position? "+ result1);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static int part1(String[] submarinePositions){
        
        int max = Integer.parseInt(submarinePositions[0]);
        int min = Integer.parseInt(submarinePositions[0]);

        for (int i = 1; i < submarinePositions.length; i++) {
            int num = Integer.parseInt(submarinePositions[i]);
           
            if (num > max) {
                max = num;
            }
       
            if (num < min) {
                min = num;
            }
        }
        ArrayList<Integer> fuelSpent = new ArrayList<Integer>();
        for (int j=min;j<max;j++){
            int totalFuel = 0;
        for (int i=0;i<submarinePositions.length;i++){
            totalFuel += Math.abs(Integer.parseInt(submarinePositions[i])-j);
        }
        fuelSpent.add(totalFuel);
    }
    int minimumFuel = fuelSpent.get(0);

   
    for (int i = 1; i < fuelSpent.size(); i++) {
        int num = fuelSpent.get(i);
       
        if (num < minimumFuel) {
            minimumFuel = num;
        }
    }
    return minimumFuel;
}
}