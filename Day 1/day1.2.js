var directions = "L4, R2, R4, L5, L3, L1, R4, R5, R1, R3, L3, L2, L2, R5, R1, L1, L2, R2, R2, L5, R5, R5, L2, R1, R2, L2, L4, L1, R5, R2, R1, R1, L2, L3, R2, L5, L186, L5, L3, R3, L5, R4, R2, L5, R1, R4, L1, L3, R3, R1, L1, R4, R2, L1, L4, R5, L1, R50, L4, R3, R78, R4, R2, L4, R3, L4, R4, L1, R5, L4, R1, L2, R3, L2, R5, R5, L4, L1, L2, R185, L5, R2, R1, L3, R4, L5, R2, R4, L3, R4, L2, L5, R1, R2, L2, L1, L2, R2, L2, R1, L5, L3, L4, L3, L4, L2, L5, L5, R2, L3, L4, R4, R4, R5, L4, L2, R4, L5, R3, R1, L1, R3, L2, R2, R1, R5, L4, R5, L3, R2, R3, R1, R4, L4, R1, R3, L5, L1, L3, R2, R1, R4, L4, R3, L3, R3, R2, L3, L3, R4, L2, R4, L3, L4, R5, R1, L1, R5, R3, R1, R3, R4, L1, R4, R3, R1, L5, L5, L4, R4, R3, L2, R1, R5, L3, R4, R5, L4, L5, R2".split(', ');;
var x = 0, y = 0, direction = 0, visited = { '0,0': true };

function repeatVisit(x, y){
    if(visited[x + ',' + y])
        return true;
    visited[x + ',' + y] = true;
    return false;
}

for(var i = 0; i < directions.length; i++){
    var move = directions[i];
    if(move.charAt(0) === 'R'){
        direction++;
    } else {
        direction--;
    }
    if(direction < 0)
        direction += 4;
   
    var dist = +(move.slice(1));
    var foundRepeatVisit = false;
    switch(direction % 4){
        case 0:
            var tempY = y + dist;
            while(y < tempY){
                if(repeatVisit(x, ++y)){
                    foundRepeatVisit = true;
                    break;
                }
            }
            break;
        case 1:
            var tempX = x + dist;
            while(x < tempX){
                if(repeatVisit(++x, y)){
                    foundRepeatVisit = true;
                    break;
                }
            }
            break;
        case 2:
            var tempY = y - dist;
            while(y > tempY){
                if(repeatVisit(x, --y)){
                    foundRepeatVisit = true;
                    break;
                }
            }
            break;
        case 3:
            var tempX = x - dist;
            while(x > tempX){
                if(repeatVisit(--x, y)){
                    foundRepeatVisit = true;
                    break;
                }
            }
            break;
    }  
    if(foundRepeatVisit)
        break;  
};
console.log(Math.abs(x + y));