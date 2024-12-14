const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day12.txt" : "./inputs/day12.txt";


async function day12() {

  const file = await readFile(path, 'utf8')
  const lines = file.split('\n')

  console.log('🌟 --- Day 12 Results --- 🌟');
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

function part1(input) {

  let price = 0

  const groups = findAllContinuous(input)

  groups.forEach((group) => {
    const tempMap = new Map()
    group.forEach((plot) => {
      const [row, col] = plot
      const currentPlot = input[row][col]
      calculatePerimeter(input, currentPlot, row, col, tempMap)

    })
    // multiply number of plots x total perimeter
    price += Array.from(tempMap).reduce((a, b) => a + group.length * b[1], 0)
  })

  return price
}

function part2() {

}

day12()


function parseData(input) { return input.map(row => row.split('')) }

function findAllContinuous(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  // Keep track of visited coordinates
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
  ];
  const groups = [];

  // check if out of bounds
  const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

  // breath first search
  function bfs(startX, startY, plot) {

    // start with initial coordinates
    const queue = [[startX, startY]];
    const group = [];

    // run loop while there are coords in the queue
    while (queue.length > 0) {

      // get coords from the top of the queue
      const [x, y] = queue.shift();

      // if coords are invalid, have been visited or different then current plot, continue to check another coords
      if (!isValid(x, y) || visited[x][y] || matrix[x][y] !== plot) continue;

      // if valid mark as visited and add the plot to the group
      visited[x][y] = true;
      group.push([x, y]);

      // add all 4 directions to the queue
      for (const [dx, dy] of directions) {
        queue.push([x + dx, y + dy]);
      }
    }
    // return the group of continuous plots
    return group;
  }

  // loop through every element of the matrix
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // if they have been visited run a BFS and add the group
      if (!visited[i][j]) {
        const plot = matrix[i][j]; // Get the plot type for the current cell
        const group = bfs(i, j, plot); // Find all connected cells of this plot
        groups.push(group);
      }
    }
  }

  return groups;
}

function calculatePerimeter(input, currentPlot, row, col, map) {
  // check up
  if (col < input.length && (row === 0 || input[row - 1][col] !== currentPlot)) {
    map.set(currentPlot, (map.get(currentPlot) || 0) + 1)
  }
  // check left
  if (row < input.length && (col === 0 || input[row][col - 1] !== currentPlot)) {
    map.set(currentPlot, (map.get(currentPlot) || 0) + 1)
  }
  // check right
  if (row < input.length && (col === input.length - 1 || input[row][col + 1] !== currentPlot)) {
    map.set(currentPlot, (map.get(currentPlot) || 0) + 1)
  }
  // check down
  if (col < input.length && (row === input.length - 1 || input[row + 1][col] !== currentPlot)) {
    map.set(currentPlot, (map.get(currentPlot) || 0) + 1)
  }
}