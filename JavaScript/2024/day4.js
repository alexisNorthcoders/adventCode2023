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
    rotateMatrix45(matrix).forEach(row => result += countXMAS(row))

    // rotate -45 degrees and count
    rotateMatrixMinus45(matrix).forEach(row => result += countXMAS(row))

    // rotate 90 degrees and count
    rotateMatrix90(matrix).forEach(row => result += countXMAS(row))

    return result
}

function part2(lines) {
    let result = 0
    const matrix = lines.map(line => line.split(''))

    // search for 'A' and check if both diagonals match SAM or MAS
    for (let y = 1; y < matrix.length - 1; y++) {
        for (let x = 1; x < matrix.length - 1; x++) {
            if (matrix[x][y] === 'A') {

                const diagonal1 = matrix[x - 1][y - 1] + 'A' + matrix[x + 1][y + 1]
                
                const diagonal2 = matrix[x + 1][y - 1] + 'A' + matrix[x - 1][y + 1]

                if (diagonal1 === 'SAM' | 'MAS' && diagonal2 === 'SAM' | 'MAS') {
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

function rotateMatrix90v2(matrix) {
    const N = matrix.length;

    for (let x = 0; x < Math.floor(N / 2); x++) {
        for (let y = x; y < N - x - 1; y++) {

            const temp = matrix[x][y];
            matrix[x][y] = matrix[N - 1 - y][x];
            matrix[N - 1 - y][x] = matrix[N - 1 - x][N - 1 - y];
            matrix[N - 1 - x][N - 1 - y] = matrix[y][N - 1 - x];
            matrix[y][N - 1 - x] = temp;
        }
    }
}