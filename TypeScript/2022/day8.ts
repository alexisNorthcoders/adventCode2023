const path: string = process.argv.includes("sample") ? "./inputs/sample_day8.txt" : "./inputs/day8.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")