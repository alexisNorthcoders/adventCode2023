const fs = require('fs');

function sumOfPartNumbers(lines){
    const regex = /[*]/g
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
const adjacentNumbers =[]
for (let i=0;i<numberCoords.length;i++){
    for (let j=0;j<symbolCoords.length;j++){
        if (checkAdjacent(numberCoords[i],symbolCoords[j])) { adjacentNumbers.push({number:numberCoords[i] , symbol: symbolCoords[j] }) 
        }}
    }

const groupedBySymbol = adjacentNumbers.reduce((grouped, item) => {
    const symbolXY = `${item.symbol.x}x ${item.symbol.y}y`;
        if (!grouped[symbolXY]) {
          grouped[symbolXY] = [];
        }
        grouped[symbolXY].push(Number(item.number.number)); 
        return grouped;
      }, {});
      
const multipliedNumbers = Object.values(groupedBySymbol)
        .filter(adjacents => adjacents.length === 2) 
        .map(adjacents => adjacents.reduce((a, b) => a * b, 1)); 
      
  

return multipliedNumbers.reduce((a,b) => a+b,0)

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
    console.log("Sum of Powers:", result);
});