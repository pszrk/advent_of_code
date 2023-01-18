const fs = require('fs');
const { start } = require('repl');
const input = fs.readFileSync('input12', 'utf8');
const inputLines = input.split('\n');


let row = 0;
let column = 0; // inputLines[row].charAt[column]

let lines = [];
let s = [0, 0];  //  row, column
let e = [0, 0];  //  row, column
//replace with unicode chars
inputLines.forEach(line => lines.push(populate(line)));

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

function includesCoord(path, coord){
    for(let i = 0; i < path.length; i++){
        if(path[i][0] == coord[0] && path[i][1] == coord[1])
            return true;
    }
    return false;
}

function findPotentialMoves(currentPoint, previousPoint, pathUpToNow){
    //  returns a point, or points, which are the moves it can make from the current square
    // make sure the path doesnt include that move

    let dirs = test4Directions(currentPoint);
    let potentialMoves = [];
    let currentChar = lines[currentPoint[0]] [currentPoint[1]];
    if(currentChar == 69)
        currentChar = 122;
    //  check if its allowed to move in each direction, by comparing that character with the current square
    //  it chekcs if the char is 1 lower, but should it try moving if the char is the same as well?
    if(dirs[0] == currentChar - 1 || dirs[0] == currentChar){     // [0]=up, [1]=down, [2]=left, [3]=right
        let testPoint = [currentPoint[0]-1, currentPoint[1]];
        if(testPoint[0] != previousPoint[0] && testPoint[1] != previousPoint[1] && !includesCoord(pathUpToNow, testPoint))
            potentialMoves.push( testPoint );
    }
    if(dirs[1] == currentChar - 1 || dirs[1] == currentChar ){
        let testPoint = [currentPoint[0]+1, currentPoint[1]];
        if(testPoint[0] != previousPoint[0] && testPoint[1] != previousPoint[1] && !includesCoord(pathUpToNow, testPoint))
            potentialMoves.push( testPoint );
    }
    if(dirs[2] == currentChar - 1 || dirs[2] == currentChar){
        let testPoint = [currentPoint[0], currentPoint[1]-1];
        if(testPoint[0] != previousPoint[0] && testPoint[1] != previousPoint[1] && !includesCoord(pathUpToNow, testPoint))
            potentialMoves.push( testPoint );
    }
    if(dirs[3] == currentChar - 1 || dirs[3] == currentChar){
        let testPoint = [currentPoint[0], currentPoint[1]+1];
        if(testPoint[0] != previousPoint[0] || testPoint[1] != previousPoint[1] && !includesCoord(pathUpToNow, testPoint))
            potentialMoves.push( testPoint );
    }
    return potentialMoves;
}

let currentIndex = e;  //  start from end
let pathsTaken = [];

function makeMoves(startingPoint, pathUpToNow){
    //give it the path array it took beofre this point
    // otherwise give it an empty array
    // given starting coordinates, 
    //  makes moves until it reaches deadend or split point, or end of maze(the starting point S), 
    //  returns the coords at which it arrived
    //  if starting point is a split point, returns the starting point
    let currentPath = pathUpToNow;
    let potentialMoves = findPotentialMoves(startingPoint, startingPoint, currentPath);
    let currentPoint = startingPoint;
    let previousPoint = startingPoint;
    
    let iterations = 0;
    while(potentialMoves.length == 1 && currentPoint != s && iterations < 10000){
        iterations++;
        if(currentPath[currentPath.length -1] != currentPoint)
            currentPath.push(currentPoint);
        previousPoint = currentPoint;
        currentPoint = potentialMoves[0];
        potentialMoves = findPotentialMoves(currentPoint, previousPoint, currentPath);
    }

    if(potentialMoves.length == 0){
        return -1;
    }

    if(potentialMoves.length > 1){
        ManageSplitPoint(currentPath, potentialMoves);
    }

    if(currentPoint == s)
        pathsTaken.push(currentPath);

    pathsTaken.push(currentPath);

    //  if it returns a point, it will be either the end of maze(S) or a split point
    //return currentPoint;
}



function ManageSplitPoint(path, potentialMoves){
    potentialMoves.forEach(move => {
        let tempPath = path;
        tempPath.push(move);
        //if(!pathsTaken.includes(tempPath)){
            makeMoves(move, tempPath)
        //}
    })
}


makeMoves(e, []);
console.log(pathsTaken);

// S = 83, E = 69


//save path in array
//when it reaches split point
// while split point has possible directions
//remove one of the directions and do a path in that one
//keep removing directions and doing a path for each one until no more direction remain in the splitpoint