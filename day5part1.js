const fs = require('fs');
fs.readFile('inputday5.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const result = fertilizer(data);
    console.log("Total scratch points:", result); 
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
    
    function mapTo(array) {
        const mapToObj = {}
        for (let i = 0; i < array.length; i++) {
            let destination = +array[i][0]
            let source = +array[i][1]
            let length = +array[i][2]
            let counter = 0
            for (let j = source; j < source+length; j++) {
                mapToObj[source+counter]=destination+counter
                counter++
            }
        }
        return mapToObj
    }
const seedToSoilObj = mapTo(seedToSoil)
const soilToFertilizerObj = mapTo(soilToFertilizer)
const fertilizerToWaterObj = mapTo(fertilizerToWater)
const waterToLightObj = mapTo(waterToLight)
const lightToTemperatureObj = mapTo(lightToTemperature)
const temperatureToHumidityObj = mapTo(temperatureToHumidity)
const humidityToLocationObj = mapTo(humidityToLocation)

const allMapsArray = [seedToSoilObj,soilToFertilizerObj,fertilizerToWaterObj,waterToLightObj,
    lightToTemperatureObj,temperatureToHumidityObj,humidityToLocationObj]
const seedFinalDestination = []

for (let i = 0; i < seeds.length; i++) {
    let tempCoords=seeds[i]
    for (let j = 0; j < allMapsArray.length; j++) {
        tempCoords = (allMapsArray[j][tempCoords]) ? allMapsArray[j][tempCoords] : tempCoords
        
    }
    seedFinalDestination.push(tempCoords)
    
}
console.log(seedFinalDestination)
}