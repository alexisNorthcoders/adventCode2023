const fs = require('fs');

function calculatePossibleOutcomes(lines){
    const regex = /([0-9]{1,}) (blue)|([0-9]{1,}) (red)|([0-9]{1,}) (green)/g
    let validSets = []
    lines.forEach((line,index) => {
        const sets = line.split(";")
        let green = []
        let blue = []
        let red = []
        sets.forEach((set) => {
            const matched = set.matchAll(regex)
             for (const match of matched) {
                const clear = match.filter((a) => (a !== undefined))
                console.log(clear,index)
              
                if (clear[2]==="green") {green.push(clear[1])}
                if (clear[2]==="red") {red.push(clear[1])}
                if (clear[2]==="blue") {blue.push(clear[1])}
                                  
            }
        })
              
        let maxGreen = Math.max(...green)
        let maxBlue = Math.max(...blue)
        let maxRed = Math.max(...red)
        validSets.push(maxBlue*maxGreen*maxRed)
    })
    return validSets.reduce((a,b) => a + b)
}

fs.readFile('inputday2.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const lines = data.split('\n');
    const result = calculatePossibleOutcomes(lines);
    console.log("Sum of IDs:", result);
});