const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day14.txt" : "./inputs/day14.txt";


async function day14() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 14 Results --- 🌟');
    console.time('Total Time');
    console.time('Parse Input');
    const robots = extractNumbers(file)
    console.timeEnd('Parse Input');
    console.time('T1');
    console.log('📌 Part 1: ', part1(robots));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(robots));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(robots) {

    const quadrants = { 1: 0, 2: 0, 3: 0, 4: 0 }

    const robotsCollection = robots.map((robot) => new Robot(...robot, 101, 103))

    robotsCollection.forEach((robot) => {
        robot.move(100)
        robot.checkQuadrant()
        robot.quadrant !== 0 ? quadrants[robot.quadrant]++ : null
    })

    return [...Object.values(quadrants)].reduce((a, b) => a * b, 1);

}

function part2(robots) {

}

day14()

function extractNumbers(input) {

    const numbers = input.split("\n").map(machine => Array.from(machine.matchAll(/-?\d+/g), match => Number(match[0])));

    return numbers
}

class Robot {
    constructor(x, y, vx, vy, limitx, limity) {
        this.x = x
        this.y = y
        this.speed = { x: vx, y: vy }
        this.limitx = limitx
        this.limity = limity
        this.quadrant = 0
    }
    move(seconds) {
        this.x = (this.x + seconds * this.speed.x) % this.limitx;
        this.y = (this.y + seconds * this.speed.y) % this.limity;
        if (this.x < 0) this.x += this.limitx;
        if (this.y < 0) this.y += this.limity;
    }
    checkQuadrant() {
        const firstQuadrant = { x: Math.floor(this.limitx / 2), y: Math.floor(this.limity / 2) }
        const secondQuadrant = { x: Math.ceil(this.limitx / 2), y: Math.floor(this.limity / 2) }
        const thirdQuadrant = { x: Math.floor(this.limitx / 2), y: Math.ceil(this.limity / 2) }
        const fourthQuadrant = { x: Math.ceil(this.limitx / 2), y: Math.ceil(this.limity / 2) }

        if (this.x < firstQuadrant.x && this.y < firstQuadrant.y) {
            this.quadrant = 1
        }
        if (this.x >= secondQuadrant.x && this.y < secondQuadrant.y) {
            this.quadrant = 2
        }
        if (this.x < thirdQuadrant.x && this.y >= thirdQuadrant.y) {
            this.quadrant = 3
        }
        if (this.x >= fourthQuadrant.x && this.y >= fourthQuadrant.y) {
            this.quadrant = 4
        }
    }
}