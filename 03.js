const fs = require('fs');

function calculatePossibleOutcomes(lines){
    const regex = /(\d+) (red|blue|green)/g
    let validSets = []
    lines.forEach((line,index) => {
        const sets = line.split(";")
        let booleanSet = true
        sets.forEach((set) => {
            const sets = set.matchAll(regex)
             for (const cubes of sets) {
                let green = 0
                let blue = 0
                let red = 0
                if (cubes[2]==="green") {green = cubes[1]}
                if (cubes[2]==="red") {red = cubes[1]}
                if (cubes[2]==="blue") {blue = cubes[1]}
                if ( green > 13 || red > 12 || blue > 14) {                
                    booleanSet = false }                          
            }
        })
              
        if (booleanSet && !validSets.includes(index+1)) validSets.push(index+1)
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