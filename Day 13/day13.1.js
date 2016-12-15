//var favNumber = 10;
var favNumber = 1350;
//var destX = 7, destY = 4;
var destX = 31, destY = 39;
var maxX = destX, maxY = destY;

var shortestPath = 0;
var pathMap;

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
            if(x === destX && y === destY){
                row += 'X';
            } else if(pathMap[x + ',' + y]){
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

function findFastestRoute(steps, curX, curY, officeMap){
    officeMap[curX + ',' + curY] = true;
    if(curX > maxX){ maxX = curX; }
    if(curY > maxY){ maxY = curY; }
    if(curX === destX && curY === destY){
        if(shortestPath === 0 || steps < shortestPath){
            console.log('found faster path.', steps, 'steps')
            shortestPath = steps;
            pathMap = officeMap;
        }
    } else if(shortestPath === 0 || steps < shortestPath){
        if(canWalk(curX, curY + 1, officeMap))
            findFastestRoute(steps + 1, curX, curY + 1, copyMap(officeMap));
        if(canWalk(curX, curY - 1, officeMap))
            findFastestRoute(steps + 1, curX, curY - 1, copyMap(officeMap));
        if(canWalk(curX + 1, curY, officeMap))
            findFastestRoute(steps + 1, curX + 1, curY, copyMap(officeMap));
        if(canWalk(curX - 1, curY, officeMap))
            findFastestRoute(steps + 1, curX - 1, curY, copyMap(officeMap));
    }

}
findFastestRoute(0, 1, 1, {});
console.log('Fastest Route takes', shortestPath, 'steps');
printOffice();