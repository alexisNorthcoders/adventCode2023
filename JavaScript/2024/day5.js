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

        // if update is valid push middle value to array
        if (checkValidUpdates(update, pageOrders)) {
            validUpdates.push(update[Math.floor(update.length / 2)])
        }
    })

    return validUpdates.reduce((a, b) => a + b)
}
// WIP
function part2(lines) {
    const { pageOrders, pageUpdates } = parseInput(lines)
//console.log(pageOrders)
    const validUpdates = []

    pageUpdates.forEach((update, i) => {
       
        let initialInvalide = checkValidUpdates(update, pageOrders)
       /*  while (!checkValidUpdates(update, pageOrders)) {
            let swapped = false;
        
            for (let i = 0; i < update.length; i++) {
                for (let j = i + 1; j < update.length; j++) {
                   
                    [update[i], update[j]] = [update[j], update[i]];
        
                    
                    if (checkValidUpdates(update, pageOrders)) {
                        swapped = true; 
                        break;
                    }
        
                }
                if (swapped) break;
            }
        } */
        if (!initialInvalide) {
            validUpdates.push(update[Math.floor(update.length / 2)]);
        }
       // console.log(i)
    }
)
    return validUpdates.reduce((a, b) => a + b)

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
        // create map with page orders
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
function calculatePriority(element, hashmap) {
    for (const key in hashmap) {
        const preferences = hashmap[key];
        const index = preferences.indexOf(element);
        if (index !== -1) return index; // Lower index means higher priority
    }
    return Number.MAX_SAFE_INTEGER; // Lowest priority for missing elements
}

// Reorder array based on hashmap preferences
function reorderArray(array, hashmap) {
    return array.sort((a, b) => calculatePriority(a, hashmap) - calculatePriority(b, hashmap));
}

