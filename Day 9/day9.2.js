var fs = require('fs');
var input = fs.readFileSync('day9Input.txt').toString().trim().split('\r\n');

function getDecompressedSegment(text){
    var end = text.indexOf(')') + 1;
    var marker = text.substring(1, end - 1).split('x');
    var charsInSequence = +marker[0];
    var repetitions = +marker[1];
    if(text.indexOf('(', end) > -1){
        return { size: repetitions * decompress(text.substring(end, end + charsInSequence)), inc: end + charsInSequence };
    }
    return { size: repetitions * charsInSequence, inc: end + charsInSequence };
}

function decompress(line){
    var failSafe = 0;
    line = line.trim();
    var index = 0;
    var size = 0;
    while(index < line.length && failSafe < 500){
        var markerIndex = line.indexOf('(', index);
        if(markerIndex === -1){
            size += line.length - index;
            index = line.length;
        } else{
            var dSeg = getDecompressedSegment(line.substring(markerIndex));
            size += markerIndex - index + dSeg.size;
            index = markerIndex + dSeg.inc;
        }
        failSafe++;
    }
    return size;
}

var size = 0;
input.forEach(function(line){
    var decompressedSize = decompress(line);
    size += decompressedSize;
});
console.log('File Size:', size);