const fs = require('fs');
const input = fs.readFileSync('input9.txt', 'utf8');
const inputLines = input.split('\n');

class Position{
    constructor(row, column){
        this.row = row;
        this.column = column;
    }
    incrementRow(){
        this.row++;
    }
    decrementRow(){
        this.row--;
    }
    incrementColumn(){
        this.column++;
    }
    decrementColumn(){
        this.column--;
    }
    getRow(){
        return(this.row);
    }
    getColumn(){
        return(this.column);
    }
    getPostition(){
        return(this.row +',' +this.column);
    }
}

let tailPositions = ['0,0'];
let uniquePostitions = 1;

// each index is position of one of the knots, [0]= head, [9]=tail
let positions = [];
for(let i = 0; i < 10; i++){
    positions.push(new Position(0,0));
}

for(let line of inputLines){
    let instruction = line.trim();
    instruction = instruction.split(' ');

    if(instruction[0] == 'D'){
        for(let i = 0; i < parseInt(instruction[1]); i++){
            //move down, 1 by 1, the specified number of tiles
            positions[0].decrementRow();
            for(let u = 1; u < 10; u++){
                checkPosition(u);
            }
        }
    }
    if(instruction[0] == 'U'){
        for(let i = 0; i < parseInt(instruction[1]); i++){
            //move up, 1 by 1, the specified number of tiles
            positions[0].incrementRow();
            for(let u = 1; u < 10; u++){
                checkPosition(u);
            }
        }
    }
    if(instruction[0] == 'L'){
        for(let i = 0; i < parseInt(instruction[1]); i++){
            //move left, 1 by 1, the specified number of tiles
            positions[0].decrementColumn();
            for(let u = 1; u < 10; u++){
                checkPosition(u);
            }
        }
    }
    if(instruction[0] == 'R'){
        for(let i = 0; i < parseInt(instruction[1]); i++){
            //move right, 1 by 1, the specified number of tiles
            positions[0].incrementColumn();
            for(let u = 1; u < 10; u++){
                checkPosition(u);
            }
        }
    }
}

function checkPosition(index){
    if(positions[index-1].getRow() - positions[index].getRow() > 1){
        positions[index].incrementRow();
        //so it doesnt stay at a diagonal while moving.
        if(positions[index-1].getColumn() - positions[index].getColumn() > 0){
            positions[index].incrementColumn();
        }
        if(positions[index-1].getColumn() - positions[index].getColumn() < 0){
            positions[index].decrementColumn();
        }
    }
    if (positions[index-1].getRow() - positions[index].getRow() < -1){
        positions[index].decrementRow();
        //so it doesnt stay at a diagonal while moving.
        if(positions[index-1].getColumn() - positions[index].getColumn() > 0){
            positions[index].incrementColumn();
        }
        if(positions[index-1].getColumn() - positions[index].getColumn() < 0){
            positions[index].decrementColumn();
        }
    }
    if(positions[index-1].getColumn() - positions[index].getColumn() > 1){
        positions[index].incrementColumn();
        //so it doesnt stay at a diagonal while moving.
        if(positions[index-1].getRow() - positions[index].getRow() > 0){
            positions[index].incrementRow();
        }
        if(positions[index-1].getRow() - positions[index].getRow() < 0){
            positions[index].decrementRow();
        }
    }
    if(positions[index-1].getColumn() - positions[index].getColumn() < -1){
        positions[index].decrementColumn();
        //so it doesnt stay at a diagonal while moving.
        if(positions[index-1].getRow() - positions[index].getRow() > 0){
            positions[index].incrementRow();
        }
        if(positions[index-1].getRow() - positions[index].getRow() < 0){
            positions[index].decrementRow();
        }
    }
    let tailPos = positions[9].getPostition();
    if(!tailPositions.includes(tailPos)){
        tailPositions.push(tailPos);
        uniquePostitions++;
    }
}
console.log(uniquePostitions +' unique postions.');
