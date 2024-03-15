const path: string = process.argv.includes("sample") ? "./inputs/sample_day4.txt" : "./inputs/day4.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")
interface Ranges {
    first: string[][],
    second: string[][]
}
const ranges: Ranges = {
    first: [],
    second: []
}

lines.forEach((line: string) => {
    const [firstElf, secondElf] = line.split(",")
    ranges.first.push(firstElf.split("-"))
    ranges.second.push(secondElf.split("-"))

})

function findOverlappingRanges(ranges: Ranges) {

    let total = 0
    ranges.first.forEach((group, index) => {
        const rangeStartA = Number(group[0])
        const rangeStartB = Number(ranges.second[index][0])
        const rangeEndA = Number(group[1])
        const rangeEndB = Number(ranges.second[index][1])
        if ((rangeStartA <= rangeStartB) && (rangeEndA >= rangeEndB)) {
            total++
        }
        else if ((rangeStartB <= rangeStartA) && (rangeEndB >= rangeEndA)) {
            total++
        }
    })
    return total
}

console.log("Number of assigments: ", findOverlappingRanges(ranges))
