const e = require('express');
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
function createRange(destination, source, length) {

  destination = Number(destination);
  source = Number(source);
  length = Number(length);

  const entryRange = [source, source + length - 1];
  const exitRange = [destination, destination + length - 1];
  return { entryRange, exitRange };

}


async function fertilizer(seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation) {

  let seedFinalDestination = Infinity;
  const mapsArray = [seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight,
    lightToTemperature, temperatureToHumidity, humidityToLocation];

  const [seedToSoilRanges, soilToFertilizerRanges, fertilizerToWaterRanges, waterToLightRanges, lightToTemperatureRanges, temperatureToHumidityRanges, humidityToLocationRanges] = mapsArray.map((map) => map.map((item) => createRange(...item)));

  const rangesArray = [seedToSoilRanges, soilToFertilizerRanges, fertilizerToWaterRanges, waterToLightRanges, lightToTemperatureRanges, temperatureToHumidityRanges, humidityToLocationRanges];



  for (let i = 0; i < seeds.length; i += 2) {
    console.log(seeds[i])
    for (let l = 0; l < Number(seeds[i + 1]); l++) {
      let tempCoords = Number(seeds[i]) + l;
      rangesArray.forEach((range) => {
        let rangeSwitch = true
        range.forEach((range) => {
          if (rangeSwitch && tempCoords >= range.entryRange[0] && tempCoords <= range.entryRange[1]) {
            tempCoords += range.exitRange[0] - range.entryRange[0];
            rangeSwitch = false
            }
        });
      });
      if (tempCoords < seedFinalDestination){
        seedFinalDestination = tempCoords
        console.log(seedFinalDestination)
      }
      
    }
  }
  return seedFinalDestination;
}