const path: string = process.argv.includes("sample") ? "./inputs/sample_day9.txt" : "./inputs/day9.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")


class Point {
    x: number
    y: number

    uniquePositions: Set<string>
    constructor(x = 0, y = 0) {

        this.x = x
        this.y = y
        this.uniquePositions = new Set()
        this.markCurrentPosition(0, 0)
    }
    move(direction: string) {
        switch (direction) {
            case "U":
                this.y++
                break;
            case "D":
                this.y--
                break;
            case "L":
                this.x--
                break;
            case "R":
                this.x++
                break;
        }
    }
    follow(point: Point) {
        const distance = Math.max(Math.abs(this.x - point.x), Math.abs(this.y - point.y))
        if (distance > 1) {
            const directionX = point.x - this.x
            const directionY = point.y - this.y

            this.x += Math.abs(directionX) === 2 ? Math.sign(directionX) : directionX
            this.y += Math.abs(directionY) === 2 ? Math.sign(directionY) : directionY
        }

    }
    markCurrentPosition(x: number, y: number) {
        this.uniquePositions.add(`${x},${y}`)
    }
    uniqueTailPositions() {
        return this.uniquePositions.size
    }
  
}

function part1Movement(input: string[]) {
    const head = new Point()
    const tail = new Point()
    input.forEach((movement) => {
        const [direction, length] = movement.split(" ")
        for (let i = 0; i < Number(length); i++) {
            head.move(direction)
            tail.follow(head)
            tail.markCurrentPosition(tail.x, tail.y)

        }
    })
    return tail.uniqueTailPositions()
}
function part2Movement(input: string[]) {
    const rope = new Array(10).fill(0).map(() => new Point())
    input.forEach((movement) => {
        const [direction, length] = movement.split(" ")
        for (let i = 0; i < Number(length); i++) {
            rope[0].move(direction)
            for (let j = 1; j < rope.length; j++) {
                const point = rope[j]
                point.follow(rope[j - 1])

            }
            rope[9].markCurrentPosition(rope[9].x, rope[9].y)
        }
    })
    return rope[9].uniqueTailPositions()
}

console.log("number of unique positions part1: ", part1Movement(lines))
console.log("number of unique positions part2: ", part2Movement(lines))

