const path: string = process.argv.includes("sample") ? "./inputs/sample_day9.txt" : "./inputs/day9.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

console.log(lines)

class Head {
 startingX: number
    startingY: number
    constructor(startingX =0, startingY =0) {
       
        this.startingX = startingX
        this.startingY = startingY
    }
    move(direction: string, steps: number) {
        switch (direction) {
            case "U":
                this.startingY += steps;
                break;
            case "D":
                this.startingY -= steps;
                break;
            case "L":
                this.startingX -= steps;
                break;
            case "R":
                this.startingX += steps;
                break;
}
return {x:this.startingX,y:this.startingY}
    }

}

const head = new Head()
console.log(head.move("R",2))