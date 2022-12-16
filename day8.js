const fs = require('fs');
const input = fs.readFileSync('input8.txt', 'utf8');
const inputLines = input.split('\n');

const grid = [];
for(line of inputLines){
    grid.push(line.trim());
}

let vis = 0;
vis += grid[0].length * 2; // top and bottom outside rows
vis += (grid.length * 2) - 4; // left and right outside rows (minus the 4 that were already counted in the top and bottom outside rows)

for(let row = 1; row < grid.length-1; row++){
    for (let column = 1; column < grid[row].length - 1; column++){
        //this loop cycles thru all trees(except first and last) row by row (except first and last rows)

        let thisTree = parseInt(grid[row].charAt(column));
        //check trees above it
        let highestTree = 0;
        for(let i = 0; i < row; i++){
            let tree = parseInt(grid[i].charAt(column));
            highestTree = Math.max(tree, highestTree);
        }
        if(highestTree < thisTree){
            vis++;
            continue;
        }
        //check trees below it
        highestTree = 0;
        for(let i = row+1; i < grid.length; i++){
            let tree = parseInt(grid[i].charAt(column));
            highestTree = Math.max(tree, highestTree);
        }
        if(highestTree < thisTree){
            vis++;
            continue;
        }
        //check trees to the left
        highestTree = 0;
        for(let i = 0; i < column; i++){
            let tree = parseInt(grid[row].charAt(i));
            highestTree = Math.max(tree, highestTree);
        }
        if(highestTree < thisTree){
            vis++;
            continue;
        }
        //check trees to the right
        highestTree = 0;
        for(let i = column+1; i < grid[row].length; i++){
            let tree = parseInt(grid[row].charAt(i));
            highestTree = Math.max(tree, highestTree);
        }
        if(highestTree < thisTree){
            vis++;
            continue;
        }
    }

}
console.log(vis);
