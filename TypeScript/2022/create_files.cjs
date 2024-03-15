const fs = require('fs');
const path = require('path');

function createFiles(dayNumber) {
    const folderPath = path.join(__dirname, 'inputs');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const txtFilenames = [`day${dayNumber}.txt`, `sample_day${dayNumber}.txt`];
    const tsFilename = `day${dayNumber}.ts`;

    txtFilenames.forEach(filename => {
        const filePath = path.join(folderPath, filename);
        fs.writeFileSync(filePath, '');
        console.log(`File created: ${filePath}`);
    });

    const tsFilePath = path.join(__dirname, tsFilename);
    fs.writeFileSync(tsFilePath, '');
    console.log(`File created: ${tsFilePath}`);
}

const dayNumber = process.argv[2];
createFiles(dayNumber);
