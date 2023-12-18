const fs = require('fs');
fs.readFile('inputday5.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const result = fertilizer(data);
    console.log("Lowest Location:", result); 
});

function fertilizer(lines){
    //parsing data into variables
    const splitting = lines.split("map:")
    const parsedText = splitting.map(text => text.trim().split("\n") )
    const seeds = parsedText[0][0].split(" ").slice(1)
    const seedToSoil = parsedText[1].slice(0,-2).map(element => element.split(" "))
    const soilToFertilizer = parsedText[2].slice(0,-2).map(element => element.split(" "))
    const fertilizerToWater = parsedText[3].slice(0,-2).map(element => element.split(" "))
    const waterToLight = parsedText[4].slice(0,-2).map(element => element.split(" "))
    const lightToTemperature = parsedText[5].slice(0,-2).map(element => element.split(" "))
    const temperatureToHumidity = parsedText[6].slice(0,-2).map(element => element.split(" "))
    const humidityToLocation = parsedText[7].map(element => element.split(" "))

    const seedFinalDestination = [] 
    const mapsArray = [seedToSoil, soilToFertilizer, fertilizerToWater,waterToLight,
        lightToTemperature,temperatureToHumidity,humidityToLocation]

    for (let i = 0; i < seeds.length; i++) {
        let tempCoords = Number(seeds[i])
        for (let j = 0; j < mapsArray.length; j++) {
            for (let k = 0; k< mapsArray[j].length;k++){
                let subArray = mapsArray[j][k]
                if (tempCoords >= Number(subArray[1]) && tempCoords <= Number(subArray[1])+Number(subArray[2]))  { 
                    tempCoords = Number(subArray[0]) - Number(subArray[1]) + tempCoords
                    k = mapsArray[j].length
                 }
               }
           }
        seedFinalDestination.push(tempCoords)
    }
    seedFinalDestination.sort((a, b) => a - b)
    return seedFinalDestination[0]
}