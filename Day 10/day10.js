var fs = require('fs');
var input = fs.readFileSync('day10Input.txt').toString().trim().split('\n');

var botMap = {};
var outputs = {};
var valueInstructions = [];
var alertWhen = { low: 17, high: 61 };

function processValue(destination, value){
    if(destination.type === 'bot'){
        giveValueToBot(destination.value, value);
    } else if(destination.type === 'output'){
        giveValueToOutput(destination.value, value);
    }
}

function processBotValues(botId){
    var bot = botMap[botId];
    bot.values.sort(function(a,b){ return a - b; });
    if(bot.values[0] === alertWhen.low && bot.values[1] === alertWhen.high){
        console.log('Bot', botId, 'is responsible for values', bot.values.join(' and '));
    }
    processValue(bot.low, bot.values[0]);
    processValue(bot.high, bot.values[1]);
}

function giveValueToBot(botId, value){  
    var bot = botMap[botId];
    bot.values.push(value);
    if(bot.values.length === 2){
        processBotValues(botId);
    }
}
function giveValueToOutput(outputId, value){
    if(!outputs[outputId]){
        outputs[outputId] = [value];
    } else {
        outputs[outputId].push(value);
    }
}

function botSetup(instructions){
    var botId = instructions[1];
    botMap[botId] = {
        low: {
            type: instructions[5],
            value: +instructions[6]
        },
        high: {
            type: instructions[10],
            value: +instructions[11]
        },
        values: []
    }
}

input.forEach(function(line){
    var instructions = line.split(' ');

    if(instructions[0] === 'value'){
        valueInstructions.push(instructions);
    } else{
        botSetup(instructions);
    }
});

valueInstructions.forEach(function(instruction){
    giveValueToBot(instruction[5], +instruction[1]);
});
console.log(outputs[0][0] * outputs[1][0] * outputs[2][0]);