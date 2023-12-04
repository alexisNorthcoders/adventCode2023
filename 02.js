const fs = require('fs');

function calculateCalibration(lines) {
    let sum = 0;
const numbers = [ "zero", "one","two","three","four", "five","six","seven", "eight", "nine"]
lines.forEach(line => {
let firstDigit = line.match(/one|two|three|four|five|six|seven|eight|nine|\d/)[0]
let lastDigit = [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)].slice(-1)[0][1]
if (isNaN(lastDigit)) lastDigit = numbers.indexOf(lastDigit)
if (isNaN(firstDigit)) firstDigit = numbers.indexOf(firstDigit)

if (firstDigit && lastDigit) {
    
    const fullNumber = firstDigit.toString() +lastDigit.toString()
    
    sum += +fullNumber
  }
});

return sum;
}



 
  fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
  
 
    const lines = data.split('\n');
  
    const result = calculateCalibration(lines);
    console.log("Total calibration value:", result);
  });