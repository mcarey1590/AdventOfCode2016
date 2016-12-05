var md5 = require("crypto-js/md5");
var input = 'abbhdwsy', index = 0, password = '';

while(password.length < 8){
    var hash = md5(input + index).toString();
    if(hash.indexOf('00000') === 0){
        password += hash.charAt(5);
    }
    index += 1;
}
console.log('Password:', password);