
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    // output: process.stdout
});

rl.on('line', function(line){

    console.log('xxxx:',line);
});

rl.write('hello\n')