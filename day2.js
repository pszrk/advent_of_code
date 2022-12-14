const fs = require('fs');

const input = fs.readFileSync('input2.txt', 'utf8');

const parsed = input.split('\n');

let totalScore = 0;

for(const line of parsed){
    let yourPick = line.charAt(2);
    let pickScore = yourPick == 'X' ? 1 : yourPick == 'Y' ? 2 : 3;
    let oppPick = line.charAt(0);
    let resultScore;
    if(oppPick == 'A'){ // rock
        resultScore = pickScore == 1 ? 3 : pickScore == 2 ? 6 : 0;
    }
    else if(oppPick == 'B'){ // paper
        resultScore = pickScore == 1 ? 0 : pickScore == 2 ? 3 : 6;
    } 
    else if(oppPick == 'C'){ // scissors
        resultScore = pickScore == 1 ? 6 : pickScore == 2 ? 0 : 3;
    }
    if(!isNaN(pickScore+resultScore)){
        totalScore += pickScore + resultScore;
    }
}
console.log('total score is ' +totalScore);