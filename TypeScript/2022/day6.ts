const path: string = process.argv.includes("sample") ? "./inputs/sample_day6.txt" : "./inputs/day6.txt";
const file = Bun.file(path);

const text: string = await file.text();

function findFirstMarker(input: string) {
    let marker: number = 0
    for (let i = 0; i < input.length; i++) {
        if (new Set(text.slice(0 + i, 4 + i).split("")).size === 4) {
            marker = i
            break
        }
    }
    return marker + 4
}

console.log("First Marker: ", findFirstMarker(text))
