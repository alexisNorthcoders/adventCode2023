const fs = require('fs');
const path = require('path');

function createFiles(dayNumber) {
    const folderPath = path.join(__dirname, 'inputs');
 
    const txtFilenames = [`day${dayNumber}.txt`, `sample_day${dayNumber}.txt`];
    const tsFilename = `day${dayNumber}.ts`;

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
const code = `const path: string = process.argv.includes("sample") ? "./inputs/sample_day${dayNumber}.txt" : "./inputs/day${dayNumber}.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\\n")`

createFiles(dayNumber,code);
