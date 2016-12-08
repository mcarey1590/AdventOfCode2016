var fs = require('fs');
var input = fs.readFileSync('day6Input.txt').toString().trim().split('\n');

var columns = [];

input.forEach(function(line){
    for(var i = 0; i < line.length; i++){
        if(!columns[i]){ columns[i] = {}; }
        var letter = line.charAt(i);
        if(!columns[i][letter]){ 
            columns[i][letter] = 1; 
        } else {
            columns[i][letter] += 1;
        }
    }
});

var message = '';
columns.forEach(function(column){
    var colLetter;
    var occurences = Number.MAX_SAFE_INTEGER;
    for(var letter in column){
        if(column[letter] < occurences){
            colLetter = letter;
            occurences = column[letter];
        }
    }
    message += colLetter;
});

console.log(message);