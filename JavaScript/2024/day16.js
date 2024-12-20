const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day16.txt" : "./inputs/day16.txt";


async function day16() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 16 Results --- 🌟');
    console.time('Total Time');
    console.time('T1');
    console.log('📌 Part 1: ', part1(lines));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1() {

}

function part2() {

}

day16()