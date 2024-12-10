const { readFile } = require("fs/promises");

const path = process.argv.includes("sample") ? "./inputs/sample_day9.txt" : "./inputs/day9.txt";


async function day9() {

    const input = await readFile(path, 'utf8')

    console.log('🌟 --- Day 9 Results --- 🌟');
    console.time('Total Time');
    console.time('Parse Input');
    const blocks = createBlocks(input)
    console.timeEnd('Parse Input');
    console.time('T1');
    console.log('📌 Part 1: ', part1(input));
    console.timeEnd('T1');
    console.time('T2');
    console.log('📌 Part 2: ', part2(blocks));
    console.timeEnd('T2');
    console.timeEnd('Total Time');
}

function part1(input) {

    let blocks = []
    let counter = 0
    for (let i = 0; i < input.length; i += 2) {
        blocks.push(...Array(Number(input[i])).fill(counter))
        if (input[i + 1]) {
            blocks.push(...Array(Number(input[i + 1])).fill('.'))
        }
        counter++
    }

    const indexes = findIndexes(blocks, '.')
    const clearFreeSpace = blocks.filter((element) => element !== '.')
    const buildCompactedFile = []
    let j = 0
    for (let i = 0; i < blocks.length; i++) {
        if (i >= blocks.length - indexes.length) {
            buildCompactedFile.push('.')
        }
        else if (i === indexes[j]) {
            j++
            buildCompactedFile.push(clearFreeSpace.pop())
        }

        else {
            buildCompactedFile.push(blocks[i])
        }
    }

    return buildCompactedFile.reduce((acc, current, i) => {
        if (current !== '.') {
            acc += i * Number(current)
        }
        return acc
    }, 0)

}

function part2(blocks) {

    for (let i = blocks.length - 1; i > 0; i--) {
        for (let k = 0; k < i; k++) {
            if (blocks[i].id.length <= blocks[k].freeSpace.length) {
                for (let j = 0; j < blocks[i].id.length; j++) {
                    blocks[k].freeSpace.pop()
                    blocks[k].add.push(blocks[i].id[j])
                    blocks[i].add.unshift('.')
                }
                blocks[i].id.length = 0
            }
        }
    }

    const flat = blocks.map((block) => [...block.id, ...block.add, ...block.freeSpace]).flat()

    return flat.reduce((a, b, i) => {
        if (b !== '.') {
            a += b * i
        }
        return a
    }, 0)

}

day9()

function findIndexes(array, value) {
    return array.reduce((acc, current, i) => {
        if (current === value) acc.push(i);
        return acc;
    }, []);
}

function createBlocks(input) {
    let blocks = []
    let counter = 0
    for (let i = 0; i < input.length; i += 2) {
        blocks.push({ id: Array(Number(input[i])).fill(counter), add: [], freeSpace: input[i + 1] ? Array(Number(input[i + 1])).fill('.') : [] })
        counter++
    }
    return blocks
}

