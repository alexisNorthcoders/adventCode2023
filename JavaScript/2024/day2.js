const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day2.txt" : "./inputs/day2.txt";


async function day2() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 1 Results --- 🌟');
    console.time('Total Time');
    console.time('Part 1');
    console.log('📌 Part 1: ', part1(lines));
    console.timeEnd('Part 1');
    console.time('Part 2');
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('Part 2');
    console.timeEnd('Total Time');
}

function part1(input) {
    let result = 0
    for (line of input) {
        const numbers = line.split(" ")
        isSafe(numbers) ? result++ : null
    }
    return result
}

function part2(input) {
    let result = 0
    for (line of input) {
        let numbers = line.split(" ")
        const comb = numbersCombination(numbers)
        comb.some(combination => isSafe(combination)) ? result++ : null
    }
    return result
}

day2()

function difference(a, b) {
    const diff = Number(b) - Number(a)
    const absDiff = Math.abs(diff)
    const sign = Math.sign(diff)
    return { diff: absDiff, sign }
}

function isSafe(numbers) {

    let currentSign = difference(numbers[0], numbers[1]).sign
    for (let i = 0; i < numbers.length - 1; i++) {
        const { diff, sign } = difference(numbers[i], numbers[i + 1])

        if (diff > 3 || currentSign != sign || diff === 0) {
            return false
        }
        if (i === numbers.length - 2) return true
    }
}

function numbersCombination(numbers) {

    const combinations = []

    for (let i=0;i<numbers.length;i++){
        const comb = numbers.slice(0)
        comb.splice(i, 1)
        combinations.push(comb)
    }

    return combinations

}