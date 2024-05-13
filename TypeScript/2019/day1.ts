const path: string = process.argv.includes("sample")
  ? "./inputs/sample_day1.txt"
  : "./inputs/day1.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n");

console.log(
  "What is the sum of the fuel requirements for all of the modules on your spacecraft?: " +
    part1(lines)
);
console.log(
  "What is the sum of the fuel requirements for all of the modules on your spacecraft when also taking into account the mass of the added fuel?: " +
    part2(lines)
);

function fuelRequired(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

function part1(input: string[]) {
  let sum: number = 0;
  for (const line of input) {
    sum += fuelRequired(parseInt(line));
  }
  return sum;
}

function part2(input: string[]) {
  let sum: number = 0;
  for (const line of input) {
    let fuelMass = fuelRequired(parseInt(line));
    sum += fuelMass;

    while (fuelRequired(fuelMass)> 0) {
      const tempFuel = fuelRequired(fuelMass);
      sum += tempFuel;
      fuelMass = tempFuel
    }
  }
  return sum;
}
