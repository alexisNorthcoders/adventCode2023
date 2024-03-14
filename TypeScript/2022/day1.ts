const path = process.argv.includes("sample") ? "./inputs/day1_sample.txt" : "./inputs/day1.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

function findMaximumCalories(input: string[]) {
    let maximumCalories = 0
    let currentElfCalories = 0
    input.forEach((line: string) => {
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
function findTopThree(input: string[]) {
    const calories: number[] = []
    let currentCaloriesCount = 0
    input.forEach((food, index) => {
        if (food) {
            currentCaloriesCount += Number(food)
            if (index === input.length - 1) {
                calories.push(currentCaloriesCount)
            }
        }
        else {
            calories.push(currentCaloriesCount)
            currentCaloriesCount = 0
        }
    })
    const caloriesSorted = calories.sort((a, b) => b - a).slice(0, 3)
    return caloriesSorted.reduce((a, b) => a + b)
}

console.log("Maximum Calories: ", findMaximumCalories(lines))
console.log("Top Three Maximum Calories: ", findTopThree(lines))

