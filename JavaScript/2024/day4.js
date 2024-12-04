const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day4.txt" : "./inputs/day4.txt";


async function day4() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 4 Results --- 🌟');
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
    let result = 0
    // convert input into matrix
    const matrix = lines.map(row => row.split(''))

    // count XMAS and SAMX on each row 
    matrix.forEach(row => result += countXMAS(row))

    // rotate 45 degrees and count
    const rotated = rotateMatrix45(matrix)
    rotated.forEach(row => result += countXMAS(row))

    // rotate -45 degrees and count
    const rotateddirection = rotateMatrixMinus45(matrix)
    rotateddirection.forEach(row => result += countXMAS(row))

    // rotate 90 degrees and count
    const rotated90degrees = rotateMatrix90(matrix)
    rotated90degrees.forEach(row => result += countXMAS(row))

    return result
}

function part2(lines) {
    let result = 0
    const matrix = lines.map(line => line.split(''))

    for (let y = 1; y < matrix.length - 1; y++) {
        for (let x = 1; x < matrix.length - 1; x++) {
            if (matrix[x][y] === 'A') {
                const diagonal1 = matrix[x - 1][y - 1] + matrix[x][y] + matrix[x + 1][y + 1]
                const diagonal2 = matrix[x + 1][y - 1] + matrix[x][y] + matrix[x - 1][y + 1]
                if (diagonal1 === 'SAM' | diagonal1 === 'MAS' && diagonal2 === 'SAM' | diagonal2 === 'MAS') {
                    result++
                }
            }
        }
    }
    return result
}

day4()

function rotateMatrix90(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const rotated = Array.from({ length: cols }, () => Array(rows));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            rotated[cols - 1 - j][i] = matrix[i][j];
        }
    }
    return rotated;
}

function rotateMatrix45(matrix) {

    const rows = matrix.length;
    const cols = matrix[0].length;

    const rotated = Array.from({ length: rows + cols - 1 }, () => []);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            const diagonal = i + j;
            rotated[diagonal].push(matrix[i][j]);
        }
    }
    return rotated;
}

function rotateMatrixMinus45(matrix) {

    const rows = matrix.length;
    const cols = matrix[0].length;

    const rotated = Array.from({ length: rows + cols - 1 }, () => []);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            const diagonal = (cols - 1) + (i - j);
            rotated[diagonal].push(matrix[i][j]);
        }
    }
    return rotated;
}

function countXMAS(array) {
    let count = 0
    const joined = array.join('')

    joined.matchAll(/XMAS/g).forEach(() => count++)

    joined.matchAll(/SAMX/g).forEach(() => count++)

    return count
}