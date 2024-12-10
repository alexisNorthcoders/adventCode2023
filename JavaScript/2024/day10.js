const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day10.txt" : "./inputs/day10.txt";


async function day10() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 10 Results --- 🌟');
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
    let score = 0
    const trailheads = findTrailheads(matrix, 0)

    for (let coords of trailheads) {
        score += findFullTrails(matrix, coords)
    }

    return score

}

function part2(matrix) {

}

day10()

function parseData(input) { return input.map(row => row.split('').map(Number)) }

function findTrailheads(matrix, symbol) {
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

function findFullTrails(matrix, coords, visited = new Set()) {
    
    const [y, x] = coords;

    // check if coords are out of bounds
    if (x < 0 || y < 0 || y >= matrix.length || x >= matrix[0].length) {
        return 0;
    }

    // keep track of previous steps, if we have been there, the path is not valid
    const key = `Coordinates: ${x},${y}`;
    if (visited.has(key)) return 0;
    visited.add(key);

    const currentSpot = matrix[y][x];

    // base case when we hit the highest point
    if (currentSpot === 9) {
        return 1;
    }

    let score = 0;

    // check if surrounding directions are out of bounds
    const up = y > 0 ? matrix[y - 1][x] : null;
    const down = y < matrix.length - 1 ? matrix[y + 1][x] : null;
    const left = x > 0 ? matrix[y][x - 1] : null;
    const right = x < matrix[0].length - 1 ? matrix[y][x + 1] : null;

    // check if next spot increases by 1
    if (up !== null && currentSpot + 1 === up) {
        score += findFullTrails(matrix, [y - 1, x], visited);
    }
    if (down !== null && currentSpot + 1 === down) {
        score += findFullTrails(matrix, [y + 1, x], visited);
    }
    if (left !== null && currentSpot + 1 === left) {
        score += findFullTrails(matrix, [y, x - 1], visited);
    }
    if (right !== null && currentSpot + 1 === right) {
        score += findFullTrails(matrix, [y, x + 1], visited);
    }

    return score;
}