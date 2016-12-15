var maxSteps = 50;
var favNumber = 1350;
var maxX = 0, maxY = 0;

var mostVisited = 0;
var pathMap = {};

function isOpenSpace(x, y){
    var num = (x*x + 3*x + 2*x*y + y + y*y) + favNumber;
    var binary = (num >>> 0).toString(2);
    var ones = binary.replace(/0/g, '').length;
    return ones % 2 === 0;
}

function symbol(openSpace){
    return openSpace ? '.' : '#';
}

function printOffice(){
    var row = '   ';
    for(var x = 0; x < maxX; x+=1){
        if(x < 10) row += ' ';
        row += x + ' ';
    }
    console.log(row);
    for(var y = 0; y < maxY; y+=1){
        row = y + ' ';
        if(y < 10) row += ' ';
        for(x = 0; x < maxX; x+=1){
            row += ' ';
            if(pathMap[x + ',' + y]){
                row += 'O';
            } else {
                row += symbol(isOpenSpace(x, y));
            }
            row += ' ';
        }
        console.log(row);
    }
}

function canWalk(x, y, officeMap){
    if(x < 0 || y < 0 || officeMap[x + ',' + y]){ return false; }    
    return isOpenSpace(x, y);
}

function copyMap(map){
    return JSON.parse(JSON.stringify(map));
}

function findBiggestRoute(steps, curX, curY, officeMap){
    officeMap[curX + ',' + curY] = true;
    if(curX > maxX){ maxX = curX; }
    if(curY > maxY){ maxY = curY; }
    if(steps > maxSteps){
        return;
    } else {
        if(canWalk(curX, curY + 1, officeMap))
            findBiggestRoute(steps + 1, curX, curY + 1, officeMap);
        if(canWalk(curX, curY - 1, officeMap))
            findBiggestRoute(steps + 1, curX, curY - 1, officeMap);
        if(canWalk(curX + 1, curY, officeMap))
            findBiggestRoute(steps + 1, curX + 1, curY, officeMap);
        if(canWalk(curX - 1, curY, officeMap))
            findBiggestRoute(steps + 1, curX - 1, curY, officeMap);
    }

}
findBiggestRoute(0, 1, 1, pathMap);
console.log('Most visited coordinates', Object.keys(pathMap).length, 'points');
printOffice();