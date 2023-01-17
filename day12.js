const fs = require('fs');
const { start } = require('repl');
const input = fs.readFileSync('input12', 'utf8');
const inputLines = input.split('\n');

//console.log(inputLines);

let row = 0;
let column = 0; // inputLines[row].charAt[column]

let lines = [];
let s = [0, 0];  //  row, column
let e = [0, 0];  //  row, column
//replace with unicode chars
inputLines.forEach(line => lines.push(populate(line)));

//console.log(s);
//console.log(e);
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

function test4Directions(index){
    //  it gets the unicode chars up, down left and right of the given index position
    let up, down, left, right;
    //console.log('index is ');
    //console.log(index);
    if(index[0] == 0)
        up = 0; //  if at top row, there is no value above it
    else 
        up = lines[index[0]-1] [index[1]];  // value above the current one is simply value at row +1, and same column
    if (index[0] == lines.length - 1)
        down = 0;   //  if at bottom row, there is no value below it
    else
        down = lines[index[0]+1] [index[1]];
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

function findPotentialMoves(currentPoint, previousPoint){
    //  make sure it doesnt go back the way it came

    //  currentpoint has to be a 1d array, it cannot be an array of arrays, which it seems to become
    
    //console.log('fpm about to call t4 with ');
    //console.log(currentPoint);
    let dirs = test4Directions(currentPoint);
    //console.log('dirs');
    //console.log(dirs);  // works
    //console.log('2dirs');
    let potentialMoves = [];
    let currentChar = lines[currentPoint[0]] [currentPoint[1]];
    if(currentChar == 69)
        currentChar = 122;
    //console.log('current char');
    //console.log(currentChar);
    //console.log('dirs: ' +dirs + 'currentChar' +currentChar);
    //console.log('currentPoint: ' +currentPoint);
    //  check if its allowed to move in each direction, by comparing that character with the current square
    //  it chekcs if the char is 1 lower, but should it try moving if the char is the same as well?
    if(dirs[0] == currentChar - 1 || dirs[0] == currentChar){     // [0]=up, [1]=down, [2]=left, [3]=right
        //console.log('1');
        let testPoint = [currentPoint[0]-1, currentPoint[1]];
        if(testPoint[0] != previousPoint[0] && testPoint[1] != previousPoint[1])
            potentialMoves.push( testPoint );
    }
    if(dirs[1] == currentChar - 1 || dirs[1] == currentChar ){
        //console.log('2');
        let testPoint = [currentPoint[0]+1, currentPoint[1]];
        if(testPoint[0] != previousPoint[0] && testPoint[1] != previousPoint[1])
            potentialMoves.push( testPoint );
    }
    if(dirs[2] == currentChar - 1 || dirs[2] == currentChar){
        //console.log('3');
        let testPoint = [currentPoint[0], currentPoint[1]-1];
        if(testPoint[0] != previousPoint[0] && testPoint[1] != previousPoint[1])
            potentialMoves.push( testPoint );
    }
    if(dirs[3] == currentChar - 1 || dirs[3] == currentChar){
        //console.log('4');
        let testPoint = [currentPoint[0], currentPoint[1]+1];
        //console.log('testpoint');
        //console.log(testPoint);
        //console.log('testPoint[0] : ' +testPoint[0] + ' testPoint[1] ' + testPoint[1]); //  works
        //console.log('prevPoint[0] : ' +previousPoint[0] + ' prevPoint[1] ' + previousPoint[1]); //  works
        if(testPoint[0] != previousPoint[0] || testPoint[1] != previousPoint[1])
            potentialMoves.push( testPoint );
    }

    // the bug is here, it returns an array of arrays when it should return a 1d array
    //console.log('findpotentialmoves returning');
    //console.log(potentialMoves);
    //console.log('dirs returning');
    //console.log(potentialMoves);
    return potentialMoves;
}

let currentIndex = e;  //  start from end


function makeMoves(startingPoint){
    // given starting coordinates, 
    //  makes moves until it reaches deadend or split point, or end of maze(the starting point S), 
    //  returns the coords at which it arrived
    //  if starting point is a split point, returns the starting point
    //console.log('fpm call 1 with');
    //console.log(startingPoint);
    let potentialMoves = findPotentialMoves(startingPoint, startingPoint);
    //console.log('pm ');
    //console.log(potentialMoves);
    //console.log('2pm');
    let currentPoint = startingPoint;
    let previousPoint = startingPoint;

    let iterations = 0;
    while(potentialMoves.length == 1 && currentPoint != s && iterations < 10000){
        iterations++;
        previousPoint = currentPoint;
        //console.log('mm about to set currentpoint to ');
        //console.log(potentialMoves[0]);
        currentPoint = potentialMoves[0];
        //console.log('set currentPoint to ' +currentPoint);
        //console.log('fpm call 2 with');
        //console.log(currentPoint);
        potentialMoves = findPotentialMoves(currentPoint, previousPoint);
    }

    if(potentialMoves.length == 0){
        return -1;
    }
    //  if it returns a point, it will be either the end of maze(S) or a split point
    return currentPoint;
}


let iterations = 0;
let currentCoords = s;
class Splitpoint {
    constructor(point, steps){
        this.point = point;
        this.steps = steps;
    }
}
let splitpoints = [];
while(iterations < 1000 && currentCoords != s){
    iterations++;
    let moveAttempt = makeMoves(currentCoords);
    
    if(moveAttempt == currentCoords){
        //  current coords is a split point
        splitpoints.push(new Splitpoint(currentCoords, iterations));
    }
}


// S = 83, E = 69