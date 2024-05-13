const path: string = process.argv.includes("sample")
  ? "./inputs/sample_day2.txt"
  : "./inputs/day2.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split(",");
const programInput:number[] = lines.map((value)=> Number(value))

console.log("What value is left at position 0 after the program halts? "+ part1(programInput))

class Computer {
  program: number[];
  currentOpcode: number;

  constructor(input: number[]) {
    this.program = input;
    this.currentOpcode = 0;
  }
  #readCode() {
    let firstPosition = this.program[this.currentOpcode+1]
    let secondPosition = this.program[this.currentOpcode+2]
    let finalPosition = this.program[this.currentOpcode+3]
    switch (this.program[this.currentOpcode]) {
      case 1:
        const addition:number = this.program[firstPosition] + this.program[secondPosition]
        this.program[finalPosition]=addition
        this.currentOpcode += 4
        return true;
      case 2:
        const product:number = this.program[firstPosition] * this.program[secondPosition]
        this.program[finalPosition]=product
        this.currentOpcode += 4
        return true;
      default:
        return false;
    }
   }
   runProgram(){
    let run = this.#readCode()
    while (run){
        run = this.#readCode() 
    }
   }
}
function part1(programInput:number[]){
    const computer = new Computer(programInput)
    computer.program[1]=12
    computer.program[2]=2
    computer.runProgram()
    return computer.program[0]

}
