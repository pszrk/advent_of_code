const fs = require('fs');
const input = fs.readFileSync('input8.txt', 'utf8');
const inputLines = input.split('\n');

const grid = [];
for(line of inputLines){
    grid.push(line.trim());
}

let bestView = 0;

for(let row = 0; row < grid.length; row++){
    // rows
    for(let column = 0; column < grid[row].length; column++){
        // columns
        let tree = parseInt(grid[row].charAt(column));

        //check trees to the left
        let left = 0;
        for(let i = column-1; i >= 0; i--){
            left++;
            if(parseInt(grid[row].charAt(i)) >= tree)
                break;
        }
         //check trees to the right
         let right = 0;
         for(let i = column+1; i < grid[row].length; i++){
            right++;
             if(parseInt(grid[row].charAt(i)) >= tree)
                 break;
         }
        //check trees above
        let above = 0;
        for(let i = row-1; i >= 0; i--){
            above++;
            if(parseInt(grid[i].charAt(column)) >= tree)
                break;
        }
        //check trees below
        let below = 0;
        for(let i = row+1; i < grid.length; i++){
            below++;
            if(parseInt(grid[i].charAt(column)) >= tree)
                break;
        }
        bestView = Math.max(bestView, (left * right * above * below));
    }
}

console.log(' the best view is ' +bestView);
