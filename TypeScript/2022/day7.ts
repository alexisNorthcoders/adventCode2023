const path: string = process.argv.includes("sample") ? "./inputs/sample_day7.txt" : "./inputs/day7.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

function sumOfTotalSizes(lines: string[]) {
    let total = 0
    const navigation: string[] = []
    const fileTree = new Map()
    lines.forEach(((line) => {
        if (line.startsWith("$ cd") && !line.startsWith("$ cd ..")) {
            const directory = line.slice(5)
            navigation.push(directory)
            let currentValue = fileTree.get(directory)
            if (!currentValue) {
                fileTree.set(directory, 0)
            }
        }
        else if (line.startsWith("$ cd ..")) {
            navigation.pop()
        }
        else if (Number(line[0]) === parseInt(line[0])) {

            const fileSize = Number(line.split(" ")[0])
            for (let i = 0; i < navigation.length; i++) {
                let currentValue = fileTree.get(navigation[i])
                fileTree.set(navigation[i], currentValue + fileSize)
            }

        }
    }))
    fileTree.forEach((value) => value <= 100000 ? total += value : null)
    console.log(fileTree)
    return total
}

console.log("Sum of Total Directory Size: ", sumOfTotalSizes(lines))