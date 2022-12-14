const fs = require('fs');

const input = fs.readFileSync('input3.txt', 'utf8');

const parsed = input.split('\n');

let prioritySum = 0;

for(const line of parsed){
    let parsed = line.trim();
    if(parsed.length < 2)
        continue;
    let half = parsed.length / 2;
    let firstHalf = line.substring(0, half);
    let secondHalf = line.substring(half);
    let common;
    for(let i=0; i<half; i++){
        if(secondHalf.includes(firstHalf.charAt(i))){
            common = firstHalf.charAt(i);
        }
    }
    let charCode = common.charCodeAt(0);
    let priority;
    // A is unicode 65. a is unicode 97.
    priority = charCode < 97 ? charCode - 38 : charCode - 96;
    prioritySum += priority;
}
console.log('sum of item priorities is ' +prioritySum);