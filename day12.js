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

let currentIndex = e;   //  start from end
let currentChar = 122;

function test4Directions(currentIndex){
    //  it gets the unicode chars up, down left and right of the given index position
    let up, down, left, right;
    if(currentIndex[0] == 0)
        up = 0; //  if at top row, there is no value above it
    else 
        up = lines[currentIndex[0]+1] [currentIndex[1]];  // value above the current one is simply value at row +1, and same column
    if (currentIndex[0] == lines.length - 1)
        down = 0;   //  if at bottom row, there is no value below it
    else
        down = lines[currentIndex[0]-1] [currentIndex[1]];
    if(currentIndex[1] == 0)
        left = 0;   //  if at leftmost column, ther eis no value to the left
    else
        left = lines[currentIndex[0]] [currentIndex[1]-1];
    if(currentIndex[1] == lines[0].length - 1)
        right = 0;  //  if at rightmost column, there is no value to the right
    else
        right = lines[currentIndex[0]] [currentIndex[1]+1];

    return [up, down, left, right];
}


// S = 83, E = 69