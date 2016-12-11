var fs = require('fs');
var input = fs.readFileSync('day9Input.txt').toString().trim().split('\r\n');
console.log(input)
console.log('--------------------------')

function getDecompressedSegment(text){
    var end = text.indexOf(')') + 1;
    var marker = text.substring(1, end - 1).split('x');
    var charsInSequence = +marker[0];
    var repetitions = +marker[1];
    var sequence = text.substring(end, end + charsInSequence);
    var value = '';
    for(var i = 0; i < repetitions; i++){ value += sequence; }
    return { text: value, inc: end + charsInSequence };
}

function decompress(line){
    line = line.trim();
    var dline = '';
    var index = 0;
    while(index < line.length){
        var markerIndex = line.indexOf('(', index);
        var dSeg = { text: '', inc: 0 };
        if(markerIndex === -1){
            markerIndex = line.length;
        } else{
            dSeg = getDecompressedSegment(line.substring(markerIndex));           
        }
        dline += line.substring(index, markerIndex) + dSeg.text;
        index = markerIndex + dSeg.inc;
    }
    return dline;
}

var size = 0;
input.forEach(function(line){
    var decompressedLine = decompress(line);
    console.log('decompressed', decompressedLine, decompressedLine.length);
    size += decompressedLine.length;
});
console.log('File Size:', size);