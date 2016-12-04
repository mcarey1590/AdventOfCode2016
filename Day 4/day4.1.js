var fs = require('fs');
var rooms = fs.readFileSync('day4Input.txt').toString().trim().split('\n');

function getRoomInfo(room){
    var groups = room.match(/([a-z-]+)(\d+)(\[.+\])/);
    return {
        name: groups[1].replace(/-/g, ''),
        sectorId: +groups[2],
        checksum: groups[3].substring(1, groups[3].length - 1)
    };
}

var sectorIdSum = 0;
rooms.forEach(function(room){
    var roomInfo = getRoomInfo(room);
    var letterMap = {};
    var letters = [];
    
    roomInfo.name.split('').forEach(function(letter){
        if(!letterMap.hasOwnProperty(letter)){
            letters.push({ letter: letter, occurences: 1 });
            letterMap[letter] = letters.length - 1;
        } else {
            letters[letterMap[letter]].occurences += 1;
        }
    });
    var topLetters = letters.sort(function(a, b){         
        if(b.occurences - a.occurences === 0){
            return a.letter.localeCompare(b.letter);
        }
        return b.occurences - a.occurences;
    }).map(function(x){ return x.letter}).slice(0, roomInfo.checksum.length).join('');
    if(topLetters === roomInfo.checksum){
        sectorIdSum += roomInfo.sectorId;
    }
});

console.log(sectorIdSum);