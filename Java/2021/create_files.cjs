const fs = require('fs');
const path = require('path');

function createFiles(dayNumber) {
    const folderPath = path.join(__dirname, 'inputs');
 
    const txtFilenames = [`day${dayNumber}.txt`, `sample_day${dayNumber}.txt`];
    const tsFilename = `day${dayNumber}.java`;

    txtFilenames.forEach(filename => {
        const filePath = path.join(folderPath, filename);
        fs.writeFileSync(filePath, '');
        console.log(`File created: ${filePath}`);
    });

    const tsFilePath = path.join(__dirname, tsFilename);
    fs.writeFileSync(tsFilePath, code);
    console.log(`File created: ${tsFilePath}`);
}

const dayNumber = process.argv[2];
const code = `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class day${dayNumber} {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day${dayNumber}.txt"; 
        } else {
            filename = "./inputs/day${dayNumber}.txt"; 
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
}`

createFiles(dayNumber,code);
