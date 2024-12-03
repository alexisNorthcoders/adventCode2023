const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day1.txt" : "./inputs/day1.txt";

async function day1() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')
    console.log('🌟 --- Day 1 Results --- 🌟');
    console.time('Total Time');
    console.time('T1');
    console.log('📌 Part 1: ', part1(lines));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(input) {
    let result = 0
    const [leftList, rightList] = [[], []]
    input.forEach(line => {
        const [left, right] = line.split(/\s+/)
        leftList.push(Number(left))
        rightList.push(Number(right))
    })
    leftList.sort((a, b) => a - b)
    rightList.sort((a, b) => a - b)

    leftList.forEach((value, i) => result += Math.abs(value - rightList[i]))
    return result
}

function part2(input) {
    let result = 0
    const leftListMap = {}
    const rightListMap = {}
    input.forEach(line => {
        const [left, right] = line.split(/\s+/)
        leftListMap[left] ? leftListMap[left]++ : leftListMap[left] = 1
        rightListMap[right] ? rightListMap[right]++ : rightListMap[right] = 1
    })

    for (value in leftListMap) {
        result += leftListMap[value] * value * (rightListMap[value] ?? 0)
    }
    return result
}

day1()