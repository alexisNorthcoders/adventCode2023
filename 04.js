const fs = require('fs');

function calculatePossibleOutcomes(lines){
    const regex = /(\d+) (red|blue|green)/g
    let validSets = []
    lines.forEach((line) => {
        const games = line.split(";")
        let green = []
        let blue = []
        let red = []
        games.forEach((set) => {
            const sets = set.matchAll(regex)
             for (const cubes of sets) {
                if (cubes[2]==="green") {green.push(cubes[1])}
                if (cubes[2]==="red") {red.push(cubes[1])}
                if (cubes[2]==="blue") {blue.push(cubes[1])}
                                  
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