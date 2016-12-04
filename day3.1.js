var fs = require('fs');
var sides = fs.readFileSync('day3Input.txt').toString().trim().split(/\s+/g);
var totalPossible = 0;
function getSides(start){
    return {
        a: +sides[start],
        b: +sides[start + 1],
        c: +sides[start + 2]
    };
}
for(var i = 0; i < sides.length; i += 3){
    var triangle = getSides(i);
    if((triangle.a + triangle.b > triangle.c) && (triangle.a + triangle.c > triangle.b) && (triangle.b + triangle.c > triangle.a)){
        totalPossible += 1;
    }
};
console.log(totalPossible);

