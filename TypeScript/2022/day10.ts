const path: string = process.argv.includes("sample") ? "./inputs/sample_day10.txt" : "./inputs/day10.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

class CPU {
    cycle: number
    x: number
    signalStrentghArray: number[]
    cycles: number[]
    screen: string
    pixel: number
    constructor(x: number = 1, cycle: number = 1) {
        this.x = x
        this.pixel = 0
        this.cycle = cycle
        this.signalStrentghArray = []
        this.cycles = [20, 60, 100, 140, 180, 220]
        this.screen = ""
        this.drawPixel()
    }

    instruction(code: string, value: number) {
        this.cycle++
        this.pixel++
        this.drawPixel()
        if (this.cycles.includes(this.cycle)) {
            this.signalStrentghArray.push(this.signalStrength())
        }
        if (code === "addx") {
            this.cycle++
            this.pixel++

            this.x += value
            this.drawPixel()

            if (this.cycles.includes(this.cycle)) {
                this.signalStrentghArray.push(this.signalStrength())
            }
        }
    }
    signalStrength() {
        return this.x * this.cycle
    }
    sumOfSignalStrength() {
        return this.signalStrentghArray.reduce((a, b) => a + b, 0)
    }
    drawPixel() {
        if (this.pixel >= 240) { 
            // stop drawing
        }
        else {
            //console.log("pixel: ",this.pixel,"X: ",this.x,"cycle: ",this.cycle)
            const pixelPosition = this.pixel % 40
            if (pixelPosition === 0) {
                this.screen += "\n"
            }
            if (Math.abs(this.x - pixelPosition) <= 1) {
                this.screen += "🎁";
            }
            else {
                this.screen += "🎄"
            }
        }

    }
}

function sumOfSignalStrength(input: string[]) {
    const cpu = new CPU()

    input.forEach(line => {
        const [code, value] = line.split(" ")
        cpu.instruction(code, Number(value))

    });

    return cpu.sumOfSignalStrength()
}

function drawImage(input: string[]) {
    const cpu = new CPU()

    input.forEach(line => {
        const [code, value] = line.split(" ")
        cpu.instruction(code, Number(value))


    });

    return cpu.screen
}

console.log("sum of the six signal strengths: ", sumOfSignalStrength(lines))
console.log("CRT screen:\n", drawImage(lines))