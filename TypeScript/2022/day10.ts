const path: string = process.argv.includes("sample") ? "./inputs/sample_day10.txt" : "./inputs/day10.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

class CPU {
    cycle: number
    x: number
    signalStrentghArray: number[]
    cycles: number[]
    constructor(x: number = 1, cycle: number = 1) {
        this.x = x
        this.cycle = cycle
        this.signalStrentghArray = []
        this.cycles = [20, 60, 100, 140, 180, 220]
    }

    instruction(code: string, value: number) {
        if (code === "noop") {
            this.cycle++
            if (this.cycles.includes(this.cycle)) {
                this.signalStrentghArray.push(this.signalStrength())
            }
        }
        else if (code === "addx") {
            this.cycle++
            if (this.cycles.includes(this.cycle)) {
                this.signalStrentghArray.push(this.signalStrength())
            }
            this.cycle++
            this.x += value
            if (this.cycles.includes(this.cycle)) {
                this.signalStrentghArray.push(this.signalStrength())
            }
            
        }
    }
    signalStrength() {
        return this.x * this.cycle
    }
    sumOfSignalStrength(){
        return this.signalStrentghArray.reduce((a, b) => a + b)
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

console.log("sum of the six signal strengths: ", sumOfSignalStrength(lines))