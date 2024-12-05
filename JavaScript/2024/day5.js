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

    const { pageOrders, pageUpdates } = parseInput(lines)

    const validUpdates = []

    pageUpdates.forEach(update => {

        if (checkValidUpdates(update, pageOrders)) validUpdates.push(update[Math.floor(update.length / 2)])
    })

    return validUpdates.reduce((a, b) => a + b)
}

function part2(lines) {
    const { pageOrders, pageUpdates } = parseInput(lines)

    const invalidUpdatesIndexes = []

    pageUpdates.forEach((update,i) => {

        if (!checkValidUpdates(update, pageOrders)) invalidUpdatesIndexes.push(i)
    })

    console.log(invalidUpdatesIndexes)


}


day5()

const parseInput = (() => {
    const cache = new Map();
    return (lines) => {
        const cacheKey = lines.length;

        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        const pageOrders = {};
        const pageUpdates = [];
        let i = 0;

        while (!lines[i].match(/^$/)) {
            const [left, right] = lines[i].split('|');
            pageOrders[left] = pageOrders[left]
                ? [...pageOrders[left], Number(right)]
                : [Number(right)];
            i++;
        }

        while (i < lines.length) {
            if (lines[i].match(/^$/)) {
                i++;
                continue;
            }
            pageUpdates.push(lines[i].split(',').map(Number));
            i++;
        }

        const result = { pageOrders, pageUpdates };
        cache.set(cacheKey, result);
        return result;
    };
})();

const checkValidUpdates = (() => {

    const cache = new Map();
    return (update, pageOrders) => {
        const cacheKey = JSON.stringify(update);

        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }
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
        const result = validUpdate
        cache.set(cacheKey, result);
        return result;
    };
})();