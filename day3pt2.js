const fs = require('fs');

const input = fs.readFileSync('input3.txt', 'utf8');

const lines = input.split('\n');

let prioritySum = 0;

for(let u = 0; u < lines.length; u+=3){
    let common;
    let firstLine = lines[u];
    for(let i = 0; i<firstLine.length; i++){
        let char = firstLine.charAt(i);
        if(lines[u+1].includes(char) && lines[u+2].includes(char)){
            common = char;
            break;
        }  
    }
    let charCode = common.charCodeAt(0);
    let priority;
    // A is unicode 65. a is unicode 97.
    priority = charCode < 97 ? charCode - 38 : charCode - 96;
    prioritySum += priority;
}
console.log('sum of priorities is ' +prioritySum);