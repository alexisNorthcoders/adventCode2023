const fs = require('fs');


function calculateCalibration(lines) {
    let sum = 0;
  
    lines.forEach(line => {
      const firstDigit = line.match(/\d/); // Extract first digit
      const lastDigit = line.match(/\d(?=\D*$)/); // Extract last digit
  
      if (firstDigit && lastDigit) {
        const calibrationValue = parseInt(`${firstDigit}${lastDigit}`);
        sum += calibrationValue;
      }
    });
  
    return sum;
  }
  

  // Read the file content
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the file content into lines
  const lines = data.split('\n');

  // Calculate calibration value
  const result = calculateCalibration(lines);
  console.log("Total calibration value:", result); // Output the total calibration value
});