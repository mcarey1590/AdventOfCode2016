var fs = require('fs');
var rooms = fs.readFileSync('day4Input.txt').toString().trim().split('\n');
function getRoomInfo(room){
    var groups = room.match(/([a-z-]+)(\d+)(\[.+\])/);
    return {
        name: groups[1].substring(0, groups[1].length - 1),
        sectorId: +groups[2],
        checksum: groups[3].substring(1, groups[3].length - 1)
    };
}

function decryptName(name, sectorId){
    var shift = sectorId % 26;
    var decryptedName = '';
    for(var i = 0; i < name.length; i++){
        if(name.charAt(i) === '-'){
            decryptedName += ' ';
            continue;
        }
        var charNumber = name.charCodeAt(i);
        var newNumber = charNumber + shift;
        if(newNumber >= 123){
            newNumber = 97 + (newNumber - 123);
        }
        decryptedName += String.fromCharCode(newNumber);
    }
    return decryptedName;
}

rooms.forEach(function(room){
    var roomInfo = getRoomInfo(room);
    var letterMap = {};
    var letters = [];
    
    roomInfo.name.replace(/-/g, '').split('').forEach(function(letter){
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
        var decryptedName = decryptName(roomInfo.name, roomInfo.sectorId);
        if(decryptedName.indexOf('northpole') > -1){            
            console.log(decryptedName, roomInfo.sectorId);
        }
    }
});

console.log();