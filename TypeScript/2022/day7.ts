const path: string = process.argv.includes("sample") ? "./inputs/sample_day7.txt" : "./inputs/day7.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

class Node {
    path: string;
    children: Node[];
    fileSize: number;
    constructor(path: string, fileSize:number = 0) {
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
    getChild(path: string):Node | undefined{
        return this.children.find(child => child.path === path);
    }
}
class Tree {
    root:Node
    constructor() {
        this.root = new Node("/")
    }
    sumFileSizes(node:Node):number {
        let sum = 0;
        if (node.fileSize < 100000) {
            sum += node.fileSize;
        }
        node.children.forEach(child => {
            sum += this.sumFileSizes(child);
        });
        return sum;
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
    return fileStructure.sumFileSizes(root)
}

console.log("Sum of Total Directory Size: ", sumOfTotalSizes(lines))