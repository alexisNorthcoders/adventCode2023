const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day7.txt" : "./inputs/day7.txt";


async function day7() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 7 Results --- 🌟');
    console.time('Total Time');
    console.time('Parse Input');
    const { testValues, parsedNumbers } = parseData(lines)
    console.timeEnd('Parse Input');
    console.time('T1');
    console.log('📌 Part 1: ', part1(testValues, parsedNumbers));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(testValues, parsedNumbers));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(testValues, parsedNumbers) {
    let validTests = 0

    parsedNumbers.forEach(((parsedNumbers, i) => {

        if (findValidEquation(parsedNumbers, ['+', '*'], testValues[i])) {
            validTests += testValues[i]
        }
    }
    ))
    return validTests
}

function part2(testValues, parsedNumbers) {
    let validTests = 0

    parsedNumbers.forEach(((parsedNumbers, i) => {

        if (findValidEquation(parsedNumbers, ['+', '*', '||'], testValues[i])) {
            validTests += testValues[i]
        }
    }
    ))
    return validTests
}

day7()

function calculatePartialResult(currentResult, operator, nextNumber) {
    if (operator === '+') {
        return currentResult + nextNumber;
    } else if (operator === '*') {
        return currentResult * nextNumber;
    } else if (operator === '||') {
        return Number(currentResult.toString() + nextNumber.toString());
    }
    return currentResult;
}

function findValidEquation(numbers, operators, testValue) {
    function generateAndCheck(currentEquation, index, currentResult, lastOperator) {

        if (index === numbers.length - 1) {
            currentEquation.push(numbers[index]);
            currentResult = calculatePartialResult(currentResult, lastOperator, numbers[index]);

            if (currentResult === testValue) {
                return true;
            }
            return false;
        }
        for (let op of operators) {
            const nextResult = calculatePartialResult(currentResult, lastOperator, numbers[index]);

            if (nextResult > testValue) {
                return false;
            }

            if (generateAndCheck(currentEquation, index + 1, nextResult, op)) {
                return true;
            }
        }
        return false;
    }
    return generateAndCheck([], 0, 0, '+');
}

function parseData(lines) {
    const testValues = []
    const parsedNumbers = []
    lines.forEach((line => {
        let [testValue, numbers] = line.split(':')
        numbers = numbers.trim().split(' ').map(Number)
        testValues.push(Number(testValue))
        parsedNumbers.push(numbers)
    }))
    return { testValues, parsedNumbers }
}

