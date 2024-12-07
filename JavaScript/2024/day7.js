const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day7.txt" : "./inputs/day7.txt";


async function day7() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 7 Results --- 🌟');
    console.time('Total Time');
    console.time('T1');
    console.log('📌 Part 1: ', part1(lines));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(lines) {

    const validTests = new Set()

    lines.forEach((line => {

        let [testValue, numbers] = line.split(':')
        numbers = numbers.trim().split(' ').map(Number)

        if (buildEquationAndValidate(numbers, testValue) === true) {

            validTests.add(Number(testValue))
        }
    }))

    return [...validTests].reduce((a, b) => a + b, 0)

}

function part2() {

}

day7()

function calculateEquation(equation) {
    let result = 0

    let operator = '+'
    equation.forEach((element) => {
        if (element === '+') {
            operator = '+'
        }
        else if (element === '*') {
            operator = '*'
        }
        if (typeof element === 'number') {
            if (operator === '+') {
                result += element
            }
            else if (operator === '*') {
                result *= element
            }
        }
    })

    return result

}

function buildEquationAndValidate(numbers, testValue) {

    const possibleCombinations = generateCombinations(numbers.length - 1);

    for (const combination of possibleCombinations) {
        let currentEquation = [];

        for (let i = 0; i < numbers.length; i++) {
            if (i === numbers.length - 1) {
                currentEquation.push(numbers[i]);
            } else {
                currentEquation.push(numbers[i]);
                currentEquation.push(combination[i]);
            }
        }

        if (calculateEquation(currentEquation) === Number(testValue)) {
            return true;
        }
    }

    return false;
}

function generateCombinations(spaces) {

    const operators = ['+', '*'];

    const recursiveGeneration = (current, remainingSpaces) => {
        if (remainingSpaces === 0) {
            return [current];
        }

        let results = [];
        for (const op of operators) {
            results = results.concat(recursiveGeneration([...current, op], remainingSpaces - 1));
        }
        return results;
    };

    return recursiveGeneration([], spaces);
}