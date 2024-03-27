import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class day1 {
    public static void main(String[] args) {
        String filename = "./inputs/day1.txt"; // Replace "example.txt" with your file path
        int counter = 0;
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            
            String previousLine = bufferedReader.readLine();
            String currentLine;
            
            
            while ((currentLine = bufferedReader.readLine()) != null) {
                // Compare currentLine with previousLine
                int previousValue = Integer.parseInt(previousLine);
                int currentValue = Integer.parseInt(currentLine);
                
                if (currentValue > previousValue) {
                    counter++;
                }
                
                previousLine = currentLine; // Update previousLine to currentLine
            }
            System.out.println(counter);
            bufferedReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}