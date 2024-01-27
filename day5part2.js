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
function sortByEntryRange(range) {
  range.sort((a, b) => a.entryRange[0] - b.entryRange[0]);
}

async function fertilizer(seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation) {

  let seedFinalDestination = Infinity;
  const mapsArray = [seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight,
    lightToTemperature, temperatureToHumidity, humidityToLocation];

  const [seedToSoilRanges, soilToFertilizerRanges, fertilizerToWaterRanges, waterToLightRanges, lightToTemperatureRanges, temperatureToHumidityRanges, humidityToLocationRanges] = mapsArray.map((map) => map.map((item) => createRange(...item)));

const rangesArray = [seedToSoilRanges, soilToFertilizerRanges, fertilizerToWaterRanges, waterToLightRanges, lightToTemperatureRanges, temperatureToHumidityRanges, humidityToLocationRanges];

  rangesArray.forEach((range) => sortByEntryRange(range));



  for (let i = 0; i < seeds.length; i += 2) {
    for (let l = 0; l < Number(seeds[i + 1]); l++) {
      let tempCoords = Number(seeds[i]) + l;
      rangesArray.forEach((range) => {
        let rangeSwitch = true;
        range.forEach((range) => {
          if (rangeSwitch && tempCoords >= range.entryRange[0] && tempCoords <= range.entryRange[1]) {
            tempCoords += range.exitRange[0] - range.entryRange[0];
            rangeSwitch = false;
          }
        });
      });
      if (tempCoords < seedFinalDestination) {
        seedFinalDestination = tempCoords;
      }
    }
  }
  return seedFinalDestination;
}


function splitRanges(RangeA, RangeB) {
  let RangeC = [];
  let start = RangeA[0].exitRange[0];
  let end = RangeA[0].exitRange[1];

  for (let i = 0; i < RangeB.length; i++) {
    let currentRange = RangeB[i].entryRange;
    if (start < currentRange[0]) {
      RangeC.push({ exitRange: [start, currentRange[0] - 1] });
    }
    RangeC.push({ exitRange: currentRange });
    start = currentRange[1] + 1;
  }
  if (start <= end) {
    RangeC.push({ exitRange: [start, end] });
  }
  return RangeC;
}
const rangeA = [{ entryRange: [0, 0], exitRange: [79, 92] }];
const rangeB = [
  { entryRange: [50, 77], exitRange: [52, 79] },
  { entryRange: [98, 99], exitRange: [50, 51] },
];
console.log(splitRanges(rangeA, rangeB));
// TO DO FIX ENTRYRANGE!!!


