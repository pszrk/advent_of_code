const fs = require('fs');

function read(filePath){
    return fs.readFileSync(filePath, 'utf8');
}

const input = read("input.txt");

const parsed = input.split('\n');

let max = 0;
let current = 0;

for(const line of parsed){
    const trimmedLine = line.trim();
    if(trimmedLine != ''){
        current += parseInt(line);
    }
    else{
        max = Math.max(max, current);
        current = 0;
    }
}
console.log('highest total was ' +max);