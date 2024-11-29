const fs = require('fs');
const path = require('path');

function createFiles(dayNumber) {
    const folderPath = path.join(__dirname, 'inputs');
 
    const txtFilenames = [`day${dayNumber}.txt`, `sample_day${dayNumber}.txt`];
    const tsFilename = `day${dayNumber}.js`;

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
const code = `const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day${dayNumber}.txt" : "./inputs/day${dayNumber}.txt";


async function day${dayNumber}() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\\n')

    console.log('🌟 --- Day ${dayNumber} Results --- 🌟');
    console.log('📌 Part 1: ', part1());
    console.log('📌 Part 2: ', part2());
}

function part1() {

}

function part2() {

}

day${dayNumber}()`

createFiles(dayNumber,code);
