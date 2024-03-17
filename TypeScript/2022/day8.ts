const path: string = process.argv.includes("sample") ? "./inputs/sample_day8.txt" : "./inputs/day8.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

function countVisibleTrees(input:string[]){
    let count = 0
input.forEach((treeLine,index)=>{
    if (index===0 || index===treeLine.length-1){
count += treeLine.length 
    }
    else{
        count +=2
    }
})
return count
}

console.log("Visible trees: ",countVisibleTrees(lines))