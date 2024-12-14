const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day13.txt" : "./inputs/day13.txt";


async function day13() {

    const file = await readFile(path, 'utf8')

    console.log('🌟 --- Day 13 Results --- 🌟');
    console.time('Total Time');
    console.time('Parse Input');
    const machines = parse(file)
    console.timeEnd('Parse Input');
    console.time('T1');
    console.log('📌 Part 1: ', part1(machines));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(machines));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(machines) {

    let cost = 0

    results = machines.map((machines) => solveSystemEquations(...machines))

    results.forEach(result => {
        if (Number.isInteger(result.A) && Number.isInteger(result.B)) {
            cost += result.A * 3 + result.B
        }
    })

    return cost
}

function part2(machines) {

    let cost = 0

    machines.forEach((machine) => {
        machine[4] += 10000000000000
        machine[5] += 10000000000000
    })

    results = machines.map((machines) => solveSystemEquations(...machines))

    results.forEach(result => {
        if (Number.isInteger(result.A) && Number.isInteger(result.B)) {
            cost += result.A * 3 + result.B
        }
    })

    return cost
}

day13()

function parse(input) {
    // only get the numbers for each machine
    const machines = input.split("\n\n").map(machine => Array.from(machine.matchAll(/\d+/g), match => Number(match[0])));

    return machines
}

function solveSystemEquations(a1, a2, b1, b2, c1, c2) {

    const determinant = a1 * b2 - a2 * b1;

    const determinantA = c1 * b2 - c2 * b1;
    const determinantB = a1 * c2 - a2 * c1;

    const A = determinantA / determinant;
    const B = determinantB / determinant;

    return { A, B };
}