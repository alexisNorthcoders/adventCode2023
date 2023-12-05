const fs = require('fs');

function calculatePossibleOutcomes(lines){
    const regex = /([0-9]{1,}) (blue)|([0-9]{1,}) (red)|([0-9]{1,}) (green)/g
    let validSets = []
    lines.forEach((line,index) => {
        const sets = line.split(";")
        let booleanSet = true
        sets.forEach((set) => {
            const matched = set.matchAll(regex)
             for (const match of matched) {
                const clear = match.filter((a) => (a !== undefined))
                console.log(clear,index)
                let green = 0
                let blue = 0
                let red = 0
                if (clear[2]==="green") {green = clear[1]}
                if (clear[2]==="red") {red = clear[1]}
                if (clear[2]==="blue") {blue = clear[1]}
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