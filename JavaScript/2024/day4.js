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
    const matrix = lines.map(line => line.split(''))

    // count XMAS and SAMX on each row 
    matrix.forEach(line => result += countXMAS(line))

    // rotate 45 degrees and count
    const rotated = rotateMatrix45(matrix)
    rotated.forEach(line => result += countXMAS(line))  

    // rotate -45 degrees and count
    const rotateddirection = rotateMatrixMinus45(matrix)
    rotateddirection.forEach(line => result += countXMAS(line))

    // rotate original matrix 90 degrees and count
    rotateMatrix90(matrix)
    matrix.forEach(line => result += countXMAS(line))

    return result
}

function part2() {

}

day4()

function rotateMatrix90(matrix) {
    const N = matrix.length

    for (let x = 0; x < N / 2; x++) {

        for (let y = x; y < N - x - 1; y++) {
            let temp = matrix[x][y];

            matrix[x][y] = matrix[y][N - 1 - x];


            matrix[y][N - 1 - x] = matrix[N - 1 - x][N - 1 - y];

            matrix[N - 1 - x][N - 1 - y] = matrix[N - 1 - y][x];

            matrix[N - 1 - y][x] = temp;
        }
    }
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