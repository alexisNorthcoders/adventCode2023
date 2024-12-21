const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day18.txt" : "./inputs/day18.txt";


async function day18() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 18 Results --- 🌟');
    console.time('Total Time');
    console.time("Parse Input");
    const input = parseData(lines);
    console.timeEnd("Parse Input");
    console.time('T1');
    console.log('📌 Part 1: ', part1(input));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(input));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(input) {

    // grid 0 to 70
    const matrix = Array(71).fill(null).map(() => Array(71).fill('.'));

    input.forEach((coords,i)=> {
        // 1024 bytes
        if (i<1024){
            const [x,y]= coords
        
            matrix[y][x]= '#'
        }
    })

    return shortestPath(matrix,[0,0],[70,70])
}

function part2(input) {

}

day18()

function parseData(lines){
 return lines.map(line=> [...line.matchAll(/[0-9]+/g)].map(Number))
}

// BFS breadth first search
function shortestPath(matrix, start, end) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const directions = [
        [0, 1],  // right
        [1, 0],  // down
        [0, -1], // left
        [-1, 0]  // up
    ];
    const queue = [[...start, 0]];
    const visited = new Set();
    visited.add(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();

        if (x === end[0] && y === end[1]) return steps;

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 && nx < cols &&
                ny >= 0 && ny < rows &&
                matrix[ny][nx] === '.' &&
                !visited.has(`${nx},${ny}`)
            ) {
                queue.push([nx, ny, steps + 1]);
                visited.add(`${nx},${ny}`);
            }
        }
    }

    return -1;
}