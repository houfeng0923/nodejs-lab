var crypto = require('crypto');
var fs = require('fs');

var pwd = new Buffer('xiaodi');
var aes = crypto.createCipher('aes-256-cbc',pwd);

var rstream = fs.createReadStream('./origin.txt');
var wstream = fs.createWriteStream('./encrypted.txt');

rstream.pipe(aes).pipe(wstream)
.on('finish',function (){
  console.log('done encrypting');
})





/*
Some of the more notable options available in my version of openssl are:

aes-256-cbc - AES 256 bit - cipher block chaining
bf-ofb - Blowfish - output feedback mode
cast5-ofb - Cast 5 - output feedback mode
*/