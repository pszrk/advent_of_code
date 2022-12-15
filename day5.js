const { Console } = require('console');
const { FORMERR } = require('dns');
const fs = require('fs');
const input = fs.readFileSync('input5.txt', 'utf8');
const parsed = input.split('\n');

const stacks = Array(9);
for(let i = 0; i< stacks.length; i++){
    stacks[i] = new Array();
}
//map crate letter indexes to their column number
let numbersRow;
let crateLetterIndices = [];
for(let i = 0; i < parsed.length; i++){
    if(parsed[i].includes('1')){
        numbersRow = i;
        break;
    }
}
for(let i = 0; i< parsed[numbersRow].length; i++){
    if(!isNaN(parseInt(parsed[numbersRow].charAt(i)))){
        // i is index of current number (and associated crate letter values in that row) 
        crateLetterIndices.push(i);
    }   
}
// create the initial arrangement of crates
for(let i = 0; i < parsed.length; i++){
    if(parsed[i].includes('1'))
        break;
    for(let u = 0; u < parsed[i].length; u++){
        if(parsed[i].charAt(u) == '['){
            let value = JSON.stringify(parsed[i].substring(u, u+3));
            stacks[crateLetterIndices.indexOf(u+1)].push(value);
        }
    }
}
for(let i = 0; i < stacks.length; i++){
    stacks[i] = stacks[i].reverse();
}

let instructionLine;
for(let i = 0; i < parsed.length; i++){
    if(parsed[i].includes('move')){
        instructionLine = i;
        break;
    }
}
for(let i = instructionLine; i < parsed.length; i++){
    let idxOfamountToMove = parseInt(parsed[i].indexOf(' from'));
    let amountToMove = parseInt(parsed[i].substr(5, idxOfamountToMove - 5));
    let from = parseInt(parsed[i].substr(idxOfamountToMove +6, 1));
    let to = parseInt(parsed[i].substr(idxOfamountToMove +11, 1));

    for(let u = 0; u < amountToMove; u++){
        let crate;
        crate = stacks[from-1].pop();
        stacks[to-1].push(crate);
    } 
}
for(stk of stacks){
    console.log(stk[stk.length-1]);
}