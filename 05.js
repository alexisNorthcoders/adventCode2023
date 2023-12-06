const fs = require('fs');

function sumOfPartNumbers(lines){
    const regex = /[^a-zA-Z0-9.]/g
    const regexNumbers = /(\d+)/g
const symbolCoords = []
const numberCoords = []
lines.forEach((line,index) => {
    const matchNumbers = line.matchAll(regexNumbers)
    for (const numbers of matchNumbers) {
        numberCoords.push({ number:numbers[0],xi:numbers.index,xf:numbers.index+numbers[0].length-1,y:index})
}
    for (let i=0;i<line.length;i++){
        if (regex.test(line[i])) symbolCoords.push({x: i,y:index})
    }
} )

const adjacentNumbers = numberCoords.filter(number => symbolCoords.some(symbol => checkAdjacent(number,symbol)))

return adjacentNumbers.reduce((acc, item) => acc + parseInt(item.number),0)

}

function checkAdjacent(number,symbol){
    if (((Math.abs(number.xi-symbol.x) === 1)||(Math.abs(symbol.x-number.xf) === 1)) && (number.y === symbol.y)) return true
    for (let i=0;(number.xi+i)<=number.xf;i++){

     if ((Math.abs(number.xi+i-symbol.x) <= 1) && (Math.abs(number.y-symbol.y) === 1)) return true
    }
    return false
}

fs.readFile('inputday3.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const lines = data.split('\n');
    const result = sumOfPartNumbers(lines);
    console.log("Sum of IDs:", result);
});