var fs = require('fs');
var input = fs.readFileSync('day7Input.txt').toString().trim().split('\n');

function getSegmentBABList(segment){
    segment = segment.trim();
    var babList = [];
    for(var i = 0; i < segment.length - 2; i++){
        var aba = segment.substring(i, i + 3);
        if(aba.charAt(0) !== aba.charAt(1) && aba.charAt(0) === aba.charAt(2)){
            babList.push(aba.charAt(1) + aba.charAt(0) + aba.charAt(1));
        }
    }
    return babList;
}

function hasSSLSupport(ipaddress){
    var tempIpAddress = ipaddress;
    var supernetSequences = [];
    var babList = [];
    while(tempIpAddress.length > 0){
        var endIndex;
        if(tempIpAddress.charAt(0) === '['){
            endIndex = tempIpAddress.indexOf(']');
            supernetSequences.push(tempIpAddress.substring(1, endIndex));           
            tempIpAddress = tempIpAddress.substring(endIndex + 1);
        } else {
            endIndex = tempIpAddress.indexOf('[');
            if(endIndex === -1) { endIndex = tempIpAddress.length; }
            babList = babList.concat(getSegmentBABList(tempIpAddress.substring(0, endIndex)));
            tempIpAddress = tempIpAddress.substring(endIndex);
        }        
    }
    for(var i = 0; i < supernetSequences.length; i++){
        for(var j = 0; j < babList.length; j++){
            if(supernetSequences[i].indexOf(babList[j]) > -1){
                return true;
            }
        }
    }
    return false;
}

var numSupported = 0;
input.forEach(function(ipAddress){
    if(hasSSLSupport(ipAddress)){
        numSupported += 1;
    };
});

console.log(numSupported);