const path: string = process.argv.includes("sample") ? "./inputs/sample_day9.txt" : "./inputs/day9.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

class Head {
    headX: number
    headY: number
    tailX: number
    tailY: number
    uniquePositions: Set<string>
    constructor(headX = 0, headY = 0, tailX = 0, tailY = 0) {

        this.headX = headX
        this.headY = headY
        this.tailX = tailX
        this.tailY = tailY
        this.uniquePositions = new Set()
        this.tailCurrentPosition()
    }
    move(direction: string, steps: number) {
        switch (direction) {
            case "U":
                this.headY += steps;
                for (let i = 0; i < steps; i++) {
                    if (Math.hypot(this.headX - this.tailX, this.headY - this.tailY) > Math.SQRT2) {
                        this.tailX = this.headX
                        this.tailY++
                        this.tailCurrentPosition()
                    }
                }
                break;
            case "D":
                this.headY -= steps;
                for (let i = 0; i < steps; i++) {
                    if (Math.hypot(this.headX - this.tailX, this.headY - this.tailY) > Math.SQRT2) {
                        this.tailX = this.headX
                        this.tailY -= 1
                        this.tailCurrentPosition()
                    }
                }
                break;
            case "L":
                this.headX -= steps;
                for (let i = 0; i < steps; i++) {
                    if (Math.hypot(this.headX - this.tailX, this.headY - this.tailY) > Math.SQRT2) {
                        this.tailY = this.headY
                        this.tailX -= 1
                        this.tailCurrentPosition()
                    }
                }
                break;
            case "R":
                this.headX += steps;
                for (let i = 0; i < steps; i++) {
                    if (Math.hypot(this.headX - this.tailX, this.headY - this.tailY) > Math.SQRT2) {
                        this.tailY = this.headY
                        this.tailX += 1
                        this.tailCurrentPosition()
                    }
                }
                break;
        }
        return { x: this.headX, y: this.headY }
    }
    tailCurrentPosition() {
        this.uniquePositions.add(`${this.tailX},${this.tailY}`)
    }
    uniqueTailPositions() {
        return this.uniquePositions.size
    }
    getTailPosition() {
        return { headX: this.headX, headY: this.headY, tailX: this.tailX, tailY: this.tailY }
    }

}

const head = new Head()
function headMovement(input: string[]) {

    input.forEach((movement) => {
        const [direction, length] = movement.split(" ")
        head.move(direction, Number(length))
    })
    return head.uniqueTailPositions()
}

console.log("number of unique positions: ", headMovement(lines))
