const fsp = require('fs/promises');

fsp.readFile('inputday6.txt', 'utf8').then((data) => {

    const result = margin(data);
    console.log("Margin of Error:", result);


});

function margin(data) {
    const lines = data.split('\n');
    const times = lines[0].match(/\d{1,}/g);
    const distanceRecord = lines[1].match(/\d{1,}/g);

    const solutionsByRace = times.map((time,index) => {
        const numberOfSolutionsByRace = [];
        let count = 0
        for (let i = 0; i <= Number(time); i++) {
            const distance = i*(Number(time)- i)
            if (distance > distanceRecord[index])
            count++
            
        }
        numberOfSolutionsByRace.push(count)
        return numberOfSolutionsByRace
    });
    return solutionsByRace.reduce((a,b)=> a*b)
}