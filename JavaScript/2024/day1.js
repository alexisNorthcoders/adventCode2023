const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day1.txt" : "./inputs/day1.txt";


async function day1() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 1 Results --- 🌟');
    console.log('📌 Part 1: ', part1());
    console.log('📌 Part 2: ', part2());
}

function part1() {

}

function part2() {

}

day1()