const fs = require('fs');
const input = fs.readFileSync('input10', 'utf8');
const inputLines = input.split('\n');

let signalSum = 0;

let instructions = [];
for(line of inputLines){
    instructions.push(line.trim().split(' '));
}
//  each member of instructions[] is either ['addx', '#'] or ['noop']

let row1 = [];
let row2 = [];
let row3 = [];
let row4 = [];
let row5 = [];
let row6 = [];


let register = 1;
let cycle = 0;
for (let instr of instructions){
    checkSignal();
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

console.log(row1.join());
console.log(row2.join());
console.log(row3.join());
console.log(row4.join());
console.log(row5.join());
console.log(row6.join());


function checkSignal(){
    console.log(cycle +'   ' + register);

    //  register is the sprite position
    //  cycle is pixel (which can be either on or off), 1 - 240 with 40 on each row
    //  if register == cycle or cycle+1 or cycle-1, then that pixel is on, otherwise that pixel is off
    //  so for each cycle, check what the register is
    
    let tempCycle = cycle;
    if (tempCycle > 40){
        if (tempCycle < 81)
            tempCycle -= 40;
        else if (tempCycle < 121)
            tempCycle -= 80;
        else if (tempCycle < 161)
            tempCycle -= 120;
        else if (tempCycle < 201)
            tempCycle -= 160;
        else if (tempCycle < 241)
            tempCycle -= 200;
    }


    if(register == tempCycle || register == tempCycle - 1 || register == tempCycle + 1){
        if(cycle< 41)
            row1[tempCycle] = '#';
        else if(cycle < 81)
            row2[tempCycle] = '#';
        else if(cycle < 121)
            row3[tempCycle] = '#';
        else if(cycle < 161)
            row4[tempCycle] = '#';
        else if(cycle < 201)
            row5[tempCycle] = '#';
        else if(cycle < 241)
            row6[tempCycle] = '#';
    }
    else{
        if(cycle < 41)
            row1[tempCycle] = '.';
        else if(cycle < 81)
            row2[tempCycle] = '.';
        else if(cycle < 121)
            row3[tempCycle] = '.';
        else if(cycle < 161)
            row4[tempCycle] = '.';
        else if(cycle < 201)
            row5[tempCycle] = '.';
        else if(cycle < 241)
            row6[tempCycle] = '.';
    }
}