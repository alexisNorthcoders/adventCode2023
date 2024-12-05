const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day5.txt" : "./inputs/day5.txt";


async function day5() {

    const file = await readFile(path, 'utf8')
    const lines = file.split('\n')

    console.log('🌟 --- Day 5 Results --- 🌟');
    console.time('Total Time');
    console.time('T1');
    console.log('📌 Part 1: ', part1(lines));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(lines));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(lines) {

    const pageOrders = {}
    const pageUpdates = []
    let i = 0

    while (!lines[i].match(/^$/)) {
        const [left, right] = lines[i].split('|')
        pageOrders[left] = pageOrders[left] ? [...pageOrders[left], (Number(right))] : [Number(right)]
        i++
    }
    while (i < lines.length) {
        if (lines[i].match(/^$/)) {
            i++
            continue
        }
        pageUpdates.push(lines[i].split(',').map(Number))
        i++
    }

    const validUpdates = []
    pageUpdates.forEach(update => {

        let validUpdate = true
        for (let i = 0; i < update.length; i++) {
            for (let j = i + 1; j < update.length; j++) {

                if (!pageOrders[update[i]]) {
                    validUpdate = false
                    break

                }
                if (pageOrders[update[i]] && !pageOrders[update[i]].includes(update[j])) {
                    validUpdate = false
                    break
                }
            }
        }
        if (validUpdate) validUpdates.push(update[Math.floor(update.length / 2)])
    })
    return validUpdates.reduce((a, b) => a + b)

}

function part2() {

}

day5()