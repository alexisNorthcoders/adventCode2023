const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day3.txt" : "./inputs/day3.txt";


async function day3() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.time('Total Time');
    console.log('🌟 --- Day 3 Results --- 🌟');
    console.log('📌 Part 1: ', part1(lines));
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('Total Time');
}
/**
 * 
 * @param {string[]} lines 
 */
function part1(lines) {
    let result = 0
    lines.forEach(line => line.matchAll(/mul\((\d+),(\d+)\)/g).forEach((mul) => result += mul[1] * mul[2]))

    return result
}

function part2() {

}

day3()