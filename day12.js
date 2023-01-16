const fs = require('fs');
const input = fs.readFileSync('input12', 'utf8');
const inputLines = input.split('\n');

console.log(inputLines);

let row = 0;
let column = 0; // inputLines[row].charAt[column]

let lines = [];
let s = [0, 0];  //  row, column
let e = [0, 0];  //  row, column
//replace with unicode chars
inputLines.forEach(line => lines.push(populate(line)));

console.log(s);
console.log(e);
//console.log(lines);
//  lines is an array of arrays, each containing unicode chars for each line

function populate(line){
    const newRow = [];
    for(let i = 0; i < line.length; i++){
        let code = line.charCodeAt(i);
        if (code == 83){
            s[1] = i;  //  column
            s[0] = lines.length;  // row
        }
        if (code == 69){
            e[1] = i;
            e[0] = lines.length;
        }
        newRow.push(line.charCodeAt(i));
    }
    return newRow;
}

let currentChar = 122;

function test4Directions(index){
    //  it gets the unicode chars up, down left and right of the given index position
    let up, down, left, right;
    if(index[0] == 0)
        up = 0; //  if at top row, there is no value above it
    else 
        up = lines[index[0]+1] [index[1]];  // value above the current one is simply value at row +1, and same column
    if (index[0] == lines.length - 1)
        down = 0;   //  if at bottom row, there is no value below it
    else
        down = lines[index[0]-1] [index[1]];
    if(index[1] == 0)
        left = 0;   //  if at leftmost column, ther eis no value to the left
    else
        left = lines[index[0]] [index[1]-1];
    if(index[1] == lines[0].length - 1)
        right = 0;  //  if at rightmost column, there is no value to the right
    else
        right = lines[index[0]] [index[1]+1];

    return [up, down, left, right];
}

function findPotentialMoves(index){
    let dirs = test4Directions(index);
    let potentialMoves = [];
    if(dirs[0] == currentChar - 1){     // [0]=up, [1]=down, [2]=left, [3]=right
        potentialMoves.push([[-1][0]]);  // [direction transformation([row tx] [column tx])]
    }
    if(dirs[1] == currentChar - 1){
        potentialMoves.push([[1][0]]);
    }
    if(dirs[2] == currentChar - 1){
        potentialMoves.push([[0][1]]);
    }
    if(dirs[3] == currentChar - 1){
        potentialMoves.push([[0][-1]]);
    }
    return potentialMoves;
}


let iterations = 0; //  to timeout / prevent infinite loop in case it doesn't find S
let currentIndex = e;  //  start from end
while(currentChar != 83 && iterations < 10000){
    let potentialMoves = findPotentialMoves(currentIndex);
    
    //  if there is only 1 direction it can possibly go from the current square
    if(potentialMoves.length == 1){
        //  apply the directiont ransofrmations to index
        index[0] += potentialMoves[0];
        index[1] += potentialMoves[1];
    }
    //  but if there are 2 or more directions it can possibly go, ...
    //  it has to explore all of them, to find the shortest path

}

// S = 83, E = 69