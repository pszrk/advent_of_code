const fs = require('fs');
const input = fs.readFileSync('input9.txt', 'utf8');
const inputLines = input.split('\n');

// 2d array
//if down, up, increment row, and add a new array if needed
// if right/left, increment column, and add a new array if needed

let headRow = 0;
let headColumn = 0;
let tailRow = 0;
let tailColumn = 0;
let tailPositions = ['0,0'];
let uniquePostitions = 1;

for(let line of inputLines){
    let instruction = line.trim();
    instruction = instruction.split(' ');

    if(instruction[0] == 'D'){
        for(let i = 0; i < parseInt(instruction[1]); i++){
            //move down, 1 by 1, the specified number of tiles
            headRow--;
            checkPosition();
        }
    }
    if(instruction[0] == 'U'){
        for(let i = 0; i < parseInt(instruction[1]); i++){
            //move up, 1 by 1, the specified number of tiles
            headRow++;
            checkPosition();
        }
    }
    if(instruction[0] == 'L'){
        for(let i = 0; i < parseInt(instruction[1]); i++){
            //move left, 1 by 1, the specified number of tiles
            headColumn--;
            checkPosition();
        }
    }
    if(instruction[0] == 'R'){
        for(let i = 0; i < parseInt(instruction[1]); i++){
            //move right, 1 by 1, the specified number of tiles
            headColumn++;
            checkPosition();
        }
    }
}

function checkPosition(){
    if(headRow - tailRow > 1){
        tailRow++;
        //so it doesnt stay at a diagonal while moving.
        if(headColumn - tailColumn > 0){
            tailColumn++;
        }
        if(headColumn - tailColumn < 0){
            tailColumn--;
        }
    }
    if (headRow - tailRow < -1){
        tailRow--;
        //so it doesnt stay at a diagonal while moving.
        if(headColumn - tailColumn > 0){
            tailColumn++;
        }
        if(headColumn - tailColumn < 0){
            tailColumn--;
        }
    }
    if(headColumn - tailColumn > 1){
        tailColumn++;
        //so it doesnt stay at a diagonal while moving.
        if(headRow - tailRow > 0){
            tailRow++;
        }
        if(headRow - tailRow < 0){
            tailRow--;
        }
    }
    if(headColumn - tailColumn < -1){
        tailColumn--;
        //so it doesnt stay at a diagonal while moving.
        if(headRow - tailRow > 0){
            tailRow++;
        }
        if(headRow - tailRow < 0){
            tailRow--;
        }
    }
    let tailPos = tailRow +',' +tailColumn;
    if(!tailPositions.includes(tailPos)){
        tailPositions.push(tailPos);
        uniquePostitions++;
    }
}
console.log(uniquePostitions +' unique postions.');
