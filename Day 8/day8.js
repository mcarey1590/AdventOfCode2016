var fs = require('fs');
var input = fs.readFileSync('day8Input.txt').toString().trim().split('\n');
var resolution = '50x6';
var pixelOn = '#', pixelOff = '.';
var picture = getBlankScreen(resolution);

function getBlankScreen(reso){
    var pic = [];
    var split = reso.split('x');
    for(var y = 0; y < +split[1]; y++){
        pic[y] = [];
        for(var x = 0; x < +split[0]; x++){
            pic[y][x] = pixelOff;
        }
    }
    return pic;
}

function turnOnRect(dim){
    var split = dim.split('x');
    for(var y = 0; y < +split[1]; y++){
        for(var x = 0; x < +split[0]; x++){
            picture[y][x] = pixelOn;
        }
    }
}

function rotateX(column, shiftBy){
    for(var count = 0; count < shiftBy; count++){
        var tempY = picture[picture.length - 1][column];
        for(var y = picture.length - 2; y >= 0 ; y--){
            picture[y + 1][column] = picture[y][column];
        }
        picture[0][column] = tempY;
    }
}

function rotateY(row, shiftBy){
    for(var count = 0; count < shiftBy; count++){
        var tempX = picture[row][picture[0].length - 1];
        for(var x = picture[0].length - 2; x >= 0 ; x--){
            picture[row][x + 1] = picture[row][x];
        }
        picture[row][0] = tempX;
    }
}

function rotate(directions){
    var pointer = +directions[2].split('=')[1];
    var shiftBy = +directions[4];
    if(directions[1] === 'column'){
        rotateX(pointer, shiftBy);
    }
    if(directions[1] === 'row'){
        rotateY(pointer, shiftBy);
    }
}

function printScreen(){
    var image =  '';
    var pixelCount = 0;
    picture.forEach(function(row){
        var stringRow = row.join('');
        pixelCount += (stringRow.match(new RegExp(pixelOn, 'g') || [])).length;
        image += stringRow + '\n';
    });
    console.log(image);
    console.log(pixelCount);
}

input.forEach(function(line){
    var directions = line.split(' ');
    if(directions[0] === 'rect'){
        turnOnRect(directions[1]);
    }
    if(directions[0] === 'rotate'){
        rotate(directions);
    }
});

printScreen();