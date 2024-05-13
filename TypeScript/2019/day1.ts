const path: string = process.argv.includes("sample")
  ? "./inputs/sample_day1.txt"
  : "./inputs/day1.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n");

function fuelRequired(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

function part1(input: string[]) {
  let sum: number = 0;
  for (const line of input) {
    sum += fuelRequired(parseInt(line));
  }
  return sum
}
console.log(
  "What is the sum of the fuel requirements for all of the modules on your spacecraft?: " +
    part1(lines)
);
