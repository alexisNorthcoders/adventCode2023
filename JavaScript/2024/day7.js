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

    let validTests = 0

    lines.forEach((line => {

        let [testValue, numbers] = line.split(':')
        numbers = numbers.trim().split(' ').map(Number)

        if (buildEquationAndValidate(numbers, testValue) === true) {

            validTests += Number(testValue)
        }
    }))

    return validTests

}

function part2(lines) {
    let validTests = 0

    lines.forEach((line => {

        let [testValue, numbers] = line.split(':')
        numbers = numbers.trim().split(' ').map(Number)

        if (buildEquationAndValidate(numbers, testValue, true) === true) {

            validTests += Number(testValue)
        }
    }))

    return validTests
}

day7()

function calculateEquation(equation) {
    let result = 0

    let operator = '+'
    equation.forEach((element) => {

        if (element === '+' || element === '*' || element === '||') {
            operator = element
        }

        if (typeof element === 'number') {
            if (operator === '+') {
                result += element
            }
            else if (operator === '*') {
                result *= element
            }
            else if (operator === '||') {
                result = Number(result.toString() + element.toString())
            }
        }
    })

    return result

}


function buildEquationAndValidate(numbers, testValue, part) {
    // build all possible combinations of + and *
    const possibleCombinations = generateCombinations(numbers.length - 1, part);

    // for each possible combination build the equation and calculate result
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
        // calculate result of equation and return if valid
        if (calculateEquation(currentEquation, part) === Number(testValue)) {
            return true;
        }
    }

    return false;
}

const generateCombinations = (() => {
    const cache = new Map();

    return (spaces, part) => {
        const cacheKey = `${spaces}-${part}`;

        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        let operators;
        if (part) {
            operators = ['+', '*', '||'];
        } else {
            operators = ['+', '*'];
        }

        // recursive function to generate combinations
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

        const result = recursiveGeneration([], spaces);
        cache.set(cacheKey, result);
        return result;
    };
})();