var SimpleProtocol2 = require('./simple_protocol2')
var fs = require('fs')

var reader = fs.createReadStream('./simple.txt')

var parser = new SimpleProtocol2();

reader.pipe(parser).pipe(process.stdout)

parser.on('header',function (header){
  console.log('name:',header.name);
});
