const path = process.argv.includes("sample") ? "./inputs/day1_sample.txt" : "./inputs/day1.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

function findMaximumCalories(input: string[]) {
    let maximumCalories = 0
    let currentElfCalories = 0
    input.forEach((line: string) => {
        console.log(line)
        console.log(currentElfCalories)
        console.log(maximumCalories)
        if (line) {
            currentElfCalories += Number(line)
            if (currentElfCalories > maximumCalories) {
                maximumCalories = currentElfCalories
            }
        }
        else {
            currentElfCalories = 0
        }
    })
    return maximumCalories
}

console.log("Maximum Calories: ", findMaximumCalories(lines))

