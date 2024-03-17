const path: string = process.argv.includes("sample") ? "./inputs/sample_day7.txt" : "./inputs/day7.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

class Node {
    path: string;
    children: Node[];
    fileSize: number;
    constructor(path: string, fileSize: number = 0) {
        this.path = path
        this.children = []
        this.fileSize = fileSize
    }
    add(path: string) {
        const newNode = new Node(path)
        this.children.push(newNode)
        return newNode
    }
    addFileSize(size: number) {
        this.fileSize += size;
    }
    getChild(path: string): Node | undefined {
        return this.children.find(child => child.path === path);
    }
}
class Tree {
    root: Node
    constructor() {
        this.root = new Node("/")
    }
    sumFileSizes(node: Node): number {
        let sum = 0;
        if (node.fileSize < 100000) {
            sum += node.fileSize;
        }
        node.children.forEach(child => {
            sum += this.sumFileSizes(child);
        });
        return sum;
    }
    sumFileSizesBF(node: Node): number {
        let sum = 0;
        const queue: Node[] = [node];

        while (queue.length > 0) {
            const currentNode = queue.shift()!;
            if (currentNode.fileSize < 100000) {
                sum += currentNode.fileSize;
            }
            currentNode.children.forEach(child => queue.push(child));
        }

        return sum;
    }
    traverseBF(callbackFn: Function) {
        const queue: Node[] = [this.root];

        while (queue.length > 0) {
            const node: Node | undefined = queue.shift();
            callbackFn(node);

            if (node) {
                node.children.forEach(child => {
                    queue.push(child);
                });
            }
        }
    }
}

function sumOfTotalSizes(lines: string[]) {
    const fileStructure = new Tree()
    const root = fileStructure.root
    const navigation: Node[] = [root]

    lines.forEach(((line) => {
        if (line.startsWith("$ cd") && !line.startsWith("$ cd ..") && !line.startsWith("$ cd /")) {
            const directory = line.slice(5)
            const newDirectory = navigation[navigation.length - 1].add(directory)
            navigation.push(newDirectory)

        }
        else if (line.startsWith("$ cd ..")) {
            navigation.pop()
        }
        else if (Number(line[0]) === parseInt(line[0])) {
            const fileSize = Number(line.split(" ")[0])
            for (let i = 0; i < navigation.length; i++) {
                navigation[i].addFileSize(fileSize)
            }
        }
    }))
    console.time()
    const totalRecursive = fileStructure.sumFileSizes(root)
    console.timeEnd()
    console.time()
    const totalBF = fileStructure.sumFileSizesBF(root)
    console.timeEnd()
    return totalBF
}
function deleteDirectory(lines: string[]) {
    const fileStructure = new Tree()
    const root = fileStructure.root
    const navigation: Node[] = [root]

    lines.forEach(((line) => {
        if (line.startsWith("$ cd") && !line.startsWith("$ cd ..") && !line.startsWith("$ cd /")) {
            const directory = line.slice(5)
            const newDirectory = navigation[navigation.length - 1].add(directory)
            navigation.push(newDirectory)

        }
        else if (line.startsWith("$ cd ..")) {
            navigation.pop()
        }
        else if (Number(line[0]) === parseInt(line[0])) {
            const fileSize = Number(line.split(" ")[0])
            for (let i = 0; i < navigation.length; i++) {
                navigation[i].addFileSize(fileSize)
            }
        }
    }))
    const freeSpace = 70000000 - root.fileSize
    let currentMinimumSize = Infinity
    fileStructure.traverseBF((node: Node) => {
        if (node.fileSize + freeSpace - 30000000 > 0) {
            if (node.fileSize < currentMinimumSize) {
                currentMinimumSize = node.fileSize
            }
        }
    })
    return currentMinimumSize
}

console.log("Sum of Total Directory Size: ", sumOfTotalSizes(lines))
console.log("Size of Directory to Delete: ", deleteDirectory(lines))
