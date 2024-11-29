const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day1.txt" : "./inputs/day1.txt";


async function day1() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')
    console.time('Total Time');
    console.log('🌟 --- Day 1 Results --- 🌟');
    console.log('📌 Part 1: ', part1(lines));
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('Total Time');
}

function part1(input) {
    let result = 0
    return result
}

function part2(input) {
    let result = 0
    return result
}

day1()