const { readFile } = require("fs/promises");

const path = process.argv.includes("sample")
  ? "./inputs/sample_day17.txt"
  : "./inputs/day17.txt";

async function day17() {
  const file = await readFile(path, "utf8");
  const lines = file.split("\n");

  console.log("🌟 --- Day 17 Results --- 🌟");
  console.time("Total Time");
  console.time("Parse Input");
  const { register, program } = parseText(lines);
  console.timeEnd("Parse Input");
  console.time("T1");
  console.log("📌 Part 1: ", part1({ register, program }));
  console.timeEnd("T1");
  console.time("T2");
  console.log("📌 Part 2: ", part2({ register, program }));
  console.timeEnd("T2");
  console.timeEnd("Total Time");
}

function part1({ register, program }) {
  let instructionPointer = 0;
  let output = "";

  const combo = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    get 4() {
      return register[0];
    },
    get 5() {
      return register[1];
    },
    get 6() {
      return register[2];
    },
  };
  while (true) {
    if (instructionPointer > program.length) break;
    const operand = program[instructionPointer + 1];
    switch (program[instructionPointer]) {
      case 0:
        register[0] = Math.floor(register[0] / 2 ** combo[operand]);
        break;
      case 1:
        register[1] = register[1] ^ operand;
        break;
      case 2:
        register[1] = combo[operand] % 8;
        break;
      case 3:
        register[0] === 0 ? null : (instructionPointer = operand - 2);
        break;
      case 4:
        register[1] = register[1] ^ register[2];
        break;
      case 5:
        output += (combo[operand] % 8) + ",";
        break;
      case 6:
        register[1] = Math.floor(register[0] / 2 ** combo[operand]);
        break;
      case 7:
        register[2] = Math.floor(register[0] / 2 ** combo[operand]);
        break;
    }
    instructionPointer += 2;
  }
  
  output = output.replace(/,$/, '');
  return output;
}

function part2({ register, program }) {}

day17();

function parseText(lines) {
  const register = [];

  let row = 0;

  while (lines[row] !== "") {
    register.push(Number(lines[row].match(/[0-9]+/)[0]));
    row++;
  }
  row++;
  const numbers = [...lines[row].matchAll(/[0-9]+/g)];

  const program = numbers.map(Number);

  return { register, program };
}
