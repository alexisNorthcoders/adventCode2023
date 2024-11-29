const fs = require('fs');
fs.readFile('../input/inputday4.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const lines = data.split('\n');
    const result = scratchCards(lines);
    console.log("Total scratch points:", result); 
});
function scratchCards(lines){
    const scratchCards = []
    for (let i = 0; i < lines.length; i++) {
        scratchCards[i]= 1
    }
    lines.forEach((line,index) => {
        let counter = 0
        let card = line.match(/\s*([\d\s]+)\s*\|\s*([\d\s]+)/)
        let winningNumbers = card[1].trim().split(" ").filter(number => number.length)
        let yourNumbers = card[2].trim().split(" ").filter(number => number.length)
        let uniqueWinning = [...new Set(winningNumbers)]
        let uniqueNumbers = [...new Set(yourNumbers)]
        for (let i=0;i<uniqueNumbers.length;i++) {
            if (uniqueWinning.includes(uniqueNumbers[i])){
                counter++
            }
        }
        for (let i=0;i<counter;i++){
            scratchCards[index+i+1] += scratchCards[index]
        }
    })
    return scratchCards.reduce((a,b)=> a+b)
}

