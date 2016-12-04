var fs = require('fs');
var sides = fs.readFileSync('day3Input.txt').toString().trim().split(/\s+/g);
var totalPossible = 0;
function getSides(start){
    return {
        a: +sides[start],
        b: +sides[start + 3],
        c: +sides[start + 6]
    };
}
for(var i = 0; i < sides.length; i++){
    var triangle = getSides(i);
    if((triangle.a + triangle.b > triangle.c) && (triangle.a + triangle.c > triangle.b) && (triangle.b + triangle.c > triangle.a)){
        totalPossible += 1;
    }
    if((i + 1) % 3 === 0){
        i += 6;
    }
};
console.log(totalPossible);

