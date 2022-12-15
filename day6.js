const fs = require('fs');
const input = fs.readFileSync('input6.txt', 'utf8');

let processedChars = 4;
for (let i = 4; i < input.length; i++){
    if(noDuplicates(input.substring(i-4,i))){
        console.log(input.substring(i-4,i));
        break;
    }
    processedChars++;
}
console.log('it took ' +processedChars +' characters.');

function noDuplicates(string){
    for(let i = 0; i < string.length; i++){
        if(i==0){
            if(string.substring(1).includes(string.charAt(0)))
                return false;
        }
        else{
            if(string.substring(0,i).includes(string.charAt(i)))
                return false;
            if(string.substring(i+1).includes(string.charAt(0)))
                return false;
        }  
    }
    return true;
}