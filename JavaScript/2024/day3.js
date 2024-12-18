const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day3.txt" : "./inputs/day3.txt";


async function day3() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 3 Results --- 🌟');
    console.time('Total Time');
    console.time('T1');
    console.log('📌 Part 1: ', part1(lines));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('T2');
    console.time('T2-alt');
    console.log('📌 Part 2: ', part2_alt(lines));
    console.timeEnd('T2-alt');
    console.timeEnd('Total Time');
}
/**
 * @param {string[]} lines 
 */
function part1(lines) {
    let result = 0
    lines.forEach(line => line.matchAll(/mul\((\d+),(\d+)\)/g).forEach((mul) => result += mul[1] * mul[2]))
    return result
}
/**
 * @param {string[]} lines 
 */
function part2(lines) {

    let result = 0

    // assign at top level because enable/disable carries over from line to line
    let currentRange = 1;
    lines.forEach(line => {

        // get the indexes from the valid mul and the products
        const index = [...line.matchAll(/mul\((\d+),(\d+)\)/g).map(mul => { return { index: mul.index, product: mul[1] * mul[2] } })]

        // get the indexes of the do and don't
        const doIndex = [...line.matchAll(/do(?!n)/g)].map(match => match.index);
        const dontIndex = [...line.matchAll(/don't/g)].map(match => match.index);

        // create a sorted array with do and don't ranges
        const allIndexes = [...doIndex.map(index => ({ index, type: 'do' })), ...dontIndex.map(index => ({ index, type: 'dont' }))];
        allIndexes.sort((a, b) => a.index - b.index);

        // create matrix of 1 and 0 from all the indexes
        const isEnabledArray = Array.from({ length: line.length }, (_, i) => {

            for (let j = 0; j < allIndexes.length; j++) {
                const { index: start, type } = allIndexes[j];
                const end = j < allIndexes.length - 1 ? allIndexes[j + 1].index : line.length;
                if (i >= start && i < end) {
                    currentRange = type === 'do' ? 1 : 0;
                    break;
                }
            }
            return currentRange;
        });

        // iterate over all the valid mul and if mul instruction is enabled add the product
        for (let i = 0; i < index.length; i++) {
            if (isEnabledArray[index[i].index]) {
                result += index[i].product
            }
        }
    })
    return result
}

/**
 * @param {string[]} lines 
 */
function part2_alt(lines) {
    let result = 0
    let enabled = true
    const matchedLines = lines.map(line => [...line.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don\'t/g)].map((mul) => {
        if (mul[0].includes('mul')) {
            return mul[1] * mul[2]
        }
        if (mul[0] === "don't") {
            return false
        }
        else {
            return true
        }
    }))

    matchedLines.forEach((match) => {
        match.forEach((mul) => {
            if (typeof mul === 'number' && enabled) {
                result += mul
            }
            if (!mul) enabled = false
            if (mul === true) enabled = true
        })
    })
    return result
}

day3()