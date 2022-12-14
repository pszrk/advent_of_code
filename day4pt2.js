const fs = require('fs');
const input = fs.readFileSync('input4.txt', 'utf8');
const parsed = input.split('\n');

let count = 0;

for(const line of parsed){
    let split = line.trim().split(',');
    let e1Section1 = parseInt(split[0].substring(0, split[0].indexOf('-')));
    let e1Section2 = parseInt(split[0].substring(split[0].indexOf('-')+1));

    let e2Section1 = parseInt(split[1].substring(0, split[1].indexOf('-')));
    let e2Section2 = parseInt(split[1].substring(split[1].indexOf('-')+1));

    if( (e1Section1 <= e2Section1 && e1Section2 >= e2Section1) || 
        (e1Section1 >= e2Section1 && e1Section2 <= e2Section2) ){
        count++;
    }
    else if( (e2Section1 <= e1Section1 && e2Section2 >= e1Section1) || 
        (e2Section1 >= e1Section1 && e2Section2 <= e1Section2) ){
        count++;
    }
}
console.log(`Count of overlapping pairs is ${JSON.stringify(count)}`);