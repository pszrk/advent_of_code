let m0 = [57];
let m1 = [58, 93, 88, 81, 72, 73, 65];
let m2 = [65, 95];
let m3 = [58, 80, 81, 83];
let m4 = [58, 89, 90, 96, 55];
let m5 = [66, 73, 87, 58, 62, 67];
let m6 = [85, 55, 89];
let m7 = [73, 80, 54, 94, 90, 52, 69, 58];

let inspectionCounts = [0, 0, 0, 0, 0, 0, 0, 0];

function m0op (){
    while(m0.length > 0){
        let val = m0.shift();
        let inspected = val * 13;
        inspected = reduce(inspected);
        inspectionCounts[0]++;
        if (inspected % 11 == 0)
            m3.push(inspected);
        else
            m2.push(inspected);
    }
}
function m1op () {
    while(m1.length > 0){
        let val = m1.shift();
        let inspected = val + 2;
        inspected = reduce(inspected);
        inspectionCounts[1]++;
        if (inspected % 7 == 0)
            m6.push(inspected);
        else
            m7.push(inspected);
    }
}
function m2op () {
    while(m2.length > 0){
        let val = m2.shift();
        let inspected = val + 6;
        inspected = reduce(inspected);
        inspectionCounts[2]++;
        if (inspected % 13 == 0)
            m3.push(inspected);
        else
            m5.push(inspected);
    }
}
function m3op () {
    while(m3.length > 0){
        let val = m3.shift();
        let inspected = val * val;
        inspected = reduce(inspected);
        inspectionCounts[3]++;
        if (inspected % 5 == 0)
            m4.push(inspected);
        else
            m5.push(inspected);
    }
}
function m4op () {
    while(m4.length > 0){
        let val = m4.shift();
        let inspected = val + 3;
        inspected = reduce(inspected);
        inspectionCounts[4]++;
        if (inspected % 3 == 0)
            m1.push(inspected);
        else
            m7.push(inspected);
    }
}
function m5op () {
    while(m5.length > 0){
        let val = m5.shift();
        let inspected = val * 7;
        inspected = reduce(inspected);
        inspectionCounts[5]++;
        if (inspected % 17 == 0)
            m4.push(inspected);
        else
            m1.push(inspected);
    }
}
function m6op () {
    while(m6.length > 0){
        let val = m6.shift();
        let inspected = val + 4;
        inspected = reduce(inspected);
        inspectionCounts[6]++;
        if (inspected % 2 == 0)
            m2.push(inspected);
        else
            m0.push(inspected);
    }
}
function m7op () {
    while(m7.length > 0){
        let val = m7.shift();
        let inspected = val + 7;
        inspected = reduce(inspected);
        inspectionCounts[7]++;
        if (inspected % 19 == 0)
            m6.push(inspected);
        else
            m0.push(inspected);
    }
}

function reduce (val){
    return Math.floor(val / 3);
}

console.log(inspectionCounts);
for(let i = 0; i < 20; i++){
    m0op();
    m1op();
    m2op();
    m3op();
    m4op();
    m5op();
    m6op();
    m7op();
}

let max = Math.max(...inspectionCounts);
inspectionCounts.splice(inspectionCounts.indexOf(max), 1);
let secondMax = Math.max(...inspectionCounts);

console.log(max * secondMax);