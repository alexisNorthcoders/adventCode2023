const path: string = process.argv.includes("sample") ? "./inputs/sample_day3.txt" : "./inputs/day3.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")