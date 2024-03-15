const path: string = process.argv.includes("sample") ? "./inputs/sample_day5.txt" : "./inputs/day5.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")
const regex = /[A-Z]/g
const numberRegex = /[0-9]{1,}/g
const crates: any = {}
const moves: number[][] = []

lines.reverse().forEach(((line) => {
    if (!line.includes("move")) {
        const split = line.split("")
        split.forEach((char, index) => {
            if (regex.test(char)) {
                if (crates[index]) {
                    crates[index].push(char)
                }
                else {
                    crates[index] = [char]
                }
            }
        })
    }
    else {
        const match = line.match(numberRegex)
        if (match) {
            moves.push(match.map(Number));
        }
    }
}))

const cratesArray: string[][] = []
for (const column in crates) {
    cratesArray.push(crates[column])
}
const reverseMoves = moves.reverse()

function findTopCrateLayer(cratesArray: string[][], moves: number[][]) {
const clonedArray = cratesArray.slice()
    moves.forEach((move) => {
        const numberOfCrates = move[0]
        for (let i = 1; i <= numberOfCrates; i++) {

            const movingTo = clonedArray[move[2] - 1]
            const crateToMove = clonedArray[move[1] - 1].slice(-1)[0]
            crateToMove ? movingTo.push(crateToMove) : null
            clonedArray[move[1] - 1].pop()

        }

    })
    return clonedArray.map(((column) => column.slice(-1))).join("")
}
function findTopCrateLayerPart2(cratesArray: string[][], moves: number[][]) {
    moves.forEach((move) => {
        const numberOfCrates = move[0]
        const movingTo = cratesArray[move[2] - 1]
        const cratesToMove = cratesArray[move[1] - 1].slice(-numberOfCrates)
        cratesToMove.forEach((crate) => {
            movingTo.push(crate)
            cratesArray[move[1] - 1].pop()
        })
    })

    return cratesArray.map(((column) => column.slice(-1))).join("")
}

console.log("Top Crate Layer: ", findTopCrateLayer(cratesArray, reverseMoves))
console.log("Top Crate Layer Part 2: ", findTopCrateLayerPart2(cratesArray, reverseMoves))