const path: string = process.argv.includes("sample") ? "./inputs/sample_day8.txt" : "./inputs/day8.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

function countVisibleTrees(input: string[]) {
    let count = (input.length - 2) * 2 // left and right tree line edges
    input.forEach((treeLine: string, index: number) => {
        if (index === 0 || index === treeLine.length - 1) { 
            count += treeLine.length // top and bottom tree line edges
        }
        else {
            for (let i = 1; i < treeLine.length - 1; i++) {
                const tree = Number(treeLine[i])
                let hiddenTop = false
                let hiddenBot = false
                let hiddenLeft = false
                let hiddenRight = false
                for (let j = 0; j < i; j++) {
                    if (Number(treeLine[j]) >= tree) { // looking through left
                        hiddenLeft = true
                        break
                    }
                }
                for (let j = treeLine.length - 1; j > i; j--) {
                    if (Number(treeLine[j]) >= tree) {  // looking through right
                        hiddenRight = true
                        break
                    }
                }
                for (let j = input.length - 1; j > index; j--) {
                    if (Number(input[j][i]) >= tree) { // looking through bottom
                        hiddenBot = true
                        break
                    }
                }
                for (let j = 0; j < index; j++) {
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

console.log("Visible trees: ", countVisibleTrees(lines))