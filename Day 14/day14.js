var md5 = require("crypto-js/md5");
var input = 'zpqevtbw', keyStretching = true;
var index = 0, threeInARow = {}, fiveInARow = {}, keys = [];
var regex3 = /(.)\1{2,}/g;
var regex5 = /(.)\1{4,}/g;

function getMatchingThree(possibles, currIndex){
    for(var i = 0; i < possibles.length; i+=1){
        if(possibles[i].index < currIndex && ((currIndex - possibles[i].index) <= 1000)){
            keys.push(possibles[i]);
        }
    }
}

function addToThree(matches, hash, index){
    var letter = matches[0].charAt(0);
    if(!letter){ return; }
    if(!threeInARow[letter]){
        threeInARow[letter] = [];
    }
    threeInARow[letter].push({ hash: hash, index: index });
}
function addToFive(matches, hash, index){
    var letter = matches[0].charAt(0);
    if(!letter){ return; }
    if(!fiveInARow[letter]){
        fiveInARow[letter] = [];
    }
    fiveInARow[letter].push({ hash: hash, index: index });
    getMatchingThree(threeInARow[letter], index)
}

function getHash(salt, keyStretching){
    var hash = md5(input + index).toString();
    if(!keyStretching){
        return hash;
    }
    for(var i = 0; i < 2016; i++){
        hash = md5(hash).toString();
    }
    return hash;
}

function findKeys(keyStretching){
    while(keys.length < 64){
        var hash = getHash(input + index, keyStretching);
        var threeMatch = hash.match(regex3) || [];
        var fiveMatch = hash.match(regex5) || [];
        if(threeMatch.length > 0){
            addToThree(threeMatch, hash, index);
        }
        if(fiveMatch.length > 0){
            addToFive(fiveMatch, hash, index);
        }
        index += 1;
    }
}
findKeys(keyStretching);
keys.sort(function(a, b){
    return a.index - b.index;
});
console.log(keys[63]);