var SimpleProtocol = require('./simple_protocol')
var fs = require('fs')

var reader = fs.createReadStream('./simple.txt')

var parser = new SimpleProtocol(reader);
parser.on('header',function (header){
  console.log('name:',header.name);
});

parser.pipe(process.stdout);

// process.stdin.resume()