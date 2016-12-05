var md5 = require("crypto-js/md5");
var input = 'abbhdwsy', index = 0, password = [], progress = 0;

while(progress < 8){
    var hash = md5(input + index).toString();
    if(hash.indexOf('00000') === 0){
        var position = +hash.charAt(5);
        if(position < 8 && !password[position]){ 
            password[position] = hash.charAt(6);
            progress += 1;
            console.log((progress / 8 * 100) + '%', password);
        }
    }
    index += 1;
}
console.log('Password:', password.join(''));