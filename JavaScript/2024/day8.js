const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day8.txt" : "./inputs/day8.txt";


async function day8() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 8 Results --- 🌟');
    console.time('Total Time');
    console.time('Parse Input');
    const matrix = parseData(lines)
    console.timeEnd('Parse Input');
    console.time('T1');
    console.log('📌 Part 1: ', part1(matrix));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(matrix));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(matrix) {
    // create set to store unique antinodes
    const antinodes = new Set()
    // find all symbols which can create antinodes
    const uniqueSymbols = findUniqueSymbols(matrix)

    uniqueSymbols.forEach((symbol) => {
        // for each unique symbol find all coordinates
        const coords = findSymbol(matrix, symbol)
        // get all possible lines from symbols
        const allLines = getAllLines(coords)

        allLines.forEach((line) => {
            // calculate the antinodes
            const [left, right] = calculateCollinearPoints(line[0], line[1])
            // filter antinode out of bounds
            if (left[0] >= 0 && left[0] < matrix.length && left[1] >= 0 && left[1] < matrix.length) {
                // add antinode to set
                antinodes.add(JSON.stringify(left))
            }
            if (right[0] >= 0 && right[0] < matrix.length && right[1] >= 0 && right[1] < matrix.length) {
                antinodes.add(JSON.stringify(right))
            }
        })
    })
    return antinodes.size
}

function part2(matrix) {
    // create set to store unique antinodes
    const antinodes = new Set()
    // find all symbols which can create antinodes
    const uniqueSymbols = findUniqueSymbols(matrix)

    uniqueSymbols.forEach((symbol) => {
        // for each unique symbol find all coordinates
        const coords = findSymbol(matrix, symbol)
        // get all possible lines from symbols
        const allLines = getAllLines(coords)

        allLines.forEach((line) => {
            // calculate the antinodes
            const collinearPoints = calculateAllCollinearPoints(line[0], line[1], matrix.length)
            // add antinodes to set
            collinearPoints.forEach(point => antinodes.add(JSON.stringify(point)))
        })
    })
    return antinodes.size
}

day8()

function parseData(input) { return input.map(row => row.split('')) }

/**
 * Simplified equation to find collinear points with same distance between A and B
 * @param {Number[]} A - point A coordinates
 * @param {Number[]} B - point B coordinates
 * @returns 
 */
function calculateCollinearPoints(A, B) {
    const [x1, y1] = A;
    const [x2, y2] = B;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const C = [x1 - dx, y1 - dy];
    const D = [x2 + dx, y2 + dy];

    return [C, D];
}

function calculateAllCollinearPoints(A, B, matrixSize) {
    const [x1, y1] = A;
    const [x2, y2] = B;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const points = [];

    for (let x = 0; x < matrixSize; x++) {
        for (let y = 0; y < matrixSize; y++) {
            if ((y - y1) * dx === (x - x1) * dy) {
                points.push([x, y]);
            }
        }
    }

    return points;
}

/**
 * Function to find a symbol coordinates
 * @param {String[][]} matrix 
 * @param {String} symbol 
 * @returns 
 */
function findSymbol(matrix, symbol) {
    let coords = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === symbol) {
                coords.push([i, j]);
            }
        }
    }
    return coords;
}

/**
 * Function to get all possible lines from an array of points
 * @param {Number[][]} points 
 * @returns 
 */
function getAllLines(points) {
    const combinations = [];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            combinations.push([points[i], points[j]]);
        }
    }
    return combinations;
}

/**
 * Function to find all unique symbols from a matrix, except '.'
 * @param {String[][]} matrix 
 * @returns 
 */
function findUniqueSymbols(matrix) {
    const symbols = new Set()

    matrix.forEach((row) => row.forEach((symbol) => symbol != '.' ? symbols.add(symbol) : null))
    return Array.from(symbols)
}