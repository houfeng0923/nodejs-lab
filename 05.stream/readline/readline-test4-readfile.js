var fs = require('fs');
var path = require('path');
var readline = require('readline');

var rl = readline.createInterface({
    input: fs.createReadStream('./README.md',{encoding: "utf8"}),
    output: fs.createWriteStream('./readme2.md',{flags: 'w',encoding: "utf8", mode: 0666 }),
    terminal: false
});


// var fd = fs.openSync('./README2.md', 'w');
rl.on('line', function(line) {
    this.output.write(line+'\n');
    // fs.write(fd, line+'\n');
});
