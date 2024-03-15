const path: string = process.argv.includes("sample") ? "./inputs/sample_day3.txt" : "./inputs/day3.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

interface Compartments {
    first: string[];
    second: string[];
}
const compartments: Compartments = {
    first: [],
    second: []
}
lines.forEach((line: string) => {
    compartments.first.push(line.substring(0, line.length / 2))
    compartments.second.push(line.substring(line.length / 2, line.length))
})
function findSameItem(input: Compartments) {

}
function getPriorityValue(item: string) {
if (item.toLocaleLowerCase() === item) {
        return item.charCodeAt(0) - 96
    }
    else {
        return item.charCodeAt(0) - 38
    }
}
