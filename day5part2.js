const fs = require('fs');
const fsp = require('fs/promises');
fsp.readFile('inputday5.txt', 'utf8').then((data) => {

  //parsing data into variables
  const parsedText = data.split("map:").map(text => text.trim().split("\n"));

  const parsedData = {
    seeds: parsedText[0][0].split(" ").slice(1),
    seedToSoil: parsedText[1].slice(0, -2).map(element => element.split(" ")),
    soilToFertilizer: parsedText[2].slice(0, -2).map(element => element.split(" ")),
    fertilizerToWater: parsedText[3].slice(0, -2).map(element => element.split(" ")),
    waterToLight: parsedText[4].slice(0, -2).map(element => element.split(" ")),
    lightToTemperature: parsedText[5].slice(0, -2).map(element => element.split(" ")),
    temperatureToHumidity: parsedText[6].slice(0, -2).map(element => element.split(" ")),
    humidityToLocation: parsedText[7].map(element => element.split(" "))
  };

  fertilizer(...Object.values(parsedData))
    .then((result) => console.log("Lowest Location:", result));

});

async function fertilizer(seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation) {

  let seedFinalDestination = Infinity;
  const mapsArray = [seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight,
    lightToTemperature, temperatureToHumidity, humidityToLocation];

  for (let i = 0; i < seeds.length; i += 2) {

    for (let l = 0; l < Number(seeds[i + 1]); l++) {
      let tempCoords = Number(seeds[i]) + l;

      for (let j = 0; j < mapsArray.length; j++) {
        for (let k = 0; k < mapsArray[j].length; k++) {
          let subArray = mapsArray[j][k];
          if (tempCoords >= Number(subArray[1]) && tempCoords <= Number(subArray[1]) + Number(subArray[2])) {
            tempCoords = Number(subArray[0]) - Number(subArray[1]) + tempCoords;
            k = mapsArray[j].length;
          }
        }
      }
      if (tempCoords < seedFinalDestination) {
        seedFinalDestination = tempCoords;
      }
    }
  }
  return seedFinalDestination;
}