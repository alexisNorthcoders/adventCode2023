const fsp = require('fs/promises');

fsp.readFile('inputday6.txt', 'utf8').then((data) => {
    //parse data
    const lines = data.split('\n');
    const time = lines[0].match(/\d{1,}/g).join("");
    const distanceRecord = lines[1].match(/\d{1,}/g).join("")
    // change between solution with bruteForce or quadraticSolution
    const result = bruteForce(time,distanceRecord);
    console.log("Number of ways to beat he record:", result);
});
function bruteForce(time,distanceRecord) {
    
    let count = 0;
    for (let i = 0; i <= time; i++) {
        const distance = i * (time - i);
        if (distance > distanceRecord) {
            count++;
        }
    }
    return count;
}
function quadraticSolution(time,distanceRecord) {
    
    const {rootA,rootB} = solveQuadratic(-1,time,-distanceRecord)
    const min = Math.floor(rootA+1)
    const max = Math.ceil(rootB-1)
    
    return max-min+1;
}
function solveQuadratic(a, b, c) {
    let rootA = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    let rootB = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    return {rootA, rootB};
}