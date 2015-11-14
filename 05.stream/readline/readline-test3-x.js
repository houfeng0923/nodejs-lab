
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    // output: process.stdout
});

rl.on('line', function(line){
    console.log('xxxx:',line);
    process.exit(0);
});

rl.write('hello\n');