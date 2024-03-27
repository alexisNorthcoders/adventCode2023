const path: string = process.argv.includes("sample") ? "./inputs/sample_day11.txt" : "./inputs/day11.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")