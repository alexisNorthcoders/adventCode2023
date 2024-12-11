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

    return recursiveCountStones(input, 25)
}

function part2(input) {

    return recursiveCountStones(input, 75)
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
function countStones(stones, blinks, counter = 0) {
    // Map to store counts
    let stoneMap = new Map();

    for (let stone of stones) {
        // if Map already has the stone, add 1 more
        stoneMap.set(stone, (stoneMap.get(stone) || 0) + 1);
    }

    while (counter < blinks) {
        counter++;
        let newStoneMap = new Map();

        for (let [stone, count] of stoneMap.entries()) {
            if (stone === 0) {
                // when stone is 0 add 1 to stone 1
                newStoneMap.set(1, (newStoneMap.get(1) || 0) + count);
            } else if (stone.toString().length % 2 === 0) {
                // split stone
                const stoneString = stone.toString();
                const firstPart = Number(stoneString.substring(0, stoneString.length / 2));
                const secondPart = Number(stoneString.substring(stoneString.length / 2));

                // add each stone counts
                newStoneMap.set(firstPart, (newStoneMap.get(firstPart) || 0) + count);
                newStoneMap.set(secondPart, (newStoneMap.get(secondPart) || 0) + count);
            } else {
                // multiply and add the count
                const newStone = stone * 2024;
                newStoneMap.set(newStone, (newStoneMap.get(newStone) || 0) + count);
            }
        }

        // update stone map after blink
        stoneMap = newStoneMap;
    }

    let totalStones = 0;
    for (let count of stoneMap.values()) {
        totalStones += count;
    }

    return totalStones;
}

function recursiveCountStones(stones, blinks, counter = -1, stoneMap = null) {

    if (!stoneMap) {
        stoneMap = new Map();
        for (let stone of stones) {
            stoneMap.set(stone, (stoneMap.get(stone) || 0) + 1);
        }
    }

    if (counter > blinks) {
        let totalStones = 0;
        for (let count of stoneMap.values()) {
            totalStones += count;
        }
        return totalStones;
    }

    let newStoneMap = new Map();

    for (let [stone, count] of stoneMap.entries()) {
        if (stone === 0) {
            newStoneMap.set(1, (newStoneMap.get(1) || 0) + count);
        } else if (stone.toString().length % 2 === 0) {
            const stoneString = stone.toString();
            const firstPart = Number(stoneString.substring(0, stoneString.length / 2));
            const secondPart = Number(stoneString.substring(stoneString.length / 2));

            newStoneMap.set(firstPart, (newStoneMap.get(firstPart) || 0) + count);
            newStoneMap.set(secondPart, (newStoneMap.get(secondPart) || 0) + count);
        } else {
            const newStone = stone * 2024;
            newStoneMap.set(newStone, (newStoneMap.get(newStone) || 0) + count);
        }
    }

    return countStones(stones, blinks, counter + 1, newStoneMap);
}