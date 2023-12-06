const fs = require('fs');
fs.readFile('inputday4.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const lines = data.split('\n');
    const result = scratchCards(lines);
    console.log("Total scratch points:", result); 
});

function scratchCards(lines){
    let total = []
 lines.forEach(line => {
    let card = line.match(/\s*([\d\s]+)\s*\|\s*([\d\s]+)/)
    let winningNumbers = card[1].split(" ").filter(number => number.length)
    let yourNumbers = card[2].split(" ").filter(number => number.length)
    let uniqueWinning = [...new Set(winningNumbers)]
    let uniqueNumbers = [...new Set(yourNumbers)]
    let points = 0
    let counter = 0
    for (let i=0;i<uniqueNumbers.length;i++) {
        if (uniqueWinning.includes(uniqueNumbers[i])){
         points= 2**counter
         counter++
         }}
    total.push(points)
})

return total.reduce((a,b) => a+ b,0)
}

