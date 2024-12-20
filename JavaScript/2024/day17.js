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
  return runProgram({ register, program });
}

function part2({ register, program }) {
  let res = 0; 
  register[0] = res;
  
  for (let len = program.length - 1; len >= 0; len--) {

    res *= 8;
    const target = program.slice(len).join(",");

    while (true) {

      const output = runProgram({ register, program });

     
      if (output === target) {
        break; 
      }

      res++;
      register[0] = res;
    }

    register[0] = res;
  }

  return res; 
};

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

function runProgram({ register, program }) {
  register = register.slice();
  program = program.slice();

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
        // use bitwise AND instead of modulo 8, otherwise it wont work for big numbers needed for part 2
        output += (combo[operand] & 7) + ",";
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

  output = output.replace(/,$/, "");
  return output;
}
