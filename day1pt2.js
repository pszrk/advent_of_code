const fs = require('fs');

function read(filePath){
    return fs.readFileSync(filePath, 'utf8');
}

const input = read("input.txt");

const parsed = input.split('\n');

let max = 0;
let second = 0;
let third = 0;
let current = 0;

for(const line of parsed){
    const trimmedLine = line.trim();
    if(trimmedLine != ''){
        current += parseInt(line);
    }
    else{
        if(current > max){
            if(max > second){
                if(second > third){
                    third = second;
                }
                second = max;
            }
            max = current;
        }
        else if(current > second){
            if(second > third){
                third = second;
            }
            second = current;
        }
        else if (current > third){
            third = current;
        }
        current = 0;
    }
}
console.log('total of top 3 is ' + (max+second+third));