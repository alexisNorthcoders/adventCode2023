const path: string = process.argv.includes("sample") ? "./inputs/sample_day4.txt" : "./inputs/day4.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

const ranges = {
    first: [] as string[][],
    second: [] as string[][]
}

lines.forEach((line: string) => {
    const [firstElf, secondElf] = line.split(",")
    ranges.first.push(firstElf.split("-"))
    ranges.second.push(secondElf.split("-"))

})
