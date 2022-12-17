const fs = require('fs');
const input = fs.readFileSync('input10.txt', 'utf8');
const inputLines = input.split('\n');

console.log(inputLines);

let signalSum = 0;

let instructions = [];
for(line of inputLines){
    instructions.push(line.trim().split(' '));
}
let register = 1;
let cycle = 0;
for (let instr of instructions){
    if(instr[0] == 'addx'){
        cycle++;
        checkSignal();
        cycle++;
        checkSignal();
        register += parseInt(instr[1]);
    }
    else{
        cycle++;
        checkSignal();
    }
}
console.log('sum of the six signal strengths is ' +signalSum);

function checkSignal(){
    if(cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220){
        console.log('cycle ' +cycle +' register ' + register);
        signalSum += (register * cycle);
    }
}