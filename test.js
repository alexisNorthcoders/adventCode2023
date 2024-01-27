const str = "oneight";
const regex = /(?=(one|eight))/g;


const matches = str.matchAll(regex);
console.log(...matches)