const fs = require('fs');
const fsp = require('fs/promises')
fs.readFile('inputday5.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const result = fertilizer(data);
    console.log("Lowest Location:", result); 
});

async function fertilizer(lines){
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
    

    let seedFinalDestination = Infinity
    const mapsArray = [seedToSoil, soilToFertilizer, fertilizerToWater,waterToLight,
        lightToTemperature,temperatureToHumidity,humidityToLocation]
        const fileName = "resultsday5.txt"     
   await fsp.writeFile(fileName,"", (err) => {
    if (err) console.log(err);
   
  })
      
    for (let i = 0; i < seeds.length; i+=2) {
       const date =String(new Date()) + "\n"
       const seed =String(seeds[i]) + "\n"
       
      await fsp.appendFile(fileName, date, (err) => {
        if (err) console.log(err);
       
      });
      await fsp.appendFile(fileName, seed, (err) => { 
            if (err) { 
              console.log(err); 
            }  
          })
        for (let l=0;l<Number(seeds[i+1]);l++){
            let tempCoords = Number(seeds[i])+l
        
        for (let j = 0; j < mapsArray.length; j++) {
            for (let k = 0; k< mapsArray[j].length;k++){
                let subArray = mapsArray[j][k]
                if (tempCoords >= Number(subArray[1]) && tempCoords <= Number(subArray[1])+Number(subArray[2]))  { 
                    tempCoords = Number(subArray[0]) - Number(subArray[1]) + tempCoords
                    k = mapsArray[j].length
                 }
               }
           }

           if (tempCoords < seedFinalDestination) { 
            console.log(tempCoords)
           await fsp.appendFile("resultsday5.txt", JSON.stringify("Lowest location: "+tempCoords,"\n"), (err) => { 
                if (err) { 
                  console.log(err)}})
            seedFinalDestination = tempCoords }
        
    }}
    
    console.log(new Date())
    return seedFinalDestination
}