const fs = require('fs');
const input = fs.readFileSync('input7.txt', 'utf8');
const inputLines = input.trim().split('\n');

class Dir{
    constructor(name){
        this.name = name;
        this.fileSize = 0;
        this.subdirectories = [];
        this.sizeWithSubdirectories = 0;
    }
    addSubdirectory(subName) {
        this.subdirectories.push(subName);
    } 
    addDirectFile(fileSize){
        this.fileSize += parseInt(fileSize);
    }
    computeFilesizeWithSubdirectories(){
        this.setFileSizeWithSubdirectores = this.fileSize;
    }
    setFileSizeWithSubdirectories(size){
        this.sizeWithSubdirectories = parseInt(size);
        this.sizeWithSubdirectories += this.fileSize;
    }
}


let totalUnder100k = 0;
let dirs = [];
for(let i = 0; i < inputLines.length; i++){
    if(inputLines[i].substring(0, 4) == '$ cd'){
        if(inputLines[i].charAt(5) != '.'){
            // at this point, it has just cd into a new directory (and not back to a previous one)
            // create a Dir object for this directory, and save it in dirs array.
            let name = inputLines[i].substring(5).trim();
            const dir = new Dir(name);
            // count all the files in this directory and add it to directfilesize in the Dir object.
            // skip the next line ($ ls), then get all the dir statements from after that line until reaching the first $ statement.
            // add all the names of these dir statements to the subdirectories array in the Dir object.
            for(let u = i + 2; u < inputLines.length; u++){
                // go thru all files/folders in this directory (ie before get to cd statement)
                let identifier = inputLines[u].trim().split(' ')[0];    // current file/folder
                if(!isNaN(identifier)){
                    dir.addDirectFile(identifier);
                }
                else if(identifier == 'dir'){
                    dir.addSubdirectory(inputLines[u].trim().split(' ')[1]);
                }
                else if(identifier == '$'){
                    break;
                }
            }
            dirs.push(dir);
        }
    }
}

for(let i = 0; i < dirs.length; i++){
    let s = getTotalSizeofDir(i);
    if(s[3] <= 100000){
        totalUnder100k += s[3];
    }
}
console.log('under 100k ' +totalUnder100k);


function computeSubdirectorySizes(dirsIndex){
    // takes index value in dirs array
    let index = dirsIndex;
    // finds all the subdirectory tags of that dir 
    let subCount = dirs[index].subdirectories.length - 1;
    let subdirectorySizes = 0;
        while(subCount >= 0){
            for(let u = index+1; u < dirs.length; u++){
                if(dirs[u].name == dirs[index].subdirectories[subCount]){
                    //found the first time the subdirectory string appears in the list of dirs(starting from the index of its superdirectory)
                    subdirectorySizes += dirs[u].fileSize; // but what if this subdirectory has subdirectories?
                    //in that case, call the function recursively.
                    if(dirs[u].subdirectories.length > 0){
                        subdirectorySizes += computeSubdirectorySizes(u);
                    }
                    break;
                }
            }
            subCount--;
        }
    return subdirectorySizes;
}

function getTotalSizeofDir(index){
    let localsize = parseInt(dirs[index].fileSize);
    let subdirSize = 0;

    // if it has subdirectories
    if(dirs[index].subdirectories.length > 0){
        subdirSize += computeSubdirectorySizes(index);
    }
    let totalSize = localsize + subdirSize;
    return [dirs[index].subdirectories, localsize, subdirSize, totalSize];
}
