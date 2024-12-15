const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day15.txt" : "./inputs/day15.txt";


async function day15() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 15 Results --- 🌟');
    console.time('Total Time');
    console.time('Parse Input');
    const { wallsCoords, robotCoords, boxesCoords, movements } = parseText(lines)
    console.timeEnd('Parse Input');
    console.time('T1');
    console.log('📌 Part 1: ', part1({ wallsCoords, robotCoords, boxesCoords, movements }));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2({ wallsCoords, robotCoords, boxesCoords, movements }));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}



function part1({ wallsCoords, robotCoords, boxesCoords, movements }) {

    boxes = boxesCoords.map(box => new Box(box.x, box.y, 1));
    const robot = new Robot(robotCoords.x, robotCoords.y, 1);
    walls = wallsCoords.map((wall) => new Wall(wall.x, wall.y, 1))

    movements.forEach((movement) => {
        switch (movement) {
            case ">":
                robot.move('right');
                break;
            case "<":
                robot.move('left');
                break;
            case "^":
                robot.move('up');
                break;
            case "v":
                robot.move('down');
                break;
        }
    })

    return boxes.reduce((a, b) => a + b.x + 100 * b.y, 0)
}

function part2({ wallsCoords, robotCoords, boxesCoords, movements }) {

}

day15()

function parseText(lines) {

    let robotCoords
    const wallsCoords = []
    const boxesCoords = []
    const movements = []

    let row = 0

    while (lines[row] !== '') {
        lines[row].split('').forEach((element, i) => {

            if (element === '#') {
                wallsCoords.push({ x: i, y: row })
            }
            if (element === "@") {
                robotCoords = { x: i, y: row }
            }
            if (element === "O") {
                boxesCoords.push({ x: i, y: row })
            }
        })
        row++
    }
    for (row; row < lines.length; row++) {
        movements.push(...lines[row].split(''))
    }
    return { wallsCoords, robotCoords, boxesCoords, movements }
}

class Robot {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    move(direction) {

        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case 'up':
                newY -= this.size;
                break;
            case 'down':
                newY += this.size;
                break;
            case 'left':
                newX -= this.size;
                break;
            case 'right':
                newX += this.size;
                break;
        }

        if (!this.checkCollision(newX, newY, direction)) {
            this.x = newX;
            this.y = newY;
        }
    }
    checkCollision(newX, newY, direction) {

        for (const wall of walls) {
            if (
                newX < wall.x + wall.size &&
                newX + this.size > wall.x &&
                newY < wall.y + wall.size &&
                newY + this.size > wall.y
            ) {
                return true;
            }
        }
        for (const box of boxes) {
            if (
                newX < box.x + box.size &&
                newX + this.size > box.x &&
                newY < box.y + box.size &&
                newY + this.size > box.y
            ) {
                return box.move(direction)
            }
        }
        return false;
    }
}

class Box {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

    }
    move(direction) {

        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case 'up':
                newY -= this.size;
                break;
            case 'down':
                newY += this.size;
                break;
            case 'left':
                newX -= this.size;
                break;
            case 'right':
                newX += this.size;
                break;
        }

        if (!this.checkCollision(newX, newY, direction)) {
            this.x = newX;
            this.y = newY;
            return false
        }
        return true
    }
    checkCollision(newX, newY, direction) {

        for (const wall of walls) {
            if (
                newX < wall.x + wall.size &&
                newX + this.size > wall.x &&
                newY < wall.y + wall.size &&
                newY + this.size > wall.y
            ) {
                return true;
            }
        }
        for (const box of boxes) {
            if (
                newX < box.x + box.size &&
                newX + this.size > box.x &&
                newY < box.y + box.size &&
                newY + this.size > box.y
            ) {
                return box.move(direction)
            }
        }
        return false;
    }
}

class Wall {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}




