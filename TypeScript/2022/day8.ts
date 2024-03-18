const path: string = process.argv.includes("sample") ? "./inputs/sample_day8.txt" : "./inputs/day8.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

function countVisibleTrees(input: string[]): number {
    let count: number = (input.length - 2) * 2 // left and right tree line edges
    input.forEach((treeLine: string, index: number) => {
        if (index === 0 || index === treeLine.length - 1) {
            count += treeLine.length // top and bottom tree line edges
        }
        else {
            for (let i: number = 1; i < treeLine.length - 1; i++) {
                const tree = Number(treeLine[i])
                let hiddenTop: boolean = false
                let hiddenBot: boolean = false
                let hiddenLeft: boolean = false
                let hiddenRight: boolean = false
                for (let j: number = 0; j < i; j++) {
                    if (Number(treeLine[j]) >= tree) { // looking through left
                        hiddenLeft = true
                        break
                    }
                }
                for (let j: number = treeLine.length - 1; j > i; j--) {
                    if (Number(treeLine[j]) >= tree) {  // looking through right
                        hiddenRight = true
                        break
                    }
                }
                for (let j: number = input.length - 1; j > index; j--) {
                    if (Number(input[j][i]) >= tree) { // looking through bottom
                        hiddenBot = true
                        break
                    }
                }
                for (let j: number = 0; j < index; j++) {
                    if (Number(input[j][i]) >= tree) { // looking through top
                        hiddenTop = true
                        break
                    }
                }
                hiddenTop && hiddenBot && hiddenLeft && hiddenRight ? null : count++
            }
        }
    })
    return count
}
function highestScenicScore(input: string[]): number {
    let count: number = (input.length - 2) * 2 // left and right tree line edges
    const scenicScores: number[] = []
    input.forEach((treeLine: string, index: number) => {
        if (index === 0 || index === treeLine.length - 1) {
            // ignore top and bottom tree line edges
        }
        else {
            for (let i = 1; i < treeLine.length - 1; i++) {
                const tree = Number(treeLine[i])
                let top: number = 0
                let bot: number = 0
                let left: number = 0
                let right: number = 0
                for (let j = i + 1; j < treeLine.length; j++) {
                    right++
                    if (tree <= Number(treeLine[j])) { // looking right
                        break
                    }
                }
                for (let j = i - 1; j >= 0; j--) {
                    left++
                    if (tree <= Number(treeLine[j])) {  // looking left
                        break
                    }
                }
                for (let j = index + 1; j < input.length; j++) {
                    bot++
                    if (tree <= Number(input[j][i])) { // looking bot
                        break
                    }
                }
                for (let j = index - 1; j >= 0; j--) {
                    top++
                    if (tree <= Number(input[j][i])) { // looking through top
                        break
                    }
                }
                scenicScores.push(top * bot * right * left)
            }
        }
    })
    scenicScores.sort((a, b) => b - a)
    return scenicScores[0]
}

console.log("Visible trees: ", countVisibleTrees(lines))
console.log("Highest Scenic Score: ", highestScenicScore(lines))