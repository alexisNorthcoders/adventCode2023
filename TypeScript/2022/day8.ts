const path: string = process.argv.includes("sample") ? "./inputs/sample_day8.txt" : "./inputs/day8.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

function countVisibleTrees(input: string[]) {
    const topEdge: number[] = []
    const leftEdge: number[] = []
    const rightEdge: number[] = []
    const bottomEdge: number[] = []
    let count = 0
    input.forEach((treeLine: string, index: number) => {
        if (index === 0) {
            count += treeLine.length
            //topEdge.push(...treeLine.slice(1,-1).split("").map(Number))

            for (let i = 1; i < treeLine.length - 1; i++) {
                topEdge.push(Number(treeLine[i]));
            }
        }
        else if (index === treeLine.length - 1) {

            for (let i = 1; i < treeLine.length - 1; i++) {
                bottomEdge.push(Number(treeLine[i]));
            }
            count += treeLine.length
        }
        else {
            leftEdge.push(Number(treeLine[0]))
            rightEdge.push(Number(treeLine.slice(-1)))
            count += 2
        }
    })
    console.log(topEdge)
    console.log(bottomEdge)
    console.log(leftEdge)
    console.log(rightEdge)
    return count
}

console.log("Visible trees: ", countVisibleTrees(lines))