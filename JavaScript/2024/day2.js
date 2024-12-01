const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day2.txt" : "./inputs/day2.txt";


async function day2() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.time('Total Time');
    console.log('🌟 --- Day 2 Results --- 🌟');
    console.log('📌 Part 1: ', part1(lines));
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('Total Time');
}

function part1() {

}

function part2() {

}

day2()