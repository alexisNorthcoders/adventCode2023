const path: string = process.argv.includes("sample") ? "./inputs/sample_day2.txt" : "./inputs/day2.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")
const games: string[][] = lines.map((line) => line.split(" "))

function totalScore(input: string[][]) {
    let total = 0
    input.forEach((game) => {
        switch (game[0]) {
            case "A":
                if (game[1] === "Y") total += 6 + 2
                else if (game[1] === "X") total += 3 + 1
                else if (game[1] === "Z") total += 0 + 3
                break
            case "B":
                if (game[1] === "X") total += 0 + 1
                else if (game[1] === "Y") total += 3 + 2
                else if (game[1] === "Z") total += 6 + 3
                break
            case "C":
                if (game[1] === "Z") total += 3 + 3
                else if (game[1] === "Y") total += 0 + 2
                else if (game[1] === "X") total += 6 + 1
                break
        }
    })
    return total
}
function alternateTotalScore(input: string[][]) {
    let total = 0
    input.forEach((game) => {
        switch (game[0]) {
            case "A":
                if (game[1] === "X") total += 0 + 3
                else if (game[1] === "Y") total += 3 + 1
                else if (game[1] === "Z") total += 6 + 2
                break
            case "B":
                if (game[1] === "X") total += 0 + 1
                else if (game[1] === "Y") total += 3 + 2
                else if (game[1] === "Z") total += 6 + 3
                break
            case "C":
                if (game[1] === "X") total += 0 + 2
                else if (game[1] === "Y") total += 3 + 3
                else if (game[1] === "Z") total += 6 + 1
                break
        }
    })
    return total
}

console.log("Total Score: ", totalScore(games))
console.log("Total Score Rules v2.0: ", alternateTotalScore(games))