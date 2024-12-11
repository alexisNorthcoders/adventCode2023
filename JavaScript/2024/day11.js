const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day11.txt" : "./inputs/day11.txt";


async function day11() {

    const file = await readFile(path, 'utf8')

    console.log('🌟 --- Day 11 Results --- 🌟');
    console.time('Total Time');
    console.time('Parse Input');
    const input = parseData(file)
    console.timeEnd('Parse Input');
    console.time('T1');
    console.log('📌 Part 1: ', part1(input));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(input));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(input) {

    return countStones(input, 25)
}

function part2() {

}

day11()

function parseData(input) {
    return input.split(' ').map(Number)
}

/**
 * 
 * @param {Number[]} stones 
 * @param {Number} counter 
 * @param {Number} limit 
 * @returns 
 */
function countStones(stones, blinks, counter = 0, n = stones.length) {

    if (counter >= blinks) {
        return n;
    }
    counter++;
    let newStones = [];

    for (let i = 0; i < stones.length; i++) {
        if (stones[i] === 0) {
            newStones.push(1);

        } else if (stones[i].toString().length % 2 === 0) {
            const stoneString = stones[i].toString();
            const firstPart = Number(stoneString.substring(0, stoneString.length / 2));
            const secondPart = Number(stoneString.substring(stoneString.length / 2));
            newStones.push(firstPart, secondPart);
            n += 1;
        } else {
            newStones.push(stones[i] * 2024);
        }
    }
    return countStones(newStones, blinks, counter, n);
}
