var fs = require('fs')
var path = require('path')
var zlib = require('zlib')


var fsReader = fs.createReadStream(path.join(__dirname,'README.md'));
// 可读写 transform流：
var zipStream = zlib.createGzip();
var newReader = fsReader.pipe(zipStream);
console.log(zipStream==newReader); //true








