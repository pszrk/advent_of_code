const fs = require('fs');
const input = fs.readFileSync('input7.txt', 'utf8');
const inputLines = input.trim().split('\n');

let dirSizes = [];
let dirNames = [];
for(let i = 0; i < inputLines.length; i++){
    let line = inputLines[i].trim().split(' ');
    if(line[1] == 'cd' && line[2] != '..'){
        dirNames.push(line[2]);
        let currentDirSize = 0;
        let currentLevel = 0;
        for(let u = i+1; u < inputLines.length; u++){
            let line = inputLines[u].trim().split(' ');
            if(!isNaN(line[0])){
                currentDirSize += parseInt(line[0]);
            }
            else if(line[2] == '..'){
                currentLevel--;
            }
            else if(line[1] == 'cd' && line[2] !='..'){
                currentLevel++;
            }
            if(currentLevel < 0){
                dirSizes.push(currentDirSize);
                console.log(dirNames[dirNames.length-1] +' total  ' +currentDirSize);
                break;
            } 
            if(u == inputLines.length -1){
                // reached EoF
                dirSizes.push(currentDirSize);
                console.log(dirNames[dirNames.length-1] +' total  ' +currentDirSize);
            }   
        }
    }
}
let requiredSpace = dirSizes[0] - 40000000;

let min = Number.MAX_SAFE_INTEGER;
for(let dir of dirSizes){
    if(dir >= requiredSpace)
        min = Math.min(min, dir);
}
console.log('the smallest directory that can be deleted to have sufficient room is ' +min);