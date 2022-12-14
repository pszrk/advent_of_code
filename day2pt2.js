const fs = require('fs');

const input = fs.readFileSync('input2.txt', 'utf8');

const parsed = input.split('\n');

let totalScore = 0;

for(const line of parsed){
    let result = line.charAt(2);
    let resultScore = result == 'X' ? 0 : result == 'Y' ? 3 : 6;
    let oppPick = line.charAt(0);
    let pickScore;
    if(oppPick == 'A'){ // rock
        pickScore = resultScore == 0 ? 3 : resultScore == 3 ? 1 : 2;
    }
    else if(oppPick == 'B'){ // paper
        pickScore = resultScore == 0 ? 1 : resultScore == 3 ? 2 : 3;
    } 
    else if(oppPick == 'C'){ // scissors
        pickScore = resultScore == 0 ? 2 : resultScore == 3 ? 3 : 1;
    }
    if(!isNaN(pickScore+resultScore)){
        totalScore += pickScore + resultScore;
    }
}
console.log('total score is ' +totalScore);