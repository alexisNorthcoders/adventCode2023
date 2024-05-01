import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class day4 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day4.txt"; 
        } else {
            filename = "./inputs/day4.txt"; 
        }
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                
                System.out.println(line);
            }
            
            bufferedReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}