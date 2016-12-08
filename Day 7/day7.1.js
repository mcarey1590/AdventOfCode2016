var fs = require('fs');
var input = fs.readFileSync('day7Input.txt').toString().trim().split('\n');

function segmentHasABBA(segment){
    for(var i = 0; i < segment.length - 3; i++){
        var ab = segment.substring(i, i + 2);
        var ba = segment.substring(i + 2, i + 4).split('').reverse().join('');
        if(ab.charAt(0) !== ab.charAt(1) && ab === ba){
            return true;
        }
    }
    return false;
}

function hasTLSSupport(ipaddress){
    var tempIpAddress = ipaddress;
    var hasABBA = false;
    while(tempIpAddress.length > 0){
        var endIndex;
        if(tempIpAddress.charAt(0) === '['){
            endIndex = tempIpAddress.indexOf(']');
            if(segmentHasABBA(tempIpAddress.substring(1, endIndex))){
                return false;
            }            
            tempIpAddress = tempIpAddress.substring(endIndex + 1);
        } else {
            endIndex = tempIpAddress.indexOf('[');
            if(endIndex === -1) { endIndex = tempIpAddress.length; }
            if(segmentHasABBA(tempIpAddress.substring(0, endIndex))){
                hasABBA = true;
            }
            tempIpAddress = tempIpAddress.substring(endIndex);
        }        
    }
    return hasABBA;
}

var numSupported = 0;
input.forEach(function(ipAddress){
    if(hasTLSSupport(ipAddress.trim())){
        numSupported += 1;
    };
});

console.log(numSupported);