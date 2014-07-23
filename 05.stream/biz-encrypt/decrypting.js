var crypto = require('crypto');
var fs = require('fs');

var pwd = new Buffer('xiaodi');
var aes = crypto.createDecipher('aes-256-cbc',pwd);

var rstream = fs.createReadStream('./encrypted.txt');

rstream.pipe(aes).pipe(process.stdout)


