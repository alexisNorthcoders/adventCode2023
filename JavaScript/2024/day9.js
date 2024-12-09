const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day9.txt" : "./inputs/day9.txt";


async function day9() {

    const input = await readFile(path, 'utf8')

    console.log('🌟 --- Day 9 Results --- 🌟');
    console.time('Total Time');
    console.time('T1');
    console.log('📌 Part 1: ', part1(input));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(input));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(input) {

    let blocks = []
    let counter = 0
    for (let i = 0; i < input.length; i += 2) {
        blocks.push(...Array(Number(input[i])).fill(counter))
        if (input[i + 1]) {
            blocks.push(...Array(Number(input[i + 1])).fill('.'))
        }
        counter++
    }
    const indexes = findIndexes(blocks)
    const clearFreeSpace = blocks.filter((element) => element !== '.')
    const buildCompactedFile = []
    let j = 0
    for (let i = 0; i < blocks.length; i++) {
        if (i >= blocks.length - indexes.length) {
            buildCompactedFile.push('.')
        }
        else if (i === indexes[j]) {
            j++
            buildCompactedFile.push(clearFreeSpace.pop())
        }

        else {
            buildCompactedFile.push(blocks[i])
        }
    }

    return buildCompactedFile.reduce((acc, current, i) => {
        if (current !== '.') {
            acc += i * Number(current)
        }
        return acc
    }, 0)

}

function part2(input) {

}

day9()

function findIndexes(array) {
    return array.reduce((acc, current, i) => {
        if (current === '.') acc.push(i);
        return acc;
    }, []);
}